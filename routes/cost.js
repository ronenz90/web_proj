var express = require('express');
var router = express.Router();
const Cost=require('../models/cost');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    findUserById(req.params.id,res,user=>{
        console.log(user.Connected);
        if(user.Connected) {
            res.render('cost', {link: '/cost/' + req.params.id});
        }
        else
        {
            res.status(200).redirect('/');
        }
    });
});

router.post('/:id',(req,res,next)=> {

        var cost=new Cost({
            _id:new mongoose.Types.ObjectId(),
            Id_Number:req.body.inputId,
            Date:req.body.inputDate,
            Period:req.body.inputPeriod,
            Category:req.body.inputCategory,
            Name:req.body.inputName,
            Sum:req.body.inputSum
        });
        cost.save().then(result => {
            console.log(result);
            res.status(200).redirect('/profile/'+req.params.id);
        }).catch(err => console.log(err));
        res.status(201).redirect('/profile/'+req.params.id);
});

module.exports = router;