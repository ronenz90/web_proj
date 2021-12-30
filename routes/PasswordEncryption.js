var express = require('express');
var router = express.Router();



const _password = 'Aa123456'
const hash_pass = SetPassword(_password);
pass = hash_pass[0];
salt = hash_pass[1];
console.log(pass)
console.log(salt)