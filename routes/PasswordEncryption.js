const crypto = require("crypto");

const SetPasseord = (password) => {
    const { createHmac } = require('crypto');

    //salt
    const salt = crypto.randomBytes(16).toString('hex')
    
    //add salt to pass adnd hash
    const hmac = createHmac('sha256', password).update(salt).digest('hex');
    // result[0] = hash pass, result[1] = salt
    return [hmac, salt];
}

const _password = 'Aa123456'
const hash_pass = SetPasseord(_password);
pass = hash_pass[0];
salt = hash_pass[1];
console.log(pass)
console.log(salt)