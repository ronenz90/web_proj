var express = require('express');
var router = express.Router();
const Customer=require('../models/customer');
var mongoose = require('mongoose');

router.get('/:id', function(req, res, next) {
    findUserById(req.params.id,res,user=>{
        console.log(user.Connected);
        if(user.Connected) {
            res.render('customer', {link: '/customer/' + req.params.id});
        }
        else
        {
            res.status(200).redirect('/');
        }
    });
});

router.post('/:id',(req,res,next)=> {
    Customer.findOne({Email:req.body.inputEmail}).exec().then(doc => {
        if (doc)
        {
            console.log(doc);
            res.status(500).send('ERROR: Customer Already Exist');
        }
        else
        {
            saveCustomer();
        }
    });

    const customer = new Customer({
        _id:new mongoose.Types.ObjectId(),
        Fullname: req.body.inputFullname,
        Email:req.body.inputEmail,
        Id_Number: req.body.inputId,
        Birthday: req.body.inputBirthday,
        Maritalstatus:req.body.inputMaritalstatus,
        Tel:req.body.inputTel,
        City:req.body.inputCity
    });

    function saveCustomer() {
        customer.save().then(result => {
            console.log(result);
            res.status(200).redirect('/profile/'+req.params.id);
        }).catch(err => {
            res.status(500).send('ERROR: Customer Already Exist');
        });
    }

});
module.exports = router;