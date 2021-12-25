var express = require('express');
var router = express.Router();
const User=require('../models/user');
const Cost=require('../models/cost');
const crypto = require("crypto");


router.get('/:id', function (req, res, next) {
    findUserById(req.params.id, res ,user => {
        console.log(user.Connected);
        if (user.Connected)
        {

            console.log(user.Id_Number);
            var date = new Date();
            var start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-01';
            var end = date.getFullYear() + '-' + (date.getMonth() + 1) + '-31';
            res.render('profile', {
                Fullname: user.Fullname,
                link: '/profile/' + user._id,
                link2: '/edit/' + req.params.id,
                link3: '/cost/' + req.params.id,
                link4: '/customer/' + req.params.id,
                link5: '/Details/' + req.params.id,
                link6: '/ChangePassword/' + req.params.id

            });
    }
    else
        {
            res.status(200).redirect('/');
        }
    });
});

router.get('/:id/logout', function (req, res, next) {
    findUserById(req.params.id, res ,user =>
    {
        User.findOneAndUpdate({_id:user._id},{
            Connected:false
        }).exec();
    });
    res.status(200).redirect('/');
});


router.post('/:id', function (req, res, next) {
    //var start = req.body.inputYear + '-' + req.body.inputMonth + '-01';
   // var end = req.body.inputYear + '-' + req.body.inputMonth + '-31';
    //findUserById(req.params.id, res, user => {
       // findCostById(req.body.inputCustomerID, res, start, end, costs => {
            res.redirect('/MonthlyBill/' + req.body.inputCustomerID + '/Month=' + req.body.inputMonth + '/Year=' + req.body.inputYear);
            /* res.render('MonthlyBill',
            {
                      json: costs,
             });
 */
     //   });
    //});
});
module.exports = router;


//global Functions

global.SetPassword =function (password)  {
    const { createHmac } = require('crypto');

    //salt
    const salt = crypto.randomBytes(16).toString('hex')

    //add salt to pass adnd hash
    const hmac = createHmac('sha256', password).update(salt).digest('hex');
    // result[0] = hash pass, result[1] = salt
    return[salt,hmac];
}

global.GetPassword=function (salt,password)  {
    const { createHmac } = require('crypto');
    const hmac = createHmac('sha256', password).update(salt).digest('hex');
    return(hmac);
}

global.findUserById=function (id,res,callback)
{
    User.findById(id)
        .exec()
        .then(doc => {
            if (doc)
                callback(doc.toObject());
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

global.findCostById=function(id,res,start,end,callback) {

    Cost.find({Id_Number: id,Date:{ $gte: start, $lte: end }})
        .exec()
        .then(doc => {
            if (doc)
                callback(doc);
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
