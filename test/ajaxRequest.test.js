const NFSFU234FormValidation = require('../dist/js/nfsfu234FormValidation');

const formValidator = new NFSFU234FormValidation();

const AJAXOptions = {
    url: 'http://localhost/metadata.json', // URL for the AJAX request
    RequestMethod: 'POST', // Request method
    RequestHeader: {
        'Content-Type': 'application/json', // Example request header
        // Add other request headers if needed
    },
    RequestBody: {
        // place your Request Body object/array here
    }
};
  
formValidator.ajax(AJAXOptions)
    .then((response) => {
        // Success: Server response received in JSON format
        console.log('Request successful', response);
    })
    .catch((error) => {
        // Error: AJAX request failed or rejected
        console.error('Request failed', error);
    });

