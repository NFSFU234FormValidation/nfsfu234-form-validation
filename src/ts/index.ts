'use strict';

import ajax from "./ajax/ajax";
import ErrorHandler from "./errorHandling";
import { ExceptionHandler, LogLevelInterface } from "./errorHandling/ExceptionHandler";
import displayError from "./errorHandling/displayError";
import submitForm from "./formSubmission/submitHandler";
import getFormDetails from "./formValidations/getFormDetails";
import restrictInputLengthWithCounter from "./formValidations/restrictInputLengthWithCounter";
import validateForm from "./formValidations/validate";
import validateAllCheckbox from "./formValidations/validateAllCheckbox";
import validateAllRadio from "./formValidations/validateAllRadio";
import validateAllSelect from "./formValidations/validateAllSelect";
import validateAllTextarea from "./formValidations/validateAllTextarea";
import validateAllInput from "./formValidations/validateAllnput";
import validateCheckbox from "./formValidations/validateCheckbox";
import validateInput from "./formValidations/validateInput";
import validateRadio from "./formValidations/validateRadio";
import validateSelect from "./formValidations/validateSelect";
import validateTextarea from "./formValidations/validateTextarea";
import checkPassword from "./password-handling/checkPassword";
import generatePassword from "./password-handling/generatePassword";
import hashPassword from "./password-handling/hashPassword";
import verifyPassword from "./password-handling/verifyPassword";
import checkVariableType from "./utilities/checkVariableType";
import checkType from "./utilities/checkVariableType";
import containsOnlyIntegers from "./utilities/containsOnlyIntegers";
import countString from "./utilities/countString";
import getPageUrl from "./utilities/getPageUrl";
import isEmail from "./utilities/isEmail";
import isOnline from "./utilities/isOnline";
import isURL from "./utilities/isURL";
import isZIP from "./utilities/isZIP";
import loading from "./utilities/loading";
import redirect from "./utilities/redirect";
import reset from "./utilities/reset";
import togglePasswordVisibility from "./utilities/togglePasswordVisibility";
import togglePasswordVisibilityAll from "./utilities/togglePasswordVisibilityAll";

// src/interfaces/FormValidationOptions.ts

export interface FormValidationOptions {
    form?: HTMLFormElement | HTMLDivElement | string | { form?: HTMLFormElement | HTMLDivElement };
    ajaxOptions?: any;
    customErrorMessages?: Record<string, string>;
    errorType?: 'modal' | 'inline';
}

  

// npm/index.ts
class NFSFU234FormValidation {
    // private attributes
    private AJAXResult: null | Promise<any>;

    // public attributes
    public form :undefined | HTMLFormElement | HTMLDivElement;

    constructor(formDetails?: any, AJAXOptions?:any) {

        console.log("NFSFU234FormValidation is loaded....");
        

        if (typeof window === 'undefined') {
            this.form = undefined;
        }
        else
        {
            this.form = ( formDetails && formDetails['form'] && checkVariableType(formDetails['form']) === 'string' && formDetails['form'] !== '' ) ? document.getElementById(formDetails['form']) : (formDetails && formDetails['form'] && checkVariableType(formDetails['form']) === 'HTML element') ? formDetails['form'] : ( document.getElementById('jsForm') ) ? document.getElementById('jsForm') : (document.querySelector('form') ) ? document.querySelector('form')  : undefined; // The form element.
        }

        if ( this.form !== undefined && checkVariableType(this.form) === 'HTML Element'  )
        {

            const doesNoValidateAttrExist = this.form.getAttribute('novalidate') ? true : false;

            if ( ! doesNoValidateAttrExist )
            {
                this.form.setAttribute('novalidate', '')
            }

            this.form.addEventListener('submit', (e)=>{
                e.preventDefault();
            });

        }

        this.AJAXResult = null; // Store the result of an AJAX call.

    }

