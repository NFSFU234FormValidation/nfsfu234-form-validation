const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

var password = '@Password123';

formValidator.hashPassword(password)
    .then( async (hashedPassword )=>{

        const isPasswordMatch = await formValidator.verifyPassword(password, hashedPassword, true);
        console.log( "Hahsed Password Check Result: ", isPasswordMatch); // true or false

    })
    .catch( (error)=>{
        console.error(error);
    } );

var password2 = "Password12345";

(async () => {
    try {
        const isPasswordMatch = await formValidator.verifyPassword(password, password2);
        console.log( "Incorrect Password Check Result: ", isPasswordMatch); // true or false
    } catch (error) {
        console.error(error);
    }
})();  
