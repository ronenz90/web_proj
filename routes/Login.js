var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const User=require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'login' });
});

router.post('/', function(req, res, next) {
        User.findOne({Email: req.body.inputEmail})
            .exec()
            .then(doc => {
                if (doc) {
                    console.log(doc.Password);
                    console.log(doc.Salt);
                    console.log(req.body.inputPassword);
                    console.log(GetPassword(doc.Salt, req.body.inputPassword));
                    console.log(GetPassword(doc.Salt, req.body.inputPassword));
                    if(doc.Tries <= 0)
                    {
                        res.redirect('/ForgotPassword');
                    }
                    if (doc.Password == GetPassword(doc.Salt, req.body.inputPassword)) {
                        User.findOneAndUpdate({_id: doc._id}, {
                            Connected: true,
                            Tries: 3
                        }).exec();
                        res.redirect('/profile/' + doc._id);
                    } else {
                        User.findOneAndUpdate({_id: doc._id}, {
                            Tries: doc.Tries-1
                        }).exec();
                        res.status(500).json({
                            message: "Password is incorrect"});
                    }
                } else
                    res.status(500).json({
                        message: "Email is incorrect"
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: "Username or Password is not correct"});
            });

});
module.exports = router;