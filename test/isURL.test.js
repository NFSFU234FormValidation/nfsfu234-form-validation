const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

const isValidURL = formValidator.isURL('https://www.example.com');
console.log(isValidURL); // true or false
