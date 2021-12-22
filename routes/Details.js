var express = require('express');
var router = express.Router();
const Customer=require('../models/customer');
var mongoose = require('mongoose');


router.get('/:id', function (req, res, next) {
    findUserById(req.params.id, res, user => {
        console.log(user.Connected);
        if (user.Connected) {
            Customer.find().exec().then(doc => {
                if (doc)
                    res.render('Details', {
                        json: doc
                    });
                else
                    res.status(200).json({
                        message: "Cant find user id"
                    });
            }).catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            });
        } else {
            res.status(200).redirect('/');
        }
    })
});

router.post('/:id',(req,res,next)=> {

});

module.exports = router;