    // private populateOptionsVariables(options: any, formElement: HTMLFormElement | HTMLDivElement | undefined) {
    //     let isAjax = false;
    //     let customErrorMessages: any = {};
    //     let ajaxOptions: null | {
    //         url: string,
    //         RequestMethod: "GET" | "POST" | "PATCH" | "UPDATE" |"DELETE",
    //         RequestHeader?: object,
    //         RequestBody?: object | FormData | JSON
    //     } = null;

    //     if (typeof options === 'object' && options !== null) {
    //         isAjax = options.isAjax === true || false;
    //         customErrorMessages = options.customErrorMessages || {};
    //         ajaxOptions = options.ajaxOptions || null;
    //     } else if (formElement) {
    //         isAjax = formElement.getAttribute('isAjax')?.trim() === "true";
    //         ajaxOptions = null; // Update this based on how you set ajax options for formElement
    //     }

    //     return { isAjax, customErrorMessages, ajaxOptions };
    // }

    // private populateOptionsVariables(options: any, formElement: HTMLFormElement | HTMLDivElement | undefined) {
    //     let isAjax = false;
    //     let ajaxOptions: null | {
    //         url: string,
    //         RequestMethod: "GET" | "POST" | "PATCH" | "UPDATE" |"DELETE",
    //         RequestHeader?: object,
    //         RequestBody?: object | FormData | JSON
    //     } = null;
    
    //     if (typeof options === 'object' && options !== null) {
    //         isAjax = options.isAjax === true || false;
    //         ajaxOptions = options.ajaxOptions || null;
    //     } else if (formElement) {
    //         isAjax = formElement.getAttribute('isAjax')?.trim() === "true";
    
    //         // Extract URL from action attribute of the form element
    //         const url = formElement.getAttribute('action') || '#';
    //         // Extract RequestMethod from method attribute of the form element
    //         const requestMethod = (formElement.getAttribute('method') || 'GET').toUpperCase();
    
    //         // Extract request headers with prefix "nfsfu234_fv_reqHeader_"
    //         const requestHeaders: { [key: string]: string } = {};
    //         Array.from(formElement.attributes).forEach((attr) => {
    //             console.log(attr.name.trim());
    //             console.log(attr.name.trim().startsWith('nfsfu234_fv_req_Header_'));
                

    //             if (attr.name.trim().startsWith('nfsfu234_fv_req_Header_')) {
    //                 console.log(true);
                    
    //                 const headerKey = attr.name.replace('nfsfu234_fv_req_Header_', '');
    //                 requestHeaders[headerKey] = attr.value;
    //             }
    //         });
    
    //         ajaxOptions = {
    //             url,
    //             RequestMethod: requestMethod as "GET" | "POST" | "PATCH" | "UPDATE" |"DELETE",
    //             RequestHeader: Object.keys(requestHeaders).length > 0 ? requestHeaders : undefined,
    //             RequestBody: undefined // Will be handled later in the submit function
    //         };
    //     }
    
    //     return { isAjax, ajaxOptions };
    // }

    private populateOptionsVariables(options: any, formElement: HTMLFormElement | HTMLDivElement | undefined) {
        let isAjax = false;
        let ajaxOptions: null | {
            url: string,
            RequestMethod: "GET" | "POST" | "PATCH" | "UPDATE" | "DELETE",
            RequestHeader?: { [key: string]: string },
            RequestBody?: object | FormData | JSON
        } = null;
    
        if (typeof options === 'object' && options !== null) {
            isAjax = options.isAjax === true || false;
            ajaxOptions = options.ajaxOptions || null;
        } else if (formElement) {
            isAjax = formElement.getAttribute('isAjax')?.trim() === "true";
    
            const url = formElement.getAttribute('action') || '';
            const requestMethod = (formElement.getAttribute('method') || 'GET').toUpperCase();
    
            const requestHeaders: { [key: string]: string } = {};
            const regex = /^nfsfu234_fv_reqheader_(.+)$/i; // Updated regular expression
    
            for (let i = 0; i < formElement.attributes.length; i++) {
                const attr = formElement.attributes[i];
                // console.log(attr.name);
                
                const originalName = attr.name; // Store the original attribute name
                const attrName = attr.name.toLowerCase(); // Convert attribute name to lowercase for comparison
    
                const match = attrName.match(regex);
    
                if (match) {
                    const headerKey = match[1]; // Extract the header key from the matched attribute name
                    requestHeaders[headerKey] = attr.value; // Use the original attribute name as the key
                }
            }
    
            ajaxOptions = {
                url,
                RequestMethod: requestMethod as "GET" | "POST" | "PATCH" | "UPDATE" | "DELETE",
                RequestHeader: Object.keys(requestHeaders).length > 0 ? requestHeaders : undefined,
                RequestBody: undefined
            };
        }
    
        return { isAjax, ajaxOptions };
    }
    
    
    
    
    
    
    
    
    


