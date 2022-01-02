var express = require('express');
const mongoose = require('mongoose');
const User = require("../models/user");
const validator = require("validator");
var passwordValidator=require('password-validator');
const router = express.Router();


router.get('/:Email', function(req, res, next) {
    res.render('ResetPassword');
});

router.post('/:Email',function (req,res,next)
{
    var schema= new passwordValidator();
    const password=SetPassword(req.body.inputPassword);
    if(req.body.inputNewPassword==req.body.inputConfirmPassword)
    {
        if(validator.isStrongPassword(req.body.inputNewPassword,{minLength: 10, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })&&(schema.is().not().oneOf(['Passw0rd', 'Aa12345678!','P@ssw0rd123'])))
        {
            User.findOneAndUpdate({Email:req.params.Email},{
                Password:password[1],
                salt:password[0],
                Tries:3
            }).exec();
            res.redirect('/');
        }
        else
        {
            res.status(500).send('Week Password');
        }
    }
    else
    {
        res.status(500).send("passwords is not the same");
    }
});




module.exports = router;
