const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

formValidator.hashPassword('@Password123')
    .then( hashedPassword =>{
        console.log(hashedPassword);
    })
    .catch( (error)=>{
        console.error(error);
    } );

    console.log('--------------------------------------------------------------');

formValidator.hashPassword('@Password123')
    .then( hashedPassword =>{
        console.log(hashedPassword);
    })
    .catch( (error)=>{
        console.error(error);
    } );