    // Inside your FormValidation class
    public submit(userOptions?: FormValidationOptions | HTMLFormElement | HTMLDivElement | string, callback?: any): boolean | Promise<any> {

        let formElement: HTMLFormElement | HTMLDivElement | undefined;
        let options: any = {}; // Initialize options as an empty object

        let isAjax = false;
        let customErrorMessages:object =  {};
        let ajaxOptions: null | {
            url: string,
            RequestMethod: "GET" | "POST" | "PATCH" | "UPDATE" |"DELETE",
            RequestHeader?: object,
            RequestBody?: object | FormData | JSON | any
        } = null;
        
        


        // if (typeof userOptions === 'string') {
        //     formElement = document.getElementById(userOptions) as HTMLFormElement | HTMLDivElement | undefined;

        //     // if ( formElement?.getAttribute('isAjax')?.trim() === "true" )
        //     // {
        //     //     isAjax = true;
        //     // }

        // } else if (userOptions instanceof HTMLFormElement || userOptions instanceof HTMLDivElement) {
            
        //     formElement = userOptions;

        //     // if ( formElement?.getAttribute('isAjax')?.trim() === "true" )
        //     // {
        //     //     isAjax = true;
        //     // }

        // } else if (userOptions && typeof userOptions === 'object' && userOptions.form) {

        //     if (typeof userOptions.form === 'string') {
        //         formElement = document.getElementById(userOptions.form) as HTMLFormElement | HTMLDivElement | undefined;

        //         // if ( formElement?.getAttribute('isAjax')?.trim() === "true" )
        //         // {
        //         //     isAjax = true;
        //         // }

        //     } else if (userOptions.form instanceof HTMLFormElement || userOptions.form instanceof HTMLDivElement) {
        //         formElement = options.form;

        //         // if ( formElement?.getAttribute('isAjax')?.trim() === "true" )
        //         // {
        //         //     isAjax = true;
        //         // }

        //     }

        //     console.log(formElement);
            

        // } 
        // else {

        //     formElement = this.form;

        // }

        if (typeof userOptions === 'string') {
            formElement = document.getElementById(userOptions) as HTMLFormElement | HTMLDivElement | undefined;
            options.form = formElement
            options.customErrorMessages = []
            // console.log("userOptions is a string");
        } else if (userOptions instanceof HTMLFormElement || userOptions instanceof HTMLDivElement) {
            formElement = userOptions;
            // options = {}
            options.form = userOptions
            options.customErrorMessages = []
            // console.log("userOptions is an HTMLFormElement or HTMLDivElement");
        } else if (userOptions && typeof userOptions === 'object' && userOptions.form) {
            // options = userOptions
            if (typeof userOptions.form === 'string') {
                formElement = document.getElementById(userOptions.form) as HTMLFormElement | HTMLDivElement | undefined;
                // console.log("userOptions.form is a string from an object");
            } else if (userOptions.form instanceof HTMLFormElement || userOptions.form instanceof HTMLDivElement) {
                formElement = userOptions.form;
                // console.log("options.form is an HTMLFormElement or HTMLDivElement from an object");
            }

            options.form = formElement
            options.customErrorMessages = userOptions.customErrorMessages ?? []

        } 
        else {
            formElement = this.form;
            
            options.form = this.form
            options.customErrorMessages = []
        }


        // console.log("I am indaboski: ",options);
        

        if (formElement) {

            const doesNoValidateAttrExist = formElement.getAttribute('novalidate') ? true : false;

            if ( ! doesNoValidateAttrExist )
            {
                formElement.setAttribute('novalidate', '')
            }

            formElement.addEventListener('submit', (e)=>{
                e.preventDefault();
            });

            const { isAjax: processedIsAjax, ajaxOptions: processedAjaxOptions } = this.populateOptionsVariables(userOptions, formElement);

  

            // console.log("is AJAX", isAjax);
            // console.log("Custom Error Messages", customErrorMessages);
            // console.log("AJAX OPTIONS", ajaxOptions);
            

            // Initialize errMsg with default values
            let errMsg: ErrorMessageInterface = { message: "", type: "" };

            // Validating the form here
            const errMsgFromFunction = validateForm(formElement, options);


            if (errMsgFromFunction === true) {
                errMsg.message = "success";
                errMsg.type = "success";
                errMsg.data = null
            }
            else if ( checkVariableType(errMsgFromFunction) === 'object' )
            {

                const errMessageFromValidate = errMsgFromFunction.message as string;
                errMsg.message = errMessageFromValidate || "Error";
                // errMsg.type = "error";
                errMsg.data = errMsgFromFunction
                
            }
            else
            {
                errMsg.message = "Error";
                errMsg.type = "error";
            }

            isAjax = processedIsAjax;
            ajaxOptions = processedAjaxOptions;

            ajaxOptions?.RequestBody = getFormDetails(formElement)

            if ( errMsg.message === "success" )
            {
                
                // proceed with form submission using ajax or submit function
                console.log("Submit Your Form jare...");

                if ( isAjax && ajaxOptions !== null )
                {
                    
                    return ajax(ajaxOptions).then( response => {

                        // console.log(response);
                        // console.log(response.code);
                        // console.log(response.message);

                        const responseCode = response.code || response.status;

                        // console.log(responseCode);
                        

                        if ( responseCode >= 300 && responseCode <= 500 )
                        {


                            const errorDetails = {
                                type : 'modal',
                                message: response.message,
                                duration: 3000,
                                element: formElement,
                                success: false,
                            }

                            errMsg.message = response.message;
                            errMsg.type = "error";
                            errMsg.code = responseCode
                            errMsg.data = response.data
                            
                            this.displayError(errorDetails);

                            // ExceptionHandler(response.message, "error_1")
                            // ExceptionHandler(response.message)
                            console.error("THIS IS ERR_ ", response.message);

                            return errMsg;
                            
                        }
                        else
                        {

                            
                            console.log("Success");

                            return response;
                            


                        }
                        

                    } )
                    .catch(error => {
                        console.error( "LOLK " , error);
                        return errMsg;
                    })

                }

            }
            // else
            // {
            //     console.log("Validation Error jor. Lets go 😂😂");
                
            // }


            // check if the form or options attribute has either isAjax || AJAXUrl are either tur or false
            // check if the formElement is a form element then submit by default or send ajax by reset 

            if (checkVariableType(callback) === 'function') {
                const message = callback(errMsg);
                return true;
            }

            return new Promise((resolve, reject)=>{

                // console.log( "FINAL END RESULT: ", errMsg);
                

                resolve(errMsg)

            });

        } else {
            ExceptionHandler('Form element not found.')
            // console.error('Form element not found.');
            return false;
        }
0
    }

