var express = require('express');
const mongoose = require('mongoose');
const User = require("../models/user");
const validator = require("validator");
const router = express.Router();


router.get('/:Email', function(req, res, next) {
    res.render('ResetPassword');
});






module.exports = router;
