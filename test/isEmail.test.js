const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

const isEmail = formValidator.isEmail('someone@example.com');
console.log(isEmail);

