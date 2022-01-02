var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var Token=require('../models/Token');

router.get('/:Email', function(req, res, next) {
    res.render('repeat');
});

router.post('/:Email',function (req,res,next) {
    Token.findOne({Email:req.params.Email}).exec().then(result => {
        Token.findOneAndDelete({Email:result.Email}).exec();
       if(result)
       {
            if(GenerateToken(result.Token)==req.body.inputMailToken)
            {
                res.redirect('/ResetPassword/'+result.Email);
            }
            else
            {
                res.status(500).send('there is a problem');
                res.redirect('/Forgotpassword');
            }
       }else
       {
           res.status(500).send('there is a problem');
           res.redirect('/Forgotpassword')
       }

    });
});



module.exports = router;

