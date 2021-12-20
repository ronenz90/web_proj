var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const User = require('../models/user');
const userChanges= require('../models/userChanges');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'signup' });
});

router.post('/',(req,res,next)=>
{
  User.findOne({Email:req.body.inputEmail}).exec().then(doc => {
    if (doc)
    {
      console.log(doc);
      res.status(500).send('ERROR: User Already Exist');
    }
    else
    {
      saveUser();
    }
  });

  const user = new User({
    _id:new mongoose.Types.ObjectId(),
    Fullname: req.body.inputFullname,
    Email:req.body.inputEmail,
    Username: req.body.inputUsername,
    Password: req.body.inputPassword,
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
      res.status(200).redirect('/')
    }).catch(err => {
      res.status(500).send('ERROR: User Already Exist');
    });
  }

});

module.exports = router;

