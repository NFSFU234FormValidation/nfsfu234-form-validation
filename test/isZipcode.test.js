const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

const isValidZipcode = formValidator.isZipcode('1234-efrgty');
console.log(isValidZipcode); // true or false
