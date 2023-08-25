const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

const isOnlyIntegers = formValidator.containsOnlyIntegers('12345');
console.log(isOnlyIntegers); // true or false