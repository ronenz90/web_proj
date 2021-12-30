var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var validator = require('validator');
const User = require('../models/user');
const userChanges= require('../models/userChanges');
const crypto = require("crypto");
const History=require('../models/history');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'signup' });
});

router.post('/',(req,res,next)=>
{
  const password=SetPassword(req.body.inputPassword);
  User.findOne({Email:req.body.inputEmail}).exec().then(doc => {
    if (doc)
    {
      console.log(doc);
      res.status(500).send('ERROR: User Already Exist');
    }
    else
    {
      if(validator.isEmail(req.body.inputEmail))
      {
        if(validator.isStrongPassword(req.body.inputPassword,{minLength: 10, minLowercase: 1,
          minUppercase: 1, minNumbers: 1, minSymbols: 1
        }))
        {
            saveUser();
            CreateHistory();
        }
        else
        {
          return res.status(500).send('ERROR:Week Password');
        }
      }
      else
      {
        return res.status(500).send('ERROR:Email Is Not Correct');
      }
    }
  });

  const user = new User({
    _id:new mongoose.Types.ObjectId(),
    Fullname: req.body.inputFullname,
    Email:req.body.inputEmail,
    Username: req.body.inputUsername,
    Password: password[1],
    Salt: password[0],
    Id_Number: req.body.inputId,
    Birthday: req.body.inputBirthday,
    Maritalstatus:req.body.inputMaritalstatus,
    Connected:false,
    City:req.body.inputCity,
    Revision:1
  });

  function saveUser() {
    user.save().then(result => {
      console.log(result);
      res.status(200).redirect('/');
    }).catch(err => {
      res.status(500).send('ERROR: User Already Exist');
    });
  }

  function CreateHistory()
  {
    history.save().then(result =>{
      console.log(result);
      res.status(200).redirect('/');
    }).catch(err => {
      res.status(500).send('ERROR: User Already Exist');
    });
  }
  const history=new History({
    _id:user._id,
    Password1:password[1],
    Password2:null,
    Password3:null
  });
});



module.exports = router;

