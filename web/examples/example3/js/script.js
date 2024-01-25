// Wait for the HTML document to be fully loaded before executing any JavaScript
document.addEventListener('DOMContentLoaded', ()=>{

    // Get a reference to the form with the id 'myForm'
    const form = document.getElementById('myForm');

    // Example custom error messages for different form fields
    const customErrorMessages = {
        "text": "NAME CANNOT BE EMPTY",
        "select": "KINDLY SELECT A COUNTRY",
        "checkbox" : "KINDLY AGREE TO THE TERMS & CONDITIONS",
        "email": {
            "empty": "KINDLY ENTER YOUR EMAIL",
            "format": "The email is not in the right format",
        },
        "textarea" : {
            "empty" : "EMPTY TEXT"
        }
        // ... Add other field types and messages as needed
    };
    
    // Create an object with form details, including the form element, error message preferences, etc.
    const formDetails = {
        form: form,
        isErrorMessageInline: true, // Set to true if you want error messages to appear inline with the form fields
        customErrorMessages: customErrorMessages,
    };
  
    // Create an instance of the customized form validation class (NFSFU234FormValidation)
    const formValidator = new NFSFU234FormValidation(formDetails);

    // Add an event listener for when the REGISTER BUTTON IS CLICKED
    form.querySelector('button').addEventListener('click', ()=>{

        // Check if the form inputs, textareas, selects, radios, and checkboxes are valid
        if ( formValidator.validate() )
        {
            // Get all the details from the form, including values and names (if provided)
            const formDetails = formValidator.getFormDetails();

            // Example AJAX options object for form submission
            const ajaxOptions = {
                url: "login.php",
                RequestMethod: "POST",
                RequestHeader: {
                    "Content-Type": "application/json",
                },
                RequestBody: {
                    formDetails
                }
            };

            // Perform an AJAX request to submit form data to the server
            formValidator.ajax(ajaxOptions)
                .then( response =>{
                    // Log the server response to the console
                    console.log(response);
                } )
                .catch(err => {
                    // Log any errors that occur during the AJAX request
                    console.error("Error Occurred: ", err);
                })
        }

    })

});
