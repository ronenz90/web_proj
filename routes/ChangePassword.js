var express = require('express');
var router = express.Router();
const User=require('../models/user');
var mongoose = require('mongoose');
const History=require('../models/history');
var validator = require('validator');
var passwordValidator=require('password-validator');

router.get('/:id', function(req, res, next) {
    res.render('ChangePassword', { title: 'Change Password' });
});
router.post('/:id', function(req, res, next) {
    var schema= new passwordValidator();
    findUserById(req.params.id, res, user => {
        console.log(user.Connected);
        if (user.Connected)
        {
            var a = req.body.inputNewPassword.toString();
            var b = req.body.inputRepeat.toString();
            var c = GetPassword(user.Salt, req.body.inputOldPassword).toString();
            var d = user.Password.toString();
            if (validator.isStrongPassword(req.body.inputNewPassword, {
                minLength: 10, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})&&(schema.is().not().oneOf(['Passw0rd', 'Aa12345678!','P@ssw0rd123'])))
            {

                if (a == b)
                {
                    console.log(c);
                    console.log(d);
                    if (c == d)
                    {
                        History.findOne({_id:req.params.id}).exec()
                            .then(history => {
                                var pass1 = history.Password1;
                                var pass2 = history.Password2;
                                var pass3 = history.Password3;
                                console.log("pass1="+pass1);
                                if ((GetPassword(user.Salt,req.body.inputNewPassword) != pass1) & (GetPassword(user.Salt,req.body.inputNewPassword) != pass2) & (GetPassword(user.Salt,req.body.inputNewPassword) != pass3)) {
                                    User.findOneAndUpdate({_id: req.params.id}, {Password: GetPassword(user.Salt,req.body.inputNewPassword)}).exec()
                                        .then(doc => {
                                            if (doc) {
                                                console.log(doc);
                                                res.status(200).redirect('/profile/' + req.params.id);
                                            } else
                                                res.status(200).json({
                                                    message: "Cant find user id"
                                                })
                                        }).catch(err => {
                                        console.log(err);
                                        res.status(500).json({error: err});
                                    });

                                    History.findOne({_id: req.params.id})
                                        .exec()
                                        .then(doc => {
                                            var pass1 = doc.Password1;
                                            var pass2 = doc.Password2;
                                            History.findOneAndUpdate({_id: req.params.id}, {
                                                Password3: pass2,
                                                Password2: pass1,
                                                Password1: GetPassword(user.Salt, req.body.inputNewPassword)
                                            }).exec();
                                        });
                                }
                                else
                                {
                                    res.status(500).send({message: 'Used password, try another'});
                                }
                            });
                    } else {
                        res.status(500).send({message: 'Old password is wrong'});
                    }
                } else {
                    res.status(500).send({message: 'Passwords are not the same'});
                }
            }
            else
            {
                res.status(500).send({message: 'Password is Week'});
            }
        }
        else
        {
            res.status(200).redirect('/');
        }
    });
});


module.exports = router;