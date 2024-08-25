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
import ErrorMessageInterface from "./interfaces/ErrorMessagesInterface";
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

    
class NFSFU234FormValidation {
    // private attributes
    private AJAXResult: null | Promise<any>;

    // public attributes
    public form: HTMLFormElement | HTMLDivElement | undefined;
    
    public customErrorMessages: { [key: string]: string } = {};

    constructor(formDetails?: any, AJAXOptions?: any) {
        console.log("NFSFU234FormValidation is loaded....");
    
        if (typeof window === 'undefined') {
            this.form = undefined;
        } else {
            // Initial assignment of this.form
            let formElement: HTMLFormElement | HTMLDivElement | undefined = undefined;
    
            // Check if formDetails is provided and valid
            if (formDetails && formDetails['form']) {
                if (typeof formDetails['form'] === 'string' && formDetails['form'] !== '') {
                    formElement = document.getElementById(formDetails['form']) as HTMLFormElement | HTMLDivElement | undefined;
                } else if (formDetails['form'] instanceof HTMLElement) {
                    formElement = formDetails['form'] as HTMLFormElement | HTMLDivElement;
                }
            }
    
            // Fallback to default form selectors if formElement is not set
            if (!formElement) {
                formElement = document.getElementById('jsForm') as HTMLFormElement | HTMLDivElement | undefined;
            }
            if (!formElement) {
                formElement = document.querySelector('form') as HTMLFormElement | HTMLDivElement | undefined;
            }
    
            // Assign formElement to this.form
            this.form = formElement;
        }
    
        // If form is found and is an HTMLElement, add novalidate attribute and submit event listener
        if (this.form && this.form instanceof HTMLElement) {
            if (!this.form.hasAttribute('novalidate')) {
                this.form.setAttribute('novalidate', '');
            }
    
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
            });
        }
    
        this.AJAXResult = null; // Store the result of an AJAX call.
    }
    

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
            isAjax = formElement.getAttribute('isAjax')?.trim() === "true" || false;

            const url = formElement.getAttribute('action') || '';
            const requestMethod = (formElement.getAttribute('method') || 'GET').toUpperCase();

            const requestHeaders: { [key: string]: string } = {};
            const regex = /^nfsfu234_fv_reqheader_(.+)$/i;

            for (let i = 0; i < formElement.attributes.length; i++) {
                const attr = formElement.attributes[i];
                const originalName = attr.name;
                const attrName = attr.name.toLowerCase();
                const match = attrName.match(regex);

                if (match) {
                    const headerKey = match[1];
                    requestHeaders[headerKey] = attr.value;
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

    // public submit(userOptions?: HTMLFormElement | HTMLDivElement | string | { form: string | HTMLFormElement | HTMLDivElement, customErrorMessages?: { [key: string]: string } }, callback?: any): boolean | Promise<any> {
    //     this.form = this.form || undefined;
    //     this.customErrorMessages = this.customErrorMessages || {};

    //     let formElement: HTMLFormElement | HTMLDivElement | undefined = this.form;
    //     let options: any = this.customErrorMessages;

    //     let isAjax = false;
    //     let ajaxOptions: null | {
    //         url: string,
    //         RequestMethod: "GET" | "POST" | "PUT" | "PATCH" | "UPDATE" | "DELETE",
    //         RequestHeader?: object,
    //         RequestBody?: object | FormData | JSON | any
    //     } = null;

    //     if (typeof userOptions === 'string') {
    //         formElement = document.getElementById(userOptions) as HTMLFormElement | HTMLDivElement | undefined;
    //         options.form = formElement;
    //         options.customErrorMessages = [];
    //     } else if (userOptions instanceof HTMLFormElement || userOptions instanceof HTMLDivElement) {
    //         formElement = userOptions;
    //         options.form = userOptions;
    //         options.customErrorMessages = [];
    //     } else if (userOptions && typeof userOptions === 'object' && 'form' in userOptions) {
    //         if (typeof userOptions.form === 'string') {
    //             formElement = document.getElementById(userOptions.form) as HTMLFormElement | HTMLDivElement | undefined;
    //         } else if (userOptions.form instanceof HTMLFormElement || userOptions.form instanceof HTMLDivElement) {
    //             formElement = userOptions.form;
    //         }
    //         options.form = formElement;
    //         options.customErrorMessages = userOptions.customErrorMessages ?? [];
    //     } else {
    //         formElement = this.form;
    //         options.form = this.form;
    //         options.customErrorMessages = [];
    //     }

    //     if (formElement) {
    //         const doesNoValidateAttrExist = formElement.getAttribute('novalidate') ? true : false;

    //         if (!doesNoValidateAttrExist) {
    //             formElement.setAttribute('novalidate', '');
    //         }

    //         formElement.addEventListener('submit', (e) => {
    //             e.preventDefault();
    //         });

    //         const { isAjax: processedIsAjax, ajaxOptions: processedAjaxOptions } = this.populateOptionsVariables(userOptions, formElement);

    //         let errMsg: ErrorMessageInterface = { message: "", type: "" };
    //         const errMsgFromFunction = validateForm(formElement, options);

    //         if (errMsgFromFunction === true) {
    //             errMsg.message = "success";
    //             errMsg.type = "success";
    //             errMsg.data = null;
    //         } else if (typeof errMsgFromFunction === 'object') {
    //             const errMessageFromValidate = errMsgFromFunction.message || null;
    //             errMsg.message = errMessageFromValidate || "Error";
    //             errMsg.data = errMsgFromFunction;
    //         } else {
    //             errMsg.message = "Error";
    //             errMsg.type = "error";
    //         }

    //         isAjax = processedIsAjax;
    //         ajaxOptions = processedAjaxOptions;

    //         if (!ajaxOptions) {
    //             return false;
    //         }

    //         ajaxOptions.RequestBody = getFormDetails(formElement);

    //         if (errMsg.message === "success") {
    //             if (isAjax && ajaxOptions !== null) {
    //                 return ajax(ajaxOptions).then(response => {
    //                     const responseCode = response.code || response.status;
    //                     if (responseCode >= 300 && responseCode <= 500) {
    //                         const errorDetails = {
    //                             type: 'modal',
    //                             message: response.message,
    //                             duration: 3000,
    //                             element: formElement,
    //                             success: false,
    //                         };

    //                         errMsg.message = response.message;
    //                         errMsg.type = "error";
    //                         errMsg.code = responseCode;
    //                         errMsg.data = response.data;

    //                         this.displayError(errorDetails);
    //                         console.error("THIS IS ERR_ ", response.message);

    //                         return errMsg;
    //                     } else {
    //                         console.log("Success");
    //                         return response;
    //                     }
    //                 }).catch(error => {
    //                     console.error("LOLK ", error);
    //                     return errMsg;
    //                 });
    //             }
    //         }

    //         if (typeof callback === 'function') {
    //             const message = callback(errMsg);
    //             return true;
    //         }

    //         return new Promise((resolve) => {
    //             resolve(errMsg);
    //         });
    //     } else {
    //         ExceptionHandler('Form element not found.');
    //         return false;
    //     }
    // }

    public submit(
        userOptions?: HTMLFormElement | HTMLDivElement | string | { form: string | HTMLFormElement | HTMLDivElement, customErrorMessages?: { [key: string]: string } }, 
        callback?: any
    ): boolean | Promise<any> {
        this.form = this.form || undefined;
        this.customErrorMessages = this.customErrorMessages || {};
    
        let formElement: HTMLFormElement | HTMLDivElement | undefined = this.form;
        let options: any = this.customErrorMessages;
    
        let isAjax = false;
        let ajaxOptions: null | {
            url: string,
            RequestMethod: "GET" | "POST" | "PUT" | "PATCH" | "UPDATE" | "DELETE",
            RequestHeader?: object,
            RequestBody?: object | FormData | JSON | any
        } = null;
    
        // Handle userOptions to determine formElement and options
        if (typeof userOptions === 'string') {
            formElement = document.getElementById(userOptions) as HTMLFormElement | HTMLDivElement | undefined;
            options = { form: formElement, customErrorMessages: [] };
        } else if (userOptions instanceof HTMLFormElement || userOptions instanceof HTMLDivElement) {
            formElement = userOptions;
            options = { form: formElement, customErrorMessages: [] };
        } else if (userOptions && typeof userOptions === 'object' && 'form' in userOptions) {
            if (typeof userOptions.form === 'string') {
                formElement = document.getElementById(userOptions.form) as HTMLFormElement | HTMLDivElement | undefined;
            } else if (userOptions.form instanceof HTMLFormElement || HTMLDivElement) {
                formElement = userOptions.form;
            }
            options = { form: formElement, customErrorMessages: userOptions.customErrorMessages ?? [] };
        }
    
        // Ensure formElement is available
        if (!formElement) {
            ExceptionHandler('Form element not found.');
            return false;
        }
    
        // Handle form's novalidate attribute
        const doesNoValidateAttrExist = formElement.getAttribute('novalidate') !== null;
        if (!doesNoValidateAttrExist) {
            formElement.setAttribute('novalidate', '');
        }
    
        // Prevent default form submission
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    
        // Process options for Ajax submission
        const { isAjax: processedIsAjax, ajaxOptions: processedAjaxOptions } = this.populateOptionsVariables(userOptions, formElement);
        isAjax = processedIsAjax;
        ajaxOptions = processedAjaxOptions;
    
        // Validate form and determine the error message
        let errMsg: ErrorMessageInterface = { message: "", type: "" };
        const errMsgFromFunction = validateForm(formElement, options);
    
        if (errMsgFromFunction === true) {
            errMsg.message = "success";
            errMsg.type = "success";
            errMsg.data = null;
        } else if (typeof errMsgFromFunction === 'object' && errMsgFromFunction !== null && 'message' in errMsgFromFunction) {
            const errMessageFromValidate = errMsgFromFunction.message;
            errMsg.message = (typeof errMessageFromValidate === 'string' || typeof errMessageFromValidate === 'number' || typeof errMessageFromValidate === 'boolean')
                ? errMessageFromValidate 
                : "Error";
            errMsg.type = "error";
            errMsg.data = errMsgFromFunction;
        } else {
            errMsg.message = "Error";
            errMsg.type = "error";
        }
    
        // Handle Ajax submission if applicable
        if (errMsg.message === "success" && isAjax && ajaxOptions !== null) {
            ajaxOptions.RequestBody = getFormDetails(formElement);
            return ajax(ajaxOptions)
                .then(response => {
                    const responseCode = response.code || response.status;
                    if (responseCode >= 300 && responseCode <= 500) {
                        const errorDetails = {
                            type: 'modal',
                            message: response.message,
                            duration: 3000,
                            element: formElement,
                            success: false,
                        };
    
                        errMsg.message = response.message;
                        errMsg.type = "error";
                        errMsg.code = responseCode;
                        errMsg.data = response.data;
    
                        this.displayError(errorDetails);
                        console.error("THIS IS ERR_ ", response.message);
    
                        return errMsg;
                    } else {
                        console.log("Success");
                        return response;
                    }
                })
                .catch(error => {
                    console.error("LOLK ", error);
                    return errMsg;
                });
        }
    
        // Handle callback if provided
        if (typeof callback === 'function') {
            callback(errMsg);
            return true;
        }
    
        // Return a promise resolving to the error message
        return new Promise((resolve) => {
            resolve(errMsg);
        });
    }
    
    

    // public validate(userOptions?: HTMLFormElement | HTMLDivElement | string | { form: HTMLFormElement | HTMLDivElement | string; customErrorMessages?: any[] }, callback?: any): boolean | Promise<any> {
    //     let formElement: HTMLFormElement | HTMLDivElement | undefined;
    //     let options: any = {}; // Initialize options as an empty object
    
    //     if (typeof userOptions === 'string') {
    //         formElement = document.getElementById(userOptions) as HTMLFormElement | HTMLDivElement | undefined;
    //         options.form = formElement;
    //         options.customErrorMessages = [];
    //     } else if (userOptions instanceof HTMLFormElement || userOptions instanceof HTMLDivElement) {
    //         formElement = userOptions;
    //         options.form = userOptions;
    //         options.customErrorMessages = [];
    //     } else if (userOptions && typeof userOptions === 'object' && 'form' in userOptions) {
    //         if (typeof userOptions.form === 'string') {
    //             formElement = document.getElementById(userOptions.form) as HTMLFormElement | HTMLDivElement | undefined;
    //         } else if (userOptions.form instanceof HTMLFormElement || userOptions.form instanceof HTMLDivElement) {
    //             formElement = userOptions.form;
    //         }
    //         options.form = formElement;
    //         options.customErrorMessages = userOptions.customErrorMessages ?? [];
    //     } else {
    //         formElement = this.form;
    //         options.form = this.form;
    //         options.customErrorMessages = [];
    //     }
    
    //     if (formElement) {
    //         const doesNoValidateAttrExist = formElement.getAttribute('novalidate') ? true : false;
    
    //         if (!doesNoValidateAttrExist) {
    //             formElement.setAttribute('novalidate', '');
    //         }
    
    //         formElement.addEventListener('submit', (e) => {
    //             e.preventDefault();
    //         });
    
    //         // Initialize errMsg with default values
    //         let errMsg: ErrorMessageInterface = { message: "", type: "" };
    
    //         // Validating the form here
    //         const errMsgFromFunction = validateForm(formElement, options);
    
    //         if (errMsgFromFunction === true) {
    //             errMsg.message = "success";
    //             errMsg.type = "success";
    //             errMsg.data = null;
    //         } else if (checkVariableType(errMsgFromFunction) === 'object') {
    //             const errMessageFromValidate = errMsgFromFunction.message || null;
    //             errMsg.message = errMessageFromValidate || "Error";
    //             errMsg.type = "error";
    //             errMsg.data = errMsgFromFunction;
    //         } else {
    //             errMsg.message = "Error";
    //             errMsg.type = "error";
    //         }
    
    //         if (checkVariableType(callback) === 'function') {
    //             callback(errMsg);
    //             return true;
    //         }
    
    //         return new Promise((resolve, reject) => {
    //             resolve(errMsg);
    //         });
    //     } else {
    //         ExceptionHandler('Form element not found.');
    //         return false;
    //     }
    // }
    
    public validate(
        userOptions?: HTMLFormElement | HTMLDivElement | string | { form: HTMLFormElement | HTMLDivElement | string; customErrorMessages?: any[] }, 
        callback?: any
    ): boolean | Promise<any> {
        let formElement: HTMLFormElement | HTMLDivElement | undefined;
        let options: any = {}; // Initialize options as an empty object
    
        // Determine the form element and options based on userOptions
        if (typeof userOptions === 'string') {
            formElement = document.getElementById(userOptions) as HTMLFormElement | HTMLDivElement | undefined;
            options = { form: formElement, customErrorMessages: [] };
        } else if (userOptions instanceof HTMLFormElement || userOptions instanceof HTMLDivElement) {
            formElement = userOptions;
            options = { form: formElement, customErrorMessages: [] };
        } else if (userOptions && typeof userOptions === 'object' && 'form' in userOptions) {
            if (typeof userOptions.form === 'string') {
                formElement = document.getElementById(userOptions.form) as HTMLFormElement | HTMLDivElement | undefined;
            } else if (userOptions.form instanceof HTMLFormElement || userOptions.form instanceof HTMLDivElement) {
                formElement = userOptions.form;
            }
            options = { form: formElement, customErrorMessages: userOptions.customErrorMessages ?? [] };
        } else {
            formElement = this.form;
            options = { form: formElement, customErrorMessages: [] };
        }
    
        // Ensure form element exists
        if (!formElement) {
            ExceptionHandler('Form element not found.');
            return false;
        }
    
        // Handle form's novalidate attribute
        const doesNoValidateAttrExist = formElement.getAttribute('novalidate') !== null;
        if (!doesNoValidateAttrExist) {
            formElement.setAttribute('novalidate', '');
        }
    
        // Prevent default form submission
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    
        // Initialize errMsg with default values
        let errMsg: ErrorMessageInterface = { message: "", type: "" };
    
        // Validate the form using the provided function
        const errMsgFromFunction = validateForm(formElement, options);
    
        if (errMsgFromFunction === true) {
            errMsg.message = "success";
            errMsg.type = "success";
            errMsg.data = null;
        } else if (typeof errMsgFromFunction === 'object' && errMsgFromFunction !== null && 'message' in errMsgFromFunction) {
            const errMessageFromValidate = errMsgFromFunction.message;
    
            // Ensure the message is of the correct type before assignment
            if (typeof errMessageFromValidate === 'string' || typeof errMessageFromValidate === 'number' || typeof errMessageFromValidate === 'boolean') {
                errMsg.message = errMessageFromValidate;
            } else {
                errMsg.message = "Error"; // Fallback to a default message if the type doesn't match
            }
    
            errMsg.type = "error";
            errMsg.data = errMsgFromFunction;
        } else {
            errMsg.message = "Error";
            errMsg.type = "error";
        }
    
        // If a callback is provided, invoke it with errMsg
        if (typeof callback === 'function') {
            callback(errMsg);
            return true;
        }
    
        // Return a promise resolving to the error message
        return new Promise((resolve) => {
            resolve(errMsg);
        });
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

    loading(message: string, submitBtn: string | HTMLElement | null = null, form: string | HTMLElement | null | undefined = null)
    {
        if (form !== null) {
            form = typeof form === 'string' ? document.getElementById(form) : form;
            form = typeof form === 'undefined' ? this.form : form;
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

    isZip(zipCode: string | number): boolean
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
        return checkPassword( password, includeSymbolsCheck, minLength, maxLength, userSymbolRegex );
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

    togglePasswordVisibilityAll(icons: { 
        show: string | HTMLElement | null, 
        hide: string | HTMLElement | null 
    } , uform: string | HTMLFormElement | HTMLDivElement | null = null, toggleAll: boolean = false)
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
            url = this.getPageURL() as string;
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

if (typeof window !== 'undefined') {
    // Make the library available globally
    (window as any).NFSFU234FormValidation = NFSFU234FormValidation;
}

export default NFSFU234FormValidation