    public validate(userOptions?: HTMLFormElement | HTMLDivElement | string, callback?: any): boolean | Promise<any>
    {

        let formElement: HTMLFormElement | HTMLDivElement | undefined;
        let options: any = {}; // Initialize options as an empty object

        if (typeof userOptions === 'string') {
            formElement = document.getElementById(userOptions) as HTMLFormElement | HTMLDivElement | undefined;
            options.form = formElement
            options.customErrorMessages = []
            // console.log("userOptions is a string");
        } else if (userOptions instanceof HTMLFormElement || userOptions instanceof HTMLDivElement) {
            formElement = userOptions;
            // options = {}
            options.form = userOptions
            options.customErrorMessages = []
            // console.log("userOptions is an HTMLFormElement or HTMLDivElement");
        } else if (userOptions && typeof userOptions === 'object' && userOptions.form) {
            // options = userOptions
            if (typeof userOptions.form === 'string') {
                formElement = document.getElementById(userOptions.form) as HTMLFormElement | HTMLDivElement | undefined;
                // console.log("userOptions.form is a string from an object");
            } else if (userOptions.form instanceof HTMLFormElement || userOptions.form instanceof HTMLDivElement) {
                formElement = userOptions.form;
                // console.log("options.form is an HTMLFormElement or HTMLDivElement from an object");
            }

            options.form = formElement
            options.customErrorMessages = userOptions.customErrorMessages ?? []

        } 
        else {
            formElement = this.form;
            
            options.form = this.form
            options.customErrorMessages = userOptions.customErrorMessages ?? []
        }

        // console.log(options);
        // return false;
        

        if (formElement) {

            const doesNoValidateAttrExist = formElement.getAttribute('novalidate') ? true : false;

            if ( ! doesNoValidateAttrExist )
            {
                formElement.setAttribute('novalidate', '')
            }

            formElement.addEventListener('submit', (e)=>{
                e.preventDefault();
            });

            // Initialize errMsg with default values
            let errMsg: ErrorMessageInterface = { message: "", type: "" };

            // console.log(options);
            // console.log("");
            // console.log(checkVariableType(userOptions));
            // console.log("");
            
            

            // Validating the form here
            const errMsgFromFunction = validateForm(formElement, options);

            if (errMsgFromFunction === true) {
                errMsg.message = "success";
                errMsg.type = "success";
                errMsg.data = null
            }
            else if ( checkVariableType(errMsgFromFunction) === 'object' )
            {

                const errMessageFromValidate = errMsgFromFunction.message as string;
                errMsg.message = errMessageFromValidate || "Error";
                errMsg.type = "error";
                errMsg.data = errMsgFromFunction
                
            }
            else
            {
                errMsg.message = "Error";
                errMsg.type = "error";
            }

            // if ( errMsg.message === "success" && checkVariableType(callback) !== 'function' )
            // {
                
            //     // proceed with form submission using ajax or submit function
            //     console.log("Submit Your Form jare...");
            //     return true;

            // }


            // check if the form or options attribute has either isAjax || AJAXUrl are either tur or false
            // check if the formElement is a form element then submit by default or send ajax by reset 

            if (checkVariableType(callback) === 'function') {
                const message = callback(errMsg);
                return true;
            }

            return new Promise((resolve, reject)=>{

                resolve(errMsg)

            });

        } else {
            ExceptionHandler('Form element not found.')
            // console.error('Form element not found.');
            return false;
        }


    }


