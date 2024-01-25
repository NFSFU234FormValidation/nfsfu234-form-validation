// Wait for the HTML document to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', ()=>{

    // Get a reference to the form with the id 'myForm'
    const form = document.getElementById('contact');

    // Example custom error messages for different form fields
    const customErrorMessages = {
        'text' : 'name cannot be empty'
        // ... Add other field types and messages as needed
    };
    
    // Create an object with form details, including the form element, error message preferences, etc.
    const formDetails = {
        form: form,
        isErrorMessageInline: true, // Set to true if you want error messages to appear inline with the form fields
        customErrorMessages: customErrorMessages,
    };

    // Example AJAX options object for form submission
    const ajaxOptions = {
        url: "contact.php",
        RequestMethod: "POST",
        RequestHeader: {
            "Content-Type": "application/json",
        },
        RequestBody: {
            formDetails
        }
    };
  
    // Create an instance of the customized form validation class (NFSFU234FormValidation)
    const formValidator = new NFSFU234FormValidation(formDetails);

    // Listens to the button in the form to be clicked, it first checks the type button then input with submit then any other button or input search then validates and sends the form via the library ajax function or natively 
    formValidator.submit();

    form.querySelector('button[type=submit]').addEventListener('click', ()=>{

        // This will also wait and get the AJAX result if the form was sent through AJAX

        const ajaxResponse = formValidator.getAJAXResponse();
        console.log(ajaxResponse);

    })

});
