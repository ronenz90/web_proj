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
                    console.log(GetPassword(doc.Salt, req.body.inputPassword));
                    if (doc.Password == GetPassword(doc.Salt, req.body.inputPassword)) {
                        User.findOneAndUpdate({_id: doc._id}, {
                            Connected: true
                        }).exec();
                        res.redirect('/profile/' + doc._id);
                    } else {
                        window.confirm("Password is incorrect");
                    }
                } else
                    res.status(500).json({
                        message: "Email is incorrect"
                    });
            })
            .catch(err => {
                console.log(err);
                window.confirm("Username or Password is incorrect");
            });

});
module.exports = router;