    /**
     * ajax
     */
    public ajax(AJAXOptions: any) {
        
        // return this.AJAXResult = ajax(AJAXOptions);
        return this.AJAXResult = ajax(AJAXOptions);
    }

    /**
     * getAJAXResponse
     * 
     * This function retrieves the AJAX response that was stored in the global variable `AJAXResult`.
     * It returns the AJAX response if available or false if no response is found.
     * 
     * @returns {Promise|boolean} - Returns the AJAX response (a Promise) if available; otherwise, returns false.
     */
    getAJAXResponse(): Promise<any> | boolean {
        if (this.AJAXResult) {
            // If `AJAXResult` contains a value (Promise), return the AJAX response
            return this.AJAXResult;
        } else {
            // If `AJAXResult` is empty (null or undefined), return false
            return false;
        }
    }
    
    getFormDetails(form: HTMLFormElement | HTMLDivElement | string)
    {

        if ( ! form )
        {
            form = this.form as HTMLDivElement;
        }
        
        // console.log("hkbik", getFormDetails(form));
        

        return getFormDetails(form);
    }

    loading(message: string, submitBtn: string | HTMLElement | null = null, form: string | HTMLElement | null = null)
    {
        if (form !== null) {
            form = typeof form === 'string' ? document.getElementById(form) : form;
            form = typeof form === 'undefined' ? null : form;
        }

        // Call the loading function
        return loading(message, submitBtn, form);
    }

