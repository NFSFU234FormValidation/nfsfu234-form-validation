// import { ExceptionHandler } from "../errorHandling/ExceptionHandler";
// import ErrorMessageInterface from "../interfaces/ErrorMessagesInterface";
// import { areAllElementsTrue, checkVariableType } from "../utilities";
// import validateAllInput from "./validateAllnput";
// import validateAllSelect from "./validateAllSelect";
// import validateAllTextarea from "./validateAllTextarea";

// /**
//  * Validate Form Inputs, Textareas, and Selects
//  * @param {HTMLFormElement} form - The form element to validate.
//  * @param {Object} customErrorMessages - Custom error messages for form validation (optional).
//  * @param {boolean} isErrorInline - Whether to display error messages inline or in a modal (optional).
//  * @returns {boolean} Returns true if form validation passes, otherwise false.
//  */
// const validateForm = (form: HTMLFormElement | HTMLDivElement | null, options?: any, isErrorInline?: boolean): boolean | ErrorMessageInterface | ErrorMessageInterface[] => {

//     // Initialize errMsg with default values
//     let errMsg: ErrorMessageInterface = { message: "", data: null, code : 400 };
//     let errMsgArray: ErrorMessageInterface[] = [];

//     // Check if the form exists; if not, log an error to the console and return false
//     if (!form) {
//         ExceptionHandler("Form element not found.");

//         errMsg.message = "Form element not found.";

//         return errMsg;
//     }


//     // if ( checkVariableType(options) !== 'object' )
//     // {
//     //     ExceptionHandler("options are not provided");
//     //     errMsg.message = "options are not provided"
//     //     errMsgArray.push(errMsg)
//     //     return errMsgArray;
//     // }

//     // Initialize an array to track whether each validation check passes (true) or fails (false)
//     const shouldContinue: boolean[] = [];

//     // console.log("kytfdkftfln  ", options);
    


//     const isValidateAllInputs = validateAllInput(form, options);
//     const isValidateAllTextareas = validateAllTextarea(form, options);
//     const isValidateAllSelects = validateAllSelect(form, options);

//     if (isValidateAllInputs === true) {
//         shouldContinue.push(true);
//     } else {

//         let msg:ErrorMessageInterface = {code: 400, message: ""};
//         let resMsg:ErrorMessageInterface[] = isValidateAllInputs as any;
        
//         msg.message = "Inputs Validation Failed";
//         msg.data = resMsg

//         errMsgArray.push(msg)

//         // console.log("I AM AN ERROR: ", msg);
//         errMsgArray['inputs'] = msg
    
//         shouldContinue.push(false);
//     }

//     if (isValidateAllTextareas === true) {
//         shouldContinue.push(true);
//     } else {
//         shouldContinue.push(false);
//         let msg:ErrorMessageInterface = {code: 400, message: ""};
//         let resMsg:ErrorMessageInterface[] = isValidateAllTextareas as any;
        
//         msg.message = "Textarea Validation Failed";
//         msg.data = resMsg

//         errMsgArray.push(msg)
//         errMsgArray['textareas'] = msg

//     }

//     if (isValidateAllSelects === true) {
//         shouldContinue.push(true);
//     } else {
//         shouldContinue.push(false);
//         let msg:ErrorMessageInterface = {code: 400, message: ""};
//         let resMsg:ErrorMessageInterface[] = isValidateAllSelects as any;
        
//         msg.message = "Selects Validation Failed";
//         msg.data = resMsg

//         errMsgArray.push(msg)

//         errMsgArray['selects'] = msg
//     }

    

//     // Check if all elements in the shouldContinue array are equal to true
//     const checkIfAllElementsAreTrue = areAllElementsTrue(shouldContinue);

//     if ( checkIfAllElementsAreTrue )
//     {
//         return true;
//     }

//     const mainResponse:ErrorMessageInterface = {message: "Form Validation Error", data: errMsgArray};



//     // console.log("MAIN RESPONSE: ", mainResponse);

//     return mainResponse;

// };

// export default validateForm;



import { ExceptionHandler } from "../errorHandling/ExceptionHandler";
import ErrorMessageInterface from "../interfaces/ErrorMessagesInterface";
import { areAllElementsTrue, checkVariableType } from "../utilities";
import validateAllInput from "./validateAllnput";
import validateAllSelect from "./validateAllSelect";
import validateAllTextarea from "./validateAllTextarea";

const validateForm = (
    form: HTMLFormElement | HTMLDivElement | null,
    options?: any,
    isErrorInline?: boolean
): boolean | ErrorMessageInterface | { [key: string]: ErrorMessageInterface } => {

    let errMsg: ErrorMessageInterface = { message: "", data: null, code: 400 };
    let errMsgArray: { [key: string]: ErrorMessageInterface } = {};

    if (!form) {
        ExceptionHandler("Form element not found.");
        errMsg.message = "Form element not found.";
        return errMsg;
    }

    const shouldContinue: boolean[] = [];

    const isValidateAllInputs = validateAllInput(form, options);
    const isValidateAllTextareas = validateAllTextarea(form, options);
    const isValidateAllSelects = validateAllSelect(form, options);

    if (isValidateAllInputs === true) {
        shouldContinue.push(true);
    } else {
        let msg: ErrorMessageInterface = { code: 400, message: "" };
        let resMsg: ErrorMessageInterface[] = isValidateAllInputs as any;

        msg.message = "Inputs Validation Failed";
        msg.data = resMsg;

        errMsgArray['inputs'] = msg;
        shouldContinue.push(false);
    }

    if (isValidateAllTextareas === true) {
        shouldContinue.push(true);
    } else {
        shouldContinue.push(false);
        let msg: ErrorMessageInterface = { code: 400, message: "" };
        let resMsg: ErrorMessageInterface[] = isValidateAllTextareas as any;

        msg.message = "Textarea Validation Failed";
        msg.data = resMsg;

        errMsgArray['textareas'] = msg;
    }

    if (isValidateAllSelects === true) {
        shouldContinue.push(true);
    } else {
        shouldContinue.push(false);
        let msg: ErrorMessageInterface = { code: 400, message: "" };
        let resMsg: ErrorMessageInterface[] = isValidateAllSelects as any;

        msg.message = "Selects Validation Failed";
        msg.data = resMsg;

        errMsgArray['selects'] = msg;
    }

    const checkIfAllElementsAreTrue = areAllElementsTrue(shouldContinue);

    if (checkIfAllElementsAreTrue) {
        return true;
    }

    const mainResponse: ErrorMessageInterface = {
        message: "Form Validation Error",
        data: errMsgArray
    };

    return mainResponse;
};

export default validateForm;
