var express = require('express');
var router = express.Router();
const Cost=require('../models/cost');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    res.render('cost',{link:'/cost/'+req.params.id});
});

router.post('/:id',(req,res,next)=> {
    findUserById(req.params.id,res,user =>{
        var cost=new Cost({
            _id:new mongoose.Types.ObjectId(),
            Id_Number:user.Id_Number,
            Date:req.body.inputDate,
            Category:req.body.inputCategory,
            Name:req.body.inputName,
            Sum:req.body.inputSum
        });
        cost.save().then(result => {
            console.log(result);
        }).catch(err => console.log(err));
        res.status(201).redirect('/profile/'+req.params.id);
    });

});

module.exports = router;