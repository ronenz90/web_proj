var express = require('express');
var router = express.Router();
const User=require('../models/user');
const Cost=require('../models/cost');



router.get('/:id', function (req, res, next) {

    findUserById(req.params.id, res ,user =>
    {
        console.log(user.Id_Number);
        var date=new Date();
        var start=date.getFullYear()+'-'+(date.getMonth()+1)+'-01';
        var end=date.getFullYear()+'-'+(date.getMonth()+1)+'-31';
        findCostById(user.Id_Number,res,start,end,costs =>{
            res.render('profile', {
                Fullname:user.Fullname,
                link:'/profile/'+user._id,
                json: costs,
                link2:'/edit/'+req.params.id,
                link3:'/cost/'+req.params.id
            });

        })
    });
});

router.post('/:id', function (req, res, next) {
    var start=req.body.inputYear+'-'+req.body.inputMonth+'-01';
    var end=req.body.inputYear+'-'+req.body.inputMonth+'-31';
    findUserById(req.params.id, res ,user => {
        findCostById(user.Id_Number, res, start, end, costs => {
            res.render('profile', {
                Fullname: user.Fullname,
                link: '/profile/' + user._id,
                json: costs,
                link2: '/edit/' + req.params.id,
                link3: '/cost/' + req.params.id
            });

        });
    });
});
module.exports = router;

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

function findCostById(id,res,start,end,callback) {

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
