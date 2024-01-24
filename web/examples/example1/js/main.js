// Wait for the HTML document to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', ()=>{

    // Example custom error messages for different form fields
    const customErrorMessages = {
        'text' : 'username cannot be empty'
    };

    // Create an object with form details, including custom error messages
    const formDetails = {
        customErrorMessages: customErrorMessages
    };

    // Create an instance of the customized form validation class (NFSFU234FormValidation)
    const formValidator = new NFSFU234FormValidation(formDetails);

    // Initiates the form submission process and handles AJAX requests if applicable
    formValidator.submit();

});
