var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
const User=require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'login' });
});

router.post('/', function(req, res, next) {
    User.findOne({Email:req.body.inputEmail,Password:req.body.inputPassword})
        .exec()
        .then(doc => {
            User.findOneAndUpdate({_id:doc._id},{
                Connected:true
            }).exec();
            console.log(doc);
            if (doc)
                res.redirect('/profile/'+doc._id);
            else
                res.status(500).json({
                    message:"Username or Password is incorrect",
                    user:req.body.inputUsername,
                    password:req.body.inputPassword
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message:"Username or Password is incorrect",
                user:req.body.inputUsername,
                password:req.body.inputPassword
            });
        });
});
module.exports = router;