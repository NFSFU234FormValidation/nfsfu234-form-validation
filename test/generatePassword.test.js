const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

const randomPassword = formValidator.generateRandomPassword(12, true);
console.log(randomPassword); // A random password of varying length between 8 and 16 with special characters