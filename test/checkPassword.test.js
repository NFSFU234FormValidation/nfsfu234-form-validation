const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

const checkPassword = formValidator.checkPassword('password');
console.log(checkPassword); //false

const checkPasswordWithoutSymbols = formValidator.checkPassword('StrongPassword123');
console.log(checkPasswordWithoutSymbols); // true

const checkPasswordWithSymbols = formValidator.checkPassword('StrongP@ssword123', true);
console.log(checkPasswordWithSymbols); // true

