var express = require('express');
var router = express.Router();
const User=require('../models/user');
var mongoose = require('mongoose');

router.get('/:id', function(req, res, next) {
    res.render('ChangePassword', { title: 'Change Password' });
});
router.post('/:id', function(req, res, next) {
    findUserById(req.params.id, res, user => {
        console.log(user.Connected);
        if (user.Connected)
        {
            var a=req.body.inputNewPassword.toString();
            var b=req.body.inputRepeat.toString();
            var c=req.body.inputOldPassword.toString();
            var d=user.Password.toString();

            if(a==b)
            {
                console.log(c);
                console.log(d);
                if(c==d)
                {
                    User.findOneAndUpdate({_id:req.params.id},{Password:req.body.inputNewPassword}).exec()
                        .then(doc =>
                        {
                            if(doc)
                            {
                                console.log(doc);
                                res.status(200).redirect('/profile/'+req.params.id);
                            }
                            else
                                res.status(200).json({
                                    message: "Cant find user id"
                                })
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({error: err});
                        });
                }
                else
                {
                    res.status(500).send({message: 'Old password is wrong'});
                }

            }
            else
            {
                res.status(500).send({message: 'Passwords are not the same'});
            }

        }
        else
        {
            res.status(200).redirect('/');
        }

    });

});


module.exports = router;