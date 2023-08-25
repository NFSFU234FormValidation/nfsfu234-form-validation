const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

const charCount = formValidator.countString('Hello, World!');
console.log(charCount); // 13