    displayError(details:any)
    {
        displayError(details);
    }
    
    isEmail(email: string): boolean
    {
        return isEmail(email);
    }

    isURL(url: string)
    {
        return isURL(url);
    }

    isNumber(number: string | number): boolean
    {
        return checkVariableType(number) === 'number';
    }

    isZipCode(zipCode: string | number): boolean
    {
        return isZIP(zipCode);
    }

    isZipcode(zipCode: string | number): boolean
    {
        return isZIP(zipCode);
    }

    countString(string: string): number
    {
        return countString(string);
    }

    async generatePassword(length?:number, shouldHash?: boolean )
    {
        return await generatePassword(length, shouldHash);
    }

    async generateRandomPassword(length:number, shouldHash:boolean )
    {
        return await generatePassword(length, shouldHash);
    }

    passwordStrength()
    {}

    getPasswordStrength()
    {}

    checkPassword( password: string, minLength: number = 8, maxLength: number = 20, includeSymbolsCheck: boolean = false, userSymbolRegex: RegExp | string = '')
    {
        return checkPassword( password, minLength, maxLength, includeSymbolsCheck, userSymbolRegex );
    }

    async verifyPassword(stringPassword: string, hashedPassword: string, isHashed: boolean = false): Promise<boolean>
    {
        try {
            // Call verifyPassword and return its result
            return await verifyPassword(stringPassword, hashedPassword, isHashed);
        } catch (error) {
            console.error("Error verifying password: ", error); // Log an error if there's an issue
            return false; // Return false in case of an error
        }
    }

    async passwordMatch(stringPassword: string, hashedPassword: string, isHashed: boolean = false): Promise<boolean>
    {
        try {
            // Call verifyPassword and return its result
            return await verifyPassword(stringPassword, hashedPassword, isHashed);
        } catch (error) {
            console.error("Error verifying password: ", error); // Log an error if there's an issue
            return false; // Return false in case of an error
        }
    }

    async hashPassword(password: string)
    {
        try {
            // Call hashPassword and return its result
            return await hashPassword(password);
        } catch (error) {
            console.error("Error hashing password: ", error); // Log an error if there's an issue
            return false; // Return false in case of an error
        }
    }

    togglePasswordVisibility(input: HTMLInputElement, showIcon: string | HTMLElement | null = null, hideIcon: string | HTMLElement | null = null)
    {
        return togglePasswordVisibility(input, showIcon, hideIcon);
    }

    togglePasswordVisibilityAll(icons: { show?: Element | null, hide?: Element | null } = {}, uform: string | HTMLFormElement | HTMLDivElement | null = null, toggleAll: boolean = false)
    {
        return togglePasswordVisibilityAll(icons, uform, toggleAll);
    }

    validateInput(inputField: HTMLInputElement | string, options: any = {}, callback?: any)
    {
        let individualResponseMessage: ErrorMessageInterface | boolean = {  type: 'error', code : 400 };

        if ( typeof inputField === 'string' )
        {
            inputField = document.getElementById(inputField) as HTMLInputElement
        }

        if ( ! inputField  )
        {
            let errorLogLevel = LogLevelInterface;

            individualResponseMessage.message = "The Input Feild you are trying to validate is undefined.";

            // console.log(individualResponseMessage);
            
            ExceptionHandler("The Input Feild you are trying to validate is undefined.");

            // return individualResponseMessage;
        }        

        else
        {

            options.form = options.form ?? this.form

            const validateResponse: string | boolean | ErrorMessageInterface  = validateInput(inputField, options, callback);

            if ( validateResponse === true )
            {
                return true;
            }

            individualResponseMessage = validateResponse as ErrorMessageInterface

        }

        // let errMsg = validateResponse.message;

        if (checkVariableType(callback) === 'function') {
            const message = callback(individualResponseMessage);
            // return true;
        }

        return new Promise((resolve, reject)=>{

            resolve(individualResponseMessage)

        });

        // return validateInput(inputField, options, callback);
    }

