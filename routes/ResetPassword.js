var express = require('express');
const mongoose = require('mongoose');
const User = require("../models/user");
const validator = require("validator");
const router = express.Router();


router.post('/', function(req, res, next) {
    res.render('ResetPassword', { title: 'Reset Password' });
});


module.exports = router;
