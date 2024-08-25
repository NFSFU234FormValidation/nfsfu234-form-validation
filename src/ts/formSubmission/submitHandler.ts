import ajax from "../ajax/ajax";
import { ExceptionHandler } from "../errorHandling/ExceptionHandler";
import validate from "../formValidations/validate";
import { countLengthOfObject } from "../utilities";

/**
 * Prepares the form for submission.
 * @param {HTMLFormElement} form - The form element.
 */
const prepareForm = (form: HTMLFormElement | HTMLDivElement): void => {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
    form.classList.add('relative-position');
}

/**
 * Extracts the form element from the provided parameter.
 * @param {string | HTMLFormElement | HTMLDivElement} u_form - The form element or its ID.
 * @returns {HTMLFormElement | null} Returns the form element if found, otherwise null.
 */
const extractFormElement = (u_form?: string | HTMLFormElement | HTMLDivElement): HTMLFormElement| HTMLDivElement | null => {
    if (typeof u_form === 'string') {
        return document.getElementById(u_form) as HTMLFormElement| HTMLDivElement | null;
    } else if (u_form instanceof HTMLFormElement || u_form instanceof HTMLDivElement) {
        return u_form;
    }
    return null;
}

/**
 * Finds the submit button within the form.
 * @param {HTMLFormElement} form - The form element.
 * @returns {HTMLElement | null} Returns the submit button if found, otherwise null.
 */
const findSubmitButton = (form: HTMLFormElement | HTMLDivElement): HTMLButtonElement | HTMLInputElement | HTMLElement  | null => {
    return form.querySelector('button[type=submit]') ||
        form.querySelector('input[type=submit]') ||
        form.querySelector('#jsSubmit') ||
        form.querySelector('button[type=search]') ||
        form.querySelector('button') ||
        null;
}

/**
 * Handles the form submission logic.
 * @param {HTMLFormElement} form - The form element.
 * @param {HTMLElement} submitBtn - The submit button element.
 */
const handleFormSubmission = (form: HTMLFormElement | HTMLDivElement | null , AJAXOptions: any): boolean | void => {
    // Handle form validation
    if (! validate(form)) {
        // If validation fails, return false
        return false;
    }

    if ( form instanceof HTMLFormElement && form.getAttribute('nfs-data-ajax') != 'true' ) {
        // submit form
        form.submit();

        return true;
    }

    // check the number of items in AJAXOptions

    if (countLengthOfObject(AJAXOptions) > 0) {

        ajax(AJAXOptions);
    }

    return false;

}


/**
 * Submit Form with Validation and Optional AJAX
 *
 * This function is used to submit a form with validation and optional AJAX handling.
 *
 * @param {HTMLFormElement | HTMLDivElement | string} u_form - The form element to submit or its ID.
 * @param {Object} ajaxOptions - The object containing AJAX request options.
 * @param {boolean} isErrorInline - Whether to display error messages inline or in a modal.
 * @param {Object} customErrorMessages - Custom error messages for form validation.
 * @param {CallableFunction} [callback] - Optional callback function to handle the submission result.
 * @returns {Promise | void} Returns a Promise if no callback is provided, or void if a callback is provided.
 */
const submitForm = (
    u_form: HTMLFormElement | HTMLDivElement | string, 
    ajaxOptions: any, 
    isErrorInline: boolean, 
    customErrorMessages: any,
    callback?: CallableFunction
): Promise<void> | void => {

    // Check if running in a browser environment
    if (typeof window === 'undefined') {
        ExceptionHandler("This function is only available in a browser environment.");
        return;
    }

    // Extract form from parameter
    let form: HTMLFormElement | HTMLDivElement | null = extractFormElement(u_form);

    // If form not found, log an error and return
    if (!form) {
        ExceptionHandler("Form not found");
        return;
    }

    // Prepare form for submission
    prepareForm(form);

    // Find and handle the submit button
    const submitBtn = findSubmitButton(form);
    if (!submitBtn) {
        console.error("No Submit Button was found.");
        return;
    }

    /**
     * Check if a value is a Promise.
     * @param value - The value to check.
     * @returns {boolean} Returns true if the value is a Promise, otherwise false.
     */
    const isPromise = (value: any): value is Promise<any> => {
        return value instanceof Promise;
    };

    submitBtn.addEventListener('click', () => {
        // Handle form submission logic
        const submissionResult = handleFormSubmission(form, ajaxOptions);
        
        if (callback && typeof callback === 'function') {
            // If callback function is provided, call it with the submission result
            callback(submissionResult);
        } else if (isPromise(submissionResult)) {
            // Check if submission result is a Promise using the custom type guard
            submissionResult.then(response => {
                // Handle the response here if needed
                console.log("Submission response:", response);
            }).catch(error => {
                console.error("Submission error:", error);
            });
        }
    });

    
};

export default submitForm;