    validateAllInput(form: HTMLFormElement | HTMLDivElement | string, customErrorMessages: any)
    {

        form = form ?? this.form;
        return validateAllInput(form, customErrorMessages);
    }

    validateRadio(radioInputField: HTMLInputElement | string, customErrorMessage?: any)
    {
        return validateRadio(radioInputField, customErrorMessage);
    }

    validateAllRadio(form: HTMLFormElement | HTMLDivElement, customErrorMessage: any)
    {
        form = form ?? this.form;
        return validateAllRadio(form, customErrorMessage);
    }

    validateCheckbox( checkboxInputField: HTMLInputElement, options?: any )
    {
        return validateCheckbox(checkboxInputField, options);
    }

    validateAllCheckbox(form: HTMLFormElement | HTMLDivElement, options: any)
    {

        form = form ?? this.form;

        return validateAllCheckbox(form, options);
    }

    validateSelect( selectField: HTMLSelectElement, options:any, callback: any)
    {
        options.form = options.form ?? this.form

        return validateSelect(selectField, options, callback);
    }

    validateAllSelect(form: HTMLFormElement | HTMLDivElement, options: any)
    {
        return validateAllSelect(form, options);
    }

    validateTextarea(textareaField: HTMLTextAreaElement, options: any )
    {

        // // Check if the textarea element is valid and exists in the DOM
        // if (!textareaField) {
        //     console.error("The textarea element to validate is not found.");
        //     return false;
        // }

        // let targetForm: HTMLFormElement | HTMLDivElement;

        // // Check if the form parameter is provided and valid
        // if (typeof form === 'string') {
        //     const formElement = document.querySelector(form);
        //     if (!formElement) {
        //         console.error(`Form with selector "${form}" not found.`);
        //         return false;
        //     }
        //     targetForm = formElement as HTMLFormElement | HTMLDivElement;
        // } else if (form instanceof HTMLFormElement || form instanceof HTMLDivElement) {
        //     targetForm = form;
        // } else if (form === undefined) {
        //     // If form is not provided, assume the textarea's parent form
        //     const parentForm = textareaField.form;
        //     if (!parentForm) {
        //         console.error("Parent form for the textarea element not found.");
        //         return false;
        //     }
        //     targetForm = parentForm;
        // } else {
        //     console.error("Invalid form parameter.");
        //     return false;
        // }

        // // Call the actual validation function with the validated parameters
        // const options = {
        //     customErrorMessage: customErrorMessage, 
        //     errorType: isErrorInline, 
        //     form: targetForm
        // }
        return validateTextarea(textareaField, options);
    }

    validateAllTextarea(form: HTMLFormElement | HTMLDivElement, options: any)
    {
        return validateAllTextarea(form, options);
    }


    restrictInputWithCounter(inputElement: HTMLInputElement | HTMLTextAreaElement, counterContainer: HTMLElement, options: any = {})
    {
        return restrictInputLengthWithCounter(inputElement, counterContainer, options);
    }

    public containsOnlyIntegers(str: string):boolean
    {
        return containsOnlyIntegers(str)
    }

    getPageURL()
    {
        return getPageUrl();
    }

    redirect(url: string | null | false | undefined = null, delay: number = 0)
    {

        if ( ! url )
        {
            url = this.getPageURL();
        }

        redirect(url, delay);
    }

    checkVariableType(variable: any)
    {
        return checkVariableType(variable);
    }

    isOnline()
    {
        return isOnline();
    }

    reset(u_form: HTMLFormElement | HTMLDivElement | string): boolean
    {

        let form;

        if ( ! u_form )
        {
            form = this.form;
        }
        else
        {
            form = u_form
        }

        return reset(form);
    }

}

export default NFSFU234FormValidation