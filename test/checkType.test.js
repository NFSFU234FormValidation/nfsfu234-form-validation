const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

var variable;
var type;

variable = { key: "value" };
type = formValidator.checkType(variable); // Returns: 'object'
console.log(type);

variable = 42;
type = formValidator.checkType(variable); // Returns: 'number'
console.log(type);

variable = () => { console.log("Hello, world!"); };
type = formValidator.checkType(variable); // Returns: 'function'
console.log(type);
