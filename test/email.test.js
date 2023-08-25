const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidtor = new NFSFU234FormValidation();

const isEmail = formValidtor.isEmail('someone@example.com');
console.log(isEmail);

