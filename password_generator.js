const generatePassword = require('generate-password');

const password = generatePassword.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    lowercase: true,
})

console.log(password)