var express = require('express');
const mongoose = require('mongoose');
const validator = require("validator");
const User = require("../models/user");
const Token = require("../models/Token");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('ForgotPassword', { title: 'Forgot Password' });
});

router.post('/', function(req, res, next) {
    const Recipeint=req.body.inputEmail;
    User.findOne({Email: req.body.inputEmail})
        .exec()
        .then(result => {
            if (result) {
                const gen=crypto.randomBytes(20).toString('hex');
                const token = GenerateToken(gen);
                console.log(gen);
                var passcode=new Token({
                    Email:result.Email,
                    Token:gen
                });
                passcode.save();
                console.log(token);
                // async... await is not allowed in global scope, must use a wrapper
                async function MailToken() {
                    // Generate test SMTP service account from ethereal.email
                    // Only needed if you don't have a real mail account for testing
                    let testAccount = await nodemailer.createTestAccount();

                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: "smtp.mailtrap.io",
                        port: 2525,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: "f9ed41e4854196", // generated ethereal user
                            pass: "d7f0bfa3069a77", // generated ethereal password
                        },
                    });

                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: '"Communication 👻" <auth@communication.com>', // sender address
                        to: Recipeint, // list of receivers
                        subject: "Communication Password Reset", // Subject line
                        text: token, // plain text body
                    });

                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                    // Preview only available when sending through an Ethereal account
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                }

                MailToken().catch(console.error);
                res.redirect('/Repeat/'+result.Email);
            } else
                res.status(500).json({
                    message: "Email is incorrect"
                });
        })
        .catch(err => {
            console.log(err);
            window.confirm("Mail or Token is incorrect");
        });

});


module.exports = router;

