var express = require('express');
var router = express.Router();
const User=require('../models/user');
const UserChanges= require('../models/userChanges');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    res.render('edit',{link:'/edit/'+req.params.id});
});

router.post('/:id',(req,res,next)=> {

    findUserById(req.params.id,res,user=>{
        InsertToUserChanges(user);
        EditUser(req,user);
       res.redirect('/profile/'+req.params.id);

    })

});
module.exports = router;

function InsertToUserChanges(user) {
    const changes= new UserChanges({
        _id:new mongoose.Types.ObjectId(),
        Fullname:user.Fullname,
        Username:user.Username,
        Password:user.Password,
        Id_Number:user.Id_Number,
        Birthday:user.Birthday,
        Maritalstatus:user.Maritalstatus,
        Revision:user.Revision,
        City:user.City
    });
    changes.save()
        .then(result => {console.log(result)})
        .catch(err => console.log(err));
}

function EditUser(req,user)
{
    User.findOneAndUpdate({_id:req.params.id},{
        Fullname: req.body.inputFullname,
        Username: req.body.inputUsername,
        Password: req.body.inputPassword,
        Id_Number: req.body.inputId,
        Birthday: req.body.inputBirthday,
        Maritalstatus:req.body.inputMaritalstatus,
        City:req.body.inputCity,
        Revision:user.Revision+1
    })
        .exec()
        .then(doc =>
        {
            if(doc)
                console.log(doc);
            else
                res.status(200).json({
                    message: "Cant find user id"
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
}

