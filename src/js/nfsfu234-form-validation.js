'use strict';

// Import bycrypt
const bcrypt = require('bcryptjs');

// This is an Immediately Invoked Function Expression (IIFE) that takes an argument 'global'.
// The 'global' argument is set to the global object in the browser (window) or Node.js (global).
(function (global) {

    // Define the class 'NFSFU234FormValidation'.
    class NFSFU234FormValidation {
        // Constructor of the class. It takes two parameters 'formOptions' and 'ajaxOptions'.
        // The constructor is called when a new instance of the class is created.
        constructor(formOptions, ajaxOptions) {
            // Log a message to indicate that the 'NFSFU234FormValidation' library has been initiated.
            console.log("NFSFU234FormValidation Library Initiated");

            if (typeof window !== 'undefined') {
                this._form = ( formOptions && formOptions['form'] && this._checkVariableType(formOptions['form']) === 'string' && formOptions['form'] !== '' ) ? document.getElementById(formOptions['form']) : (formOptions && formOptions['form'] && this._checkVariableType(formOptions['form']) === 'HTML element') ? formOptions['form'] : ( document.getElementById('jsForm') ) ? document.getElementById('jsForm') : (document.querySelector('form') ) ? document.querySelector('form')  : null; // The form element.
            }
            else
            {
                this._form = null;
            }

            // Initialize properties with default values.
            this._errorMessageContainer = null; // A container to display error messages.
            this._AJAXResult = null; // Store the result of an AJAX call.
            
            // Assign the provided 'formOptions' and 'ajaxOptions' to class properties.
            this._formOptions = (formOptions) ? formOptions : []; // Options related to the form.
            this._ajaxOptions = (ajaxOptions) ? ajaxOptions : []; // Options related to AJAX calls.

            // Assign specific properties from 'formOptions' to class properties.

            this._isErrorInline = ( formOptions && formOptions['isErrorMessageInline'] === false ) ? false : true; // A flag to determine whether error messages should be displayed inline.

            // Custom error messages provided in 'formOptions'.
            this._customErrorMessages = (formOptions && formOptions['customErrorMessages']) ? formOptions['customErrorMessages'] : [];
        }

        /**
         * Hashes a password securely based on the environment.
         * @param {string} password - The password to be hashed.
         * @returns {Promise<string>} A promise that resolves to the hashed password.
         */
        async _hashPassword(password) {
            if (typeof window === 'undefined') {
            // Node.js environment
            return this._nodeHash(password);
            } else {
            // Browser environment
            return this._browserHash(password);
            }
        }

        /**
         * Hashes a password using bcrypt in the browser environment.
         * @param {string} password - The password to be hashed.
         * @returns {Promise<string>} A promise that resolves to the hashed password.
         */
        async _browserHash(password) {
            // Generate a unique salt for each password
            const salt = await bcrypt.genSalt(10);

            // Hash the password with the generated salt using bcrypt
            const hashedPassword = await bcrypt.hash(password, salt);

            return hashedPassword;
        }

        /**
         * Hashes a password using bcrypt in the Node.js environment.
         * @param {string} password - The password to be hashed.
         * @returns {Promise<string>} A promise that resolves to the hashed password.
         */
        async _nodeHash(password) {

            // Set an alternative random number generator for bcrypt
            bcrypt.setRandomFallback((len) => {
                const randomBytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                randomBytes[i] = Math.floor(Math.random() * 256);
                }
                return randomBytes;
            });

            // Generate a unique salt for each password
            const salt = await bcrypt.genSalt(10);

            // Hash the password with the generated salt using bcrypt
            const hashedPassword = await bcrypt.hash(password, salt);

            return hashedPassword;
        }
        
        // Check if a given string is a valid email address.
        _isEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Check if a string contains only integers.
        _containsOnlyIntegers(str) {
            return /^\d+$/.test(str);
        }

        /**
         * Check if a given value is a valid ZIP code (exactly 6 digits).
         * @param {string} zipCode - The ZIP code to be validated.
         * @returns {boolean} - Returns true if the ZIP code is valid, otherwise false.
         */
        _isZIP(zipCode) {
            // Regular expression to match ZIP codes with 5 or 6 digits
            const zipCodeRegex = /^\d{5}(?:\d{1})?/;
            return zipCodeRegex.test(zipCode);
        }
  

        // Check if a given string is a valid URL starting with 'http://' or 'https://'.
        _isURL( url) {
            // Regular expression to check for 'http://' or 'https://' at the beginning
            const urlPattern = /^(http:\/\/|https:\/\/)/i;
            // If the input is a string, test it against the regular expression.
            return (typeof url === 'string') ? urlPattern.test(url) : false;
        }

        /**
         * Checks the data type of a variable and returns the corresponding type as a string.
         *
         * @param {*} variable - The variable to check the data type.
         * @returns {string} Returns the data type of the variable as a string.
         */
        _checkVariableType(variable) {
            // Check if the variable is a string
            if (typeof variable === 'string') {
            return 'string';
            }
            // Check if the variable is a number
            else if (typeof variable === 'number') {
            return 'number';
            }
            // Check if the variable is a boolean
            else if (typeof variable === 'boolean') {
            return 'boolean';
            }
            // Check if the variable is undefined
            else if (typeof variable === 'undefined') {
            return 'undefined';
            }
            // Check if the variable is null
            else if (variable === null) {
            return 'null';
            }
            // Check if the variable is an HTMLElement (assumes that HTMLElement is defined in the environment)
            else if (variable instanceof HTMLElement) {
            return 'HTML element';
            }
            // Check if the variable is an array
            else if (typeof variable === 'object' && variable instanceof Array) {
            return 'array';
            }
            // Check if the variable is an object
            else if (typeof variable === 'object' && variable instanceof Object) {
            return 'object';
            }
            // Check if the variable is a function
            else if (typeof variable === 'function') {
            return 'function';
            }
            // If none of the above conditions match, the data type is unknown
            else {
            return 'null';
            }
        }
                

        /**
         * Count input characters and restrict input while typing in a given input element.
         * @param {HTMLInputElement} inputElement - The HTML input element to count and restrict.
         * @param {HTMLElement} [counterContainer] - Optional container to display the character count. If not provided, it creates one automatically.
         * @param {Object} [options={}] - An object with the following optional properties:
         *   - maxLength {number}: Maximum allowed characters (default: 250).
         *   - minLength {number}: Minimum allowed characters (default: 0).
         *   - shouldButtonDisable {boolean}: Flag to determine whether to disable buttons on reaching maxLength (default: false).
         *   - formId {string}: The ID of the form element associated with the input.
         * @returns {boolean} Return true if the input meets the restrictions, otherwise false.
         */
        _countInputCharactersAndRestrictInputWhileTyping(inputElement, counterContainer, options = {}) {

            // Check if the input element exists.
            if (!inputElement) {
                console.error("The input element you are trying to count and restrict is not found. Check your HTML code.");
                return false;
            }

            // Extract options or set default values.
            const maxLength = (parseInt(options['maxLength']) && options['maxLength'] >= 1) ? options['maxLength'] : 250;
            const minLength = (parseInt(options['minLength'])) ? options['minLength'] : 0;
            const shouldButtonDisable = (options['shouldButtonDisable']) ? true : false;
            const form = (options['formId'] != '' && document.getElementById(options['formId'])) ? document.getElementById(options['formId']) : (!options['formId']) ? document.querySelector('form') : options['formId'];

            // Add an event listener to the input element for counting and restricting.
            inputElement.addEventListener('input', () => {
                // Count the number of characters in the input element.
                var textLength = this._countString(inputElement.value);
                var returnMessage = false;

                // Check if a counter container is provided or create one if not.
                var counterElement;
                // counterContainer = (counterContainer && this._checkVariableType(counterContainer ) === 'HTML element' ) ? counterContainer : (counterContainer && this._checkVariableType(counterContainer ) === 'string' && document.getElementById(counterContainer) ) ? document.getElementById(counterContainer) : ( document.querySelector('.js-counterContainer') ) ? document.querySelector('.js-counterContainer') : false;
                if (!counterContainer) {
                    counterElement = document.createElement('span');
                    counterElement.classList.add('js-counterContainer');
                    inputElement.parentNode.appendChild(counterElement);
                } else {
                    counterElement = counterContainer;
                }

                // Apply restrictions based on character count and options.
                if (textLength > maxLength) {
                    textLength = maxLength;
                    counterElement.classList.remove('text-fail');
                    counterElement.classList.add('text-success');
                    inputElement.value = inputElement.value.slice(0, maxLength);

                    // Enable buttons in the associated form (if specified).
                    if (shouldButtonDisable && form) {
                        form.querySelectorAll('button').forEach((button) => {
                            button.disabled = false;
                        });
                    }

                    returnMessage = true;
                } else if (textLength >= maxLength) {
                    inputElement.value = inputElement.value.slice(0, maxLength);
                    counterElement.classList.remove('text-fail');
                    counterElement.classList.add('text-success');

                    // Enable buttons in the associated form (if specified).
                    if (shouldButtonDisable && form) {
                        form.querySelectorAll('button').forEach((button) => {
                            button.disabled = false;
                        });
                    }

                    returnMessage = true;
                } else if (textLength >= minLength && minLength !== 0) {
                    counterElement.classList.remove('text-fail');
                    counterElement.classList.add('text-success');

                    // Enable buttons in the associated form (if specified).
                    if (shouldButtonDisable && form) {
                        form.querySelectorAll('button').forEach((button) => {
                            button.disabled = false;
                        });
                    }

                    returnMessage = true;
                } else {
                    counterElement.classList.add('text-fail');

                    // Enable buttons in the associated form (if specified).
                    if (shouldButtonDisable && form) {
                        form.querySelectorAll('button').forEach((button) => {
                            button.disabled = false;
                        });
                    }
                }

                // Update the counter element with the current character count.
                counterElement.innerHTML = `${textLength}/${maxLength}`;

                return returnMessage;
            });
        }


        /**
         * Generate a random password that meets specific criteria.
         * The generated password will have a random length between 'minLength' and 'maxLength',
         * and it will contain at least one uppercase letter, one symbol, and one number.
         * The remaining characters will be randomly selected from uppercase letters, lowercase letters,
         * numbers, and symbols to meet the desired password length.
         *
         * @returns {string} The randomly generated password.
         */
        _generatePassword() {
            /**
             * The minimum length of the generated password.
             * @type {number}
             * @constant
             */
            const minLength = 8;

            /**
             * The maximum length of the generated password.
             * @type {number}
             * @constant
             */
            const maxLength = 16;

            /**
             * A string containing all uppercase letters.
             * @type {string}
             * @constant
             */
            const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            /**
             * A string containing all lowercase letters.
             * @type {string}
             * @constant
             */
            const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";

            /**
             * A string containing all digits (numbers).
             * @type {string}
             * @constant
             */
            const numbers = "0123456789";

            /**
             * A string containing all symbols.
             * @type {string}
             * @constant
             */
            const symbols = "!@#$%^&*()";

            /**
             * The generated password.
             * @type {string}
             */
            let password = "";

            /**
             * Generate a random length for the password between 'minLength' and 'maxLength'.
             * @type {number}
             */
            const randomLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

            // Add at least one uppercase letter to the password.
            password += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];

            // Add at least one symbol to the password.
            password += symbols[Math.floor(Math.random() * symbols.length)];

            // Add at least one number to the password.
            password += numbers[Math.floor(Math.random() * numbers.length)];

            /**
             * The number of characters already added to the password.
             * Start with 3 since we added one uppercase letter, one symbol, and one number already.
             * @type {number}
             */
            let charactersAdded = 3;

            // Add remaining characters based on the randomLength.
            while (charactersAdded < randomLength) {
                // Choose a random character type: 0 for uppercase letter, 1 for lowercase letter, 2 for symbol, 3 for number.
                const randomCharType = Math.floor(Math.random() * 4);

                if (randomCharType === 0) {
                    password += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
                } else if (randomCharType === 1) {
                    password += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
                } else if (randomCharType === 2) {
                    password += symbols[Math.floor(Math.random() * symbols.length)];
                } else {
                    password += numbers[Math.floor(Math.random() * numbers.length)];
                }

                charactersAdded++;
            }

            // Return the generated password.
            return password;
        }

        /**
         * Check if a given password meets specific criteria.
         * @param {string} password - The password to be checked.
         * @param {boolean} [includeSymbolsCheck=false] - Flag to determine if symbols check is required (default: false).
         * @param {RegExp | string} [userSymbolRegex=''] - Custom regular expression or string representing symbols to check (default: '').
         * @returns {boolean | string} Returns true if the password meets the criteria; otherwise, returns an error message.
         */
        _checkPassword(password, includeSymbolsCheck = false, userSymbolRegex = '') {
            // Define the minimum and maximum length of the password.
            const minLength = 8;
            const maxLength = 20;

            // Regular expressions for checking uppercase, lowercase, and numeric characters.
            const uppercaseRegex = /[A-Z]/;
            const lowercaseRegex = /[a-z]/;
            const numbersRegex = /[0-9]/;

            // Initialize an error message variable.
            var errorMessage = '';

            // Check the length of the password.
            if (password.length < minLength || password.length > maxLength) {
                errorMessage = "Make sure the length of your password ranges from 8 - 20 characters";
                return errorMessage;
            }

            // Check if the password contains at least one uppercase letter.
            if (!uppercaseRegex.test(password)) {
                errorMessage = "Your password needs to have at least 1 uppercase (A-Z)";
                return errorMessage;
            }

            // Check if the password contains at least one lowercase letter.
            if (!lowercaseRegex.test(password)) {
                errorMessage = "Your password needs to have at least one lowercase (a-z)";
                return errorMessage;
            }

            // Check if the password contains at least one numeric character.
            if (!numbersRegex.test(password)) {
                errorMessage = "Your password needs to have at least one number (0-9)";
                return errorMessage;
            }

            // If symbols check is required, perform the check.
            if (includeSymbolsCheck) {
                // Define the regular expression for symbols or use the custom one provided by the user.
                const symbolRegex = (userSymbolRegex !== '') ? userSymbolRegex : /[!@#$%^&*()]/;

                // Check if the password contains at least one symbol.
                if (!symbolRegex.test(password)) {
                    errorMessage = "Your password needs to have one symbol e.g (!@#$%^&*())";
                    return errorMessage;
                }
            }

            // If all checks pass, return true.
            return true;
        }


        _countString(string) 
        {
            // Check if input is a string, if not, convert it to string
            const stringInput = typeof string === "string" ? string : string.toString();
            
            return stringInput.length;
        }

        /**
         * Get the current URL (page URL) of the window.
         * @returns {string} The current URL (page URL) of the window.
         */
        _getPageUrl() {
            // Access the 'window' object and retrieve the current URL using 'window.location.href'.
            // This will return the complete URL, including the protocol (http/https), domain, port, path, and query parameters.
            return window.location.href;
        }

        /**
         * Toggle password visibility for all password inputs within a given form.
         * @param {HTMLFormElement} form - The form element containing the password inputs.
         * @param {Object} [icons={'show': 'show', 'hide': 'hide'}] - Custom icons to display for password visibility toggle (default: {'show': 'show', 'hide': 'hide'}).
         */
        _togglePasswordVisibility(icons = [], uform,) {

            var form = (uform) ? uform : (document.getElementById(uform) ) ? document.getElementById(uform) : (this._form);

            // Get all password inputs within the specified form.
            const allPasswordInputs = form.querySelectorAll('input[type="password"]');

            // Loop through each password input.
            allPasswordInputs.forEach((input) => {
                // Get all visibility icon containers within the form.
                const allVisibilityIconContainer = form.querySelectorAll('.js-togglePassword');

                // Attach a click event listener to each visibility icon container.
                allVisibilityIconContainer.forEach((iconContainer) => {
                    iconContainer.addEventListener('click', () => {
                        // Get the current input type (either 'password' or 'text').
                        const inputType = input.getAttribute('type');
                        // Toggle the input type between 'password' and 'text'.
                        input.setAttribute('type', inputType === 'password' ? 'text' : 'password');

                        // Determine the icons to use for showing and hiding the password.
                        const showIcon = (icons && icons['show'] && icons['show'] !== '' ) ? icons['show'] : 'show';
                        const hideIcon = (icons && icons['hide'] && icons['hide'] !== '' ) ? icons['hide'] : 'hide';

                        // Update the visibility icon based on the current input type.
                        if (inputType === 'password') {
                            iconContainer.innerHTML = hideIcon;
                        } else if (inputType === 'text') {
                            iconContainer.innerHTML = showIcon;
                        } else {
                            iconContainer.innerHTML = showIcon;
                        }
                    });
                });
            });
        }


        /**
         * focusInputElement
         * 
         * This function sets focus on an input element and adds a CSS class to highlight it temporarily.
         * After a specified duration, the CSS class is removed to revert the highlighting effect.
         * 
         * @param {HTMLElement} inputElement - The input element to focus on.
         * @param {number} duration - The duration (in milliseconds) for which the highlighting effect is visible.
         */
         _focusInputElement(inputElement, duration) {
            // Set focus on the specified input element to bring it into focus.
            inputElement.focus();

            // Add the 'input-focus-error' CSS class to the input element to apply the temporary highlighting effect.
            inputElement.classList.add('input-focus-error');

            // After the specified duration, remove the 'input-focus-error' CSS class to revert the highlighting effect.
            setTimeout(() => {
                inputElement.classList.remove('input-focus-error');
            }, duration);
        }

        /**
         * displayErrorInline
         * 
         * This function displays an error message inline next to an input field on a login page.
         * The error message is shown for a specified duration and can also be a success message.
         * 
         * @param {HTMLElement} inputField - The input field element where the error message will be displayed.
         * @param {string} message - The error message to be displayed.
         * @param {number} duration - The duration (in milliseconds) for which the error message is visible inline. Default: 3000 ms.
         * @param {boolean} isSuccess - A flag indicating if the message is a success message (true) or an error message (false). Default: false.
         */
         _displayErrorInline(inputField, message, duration = 3000, isSuccess = false) {
            // Focus on the input field and temporarily highlight it using the _focusInputElement function.
            this._focusInputElement(inputField, duration);

            // Create the inline error message container element.
            const errorMessageContainer = document.createElement('div');
            errorMessageContainer.classList.add('js-inline-message');

            // Set the error message content inside the container.
            errorMessageContainer.innerHTML = message;

            // Append the error message container to the parent of the input tag, placing it inline next to the input field.
            inputField.parentNode.appendChild(errorMessageContainer);

            // Add the 'text-success' class to the container if it's a success message, making it visually distinct.
            if (isSuccess) {
                errorMessageContainer.classList.add('text-success');
            }

            // After the specified duration, remove the error message container to hide the message.
            setTimeout(() => {
                inputField.parentNode.removeChild(errorMessageContainer);
            }, duration);
        }

        /**
         * displayErrorModal
         *
         * This function displays an error message in a modal-like container for a specified duration.
         * The error message can be customized to indicate success (green color) or failure (red color).
         * If a custom error container ID is provided, the error message is appended to that container;
         * otherwise, it creates a new container and appends it to the form.
         *
         * @param {string} message - The error message to display.
         * @param {HTMLElement} form - The form element to which the error message will be added.
         * @param {string} errorContainerId - Optional. The ID of the custom error container.
         * @param {number} duration - Optional. The duration (in milliseconds) for which the error message is visible. Default: 3000 ms.
         * @param {boolean} isSuccess - Optional. If true, the message is displayed as a success message (green color). Default: false.
         * @param {boolean} shouldLogToConsole - Optional. If true, the error message is logged to the console. Default: false.
         */
        _displayErrorModal(message, form, errorContainerId = '', duration = 3000, isSuccess = false, shouldLogToConsole = false) {

            // Determine the error container based on the provided ID or create a new one if not available
            var errorMessageParentContainer;

            if (errorContainerId != '') {
                errorMessageParentContainer = document.getElementById(errorContainerId);
            } else if (document.querySelectorAll('#js-errorMessageContainer').length > 0) {
                errorMessageParentContainer = form.querySelector('#js-errorMessageContainer');
            } else {
                errorMessageParentContainer = document.createElement('div');
                errorMessageParentContainer.classList.add('js-errorMessageContainer');
                errorMessageParentContainer.setAttribute('id', 'js-errorMessageContainer');
                form.appendChild(errorMessageParentContainer);
            }

            // Create the error message container and append it to the error container parent
            var errorMessageContainer = document.createElement('div');
            errorMessageContainer.classList.add('login-error-message-container', 'active');

            var errorMessageMessageContainer = document.createElement('div');
            errorMessageMessageContainer.classList.add('message', 'js-message');
            errorMessageMessageContainer.innerHTML = message;

            const errorMessageIconContainer = document.createElement('div');
            errorMessageIconContainer.classList.add('icon', 'close', 'js-close');
            errorMessageIconContainer.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z'/></svg>";

            errorMessageContainer.appendChild(errorMessageMessageContainer);
            errorMessageContainer.appendChild(errorMessageIconContainer);

            errorMessageParentContainer.appendChild(errorMessageContainer);

            // Optionally, set the success class to display the message in green color
            if (isSuccess) {
                errorMessageContainer.classList.add('success');
            }

            // Listens to when the user clicks on the close button of an error message container
            const errorMessageContainerCloseBtn = errorMessageContainer.querySelector('.js-close');
            errorMessageContainerCloseBtn.addEventListener('click', () => {
                if (errorMessageContainer && errorMessageContainer.parentNode) {
                    errorMessageContainer.parentNode.removeChild(errorMessageContainer);
                }
            });

            // Set timeout to remove the error message container after the specified duration
            setTimeout(() => {
                if (errorMessageContainer && errorMessageContainer.parentNode) {
                    errorMessageContainer.parentNode.removeChild(errorMessageContainer);
                }
            }, duration);

            // Optionally, log the error message to the console
            if (shouldLogToConsole) {
                console.error(message);
            }
        }

        /**
         * getFormDetails
         *
         * This function retrieves data from the provided form element.
         * It collects data from input fields, textareas, and select elements with the specified attribute 'data-attr-name'.
         * The collected data is stored in an object with attribute names as keys and corresponding input values as values.
         *
         * @param {HTMLElement} form - The HTML form element from which to extract data.
         * @returns {Object|boolean} - Returns an object containing form data if successful, or false if the form is not valid or no data is found.
         */
        _getFormDetails(form)
        {

            let errorMessage;

            // Check if the form exists; otherwise, log an error to the console and return false
            if (!form) {
                errorMessage = 'Check the form you are trying to validate';
                console.error(errorMessage);
                return false;
            }

            // A list to keep track of whether the extraction process for different elements was successful
            var shouldContinue = [];

            const requestData = {};

            // Getting all the HTML input tags in the form
            const allInputsInForm = form.querySelectorAll('input');

            // Getting all the HTML textarea tags in the form
            const allTextareasInForm = form.querySelectorAll('textarea');

            // Getting all the HTML select tags in the form
            const allSelectsInForm = form.querySelectorAll('select');

            // Extract data from input tags in the form
            if (allInputsInForm.length > 0) {

                allInputsInForm.forEach((input, index) => {
                    var attributeName = (input.getAttribute('data-attr-name')) ? input.getAttribute('data-attr-name') : index;
                    var inputValue = input.value;

                    if ( input.getAttribute('type') === 'checkbox' )
                    {
                        if (input.checked) {
                            inputValue = true;
                        } 
                        else
                        {
                            inputValue = false;
                        }
                    }

                    if ( input.getAttribute('type') === 'radio' )
                    {
                        if (input.checked) {
                            inputValue = true;
                        } 
                        else{
                            inputValue = false;
                        }
                    }

                    // Check if the attribute name exists and is not null, NaN, or undefined
                    if (attributeName != null || attributeName != NaN || attributeName != undefined || attributeName != 'null') {
                        requestData[attributeName] = inputValue;
                    }

                    shouldContinue.push(true);
                });
            } else {
                shouldContinue.push(true);
            }

            // Extract data from textarea tags in the form
            if (allTextareasInForm.length > 0) {

                allTextareasInForm.forEach((textarea) => {
                    var attributeName = textarea.getAttribute('data-attr-name');
                    const textareaValue = textarea.value;

                    // Check if the attribute name exists and is not null, NaN, or undefined
                    if (attributeName != null || attributeName != NaN || attributeName != undefined) {
                        requestData[attributeName] = textareaValue;
                    }

                    shouldContinue.push(true);
                });
            } else {
                shouldContinue.push(true);
            }

            // Extract data from select tags in the form
            if (allSelectsInForm.length > 0) {

                allSelectsInForm.forEach((select) => {
                    var attributeName = select.getAttribute('data-attr-name');
                    const selectValue = select.value;

                    // Check if the attribute name exists and is not null, NaN, or undefined
                    if (attributeName != null || attributeName != NaN || attributeName != undefined) {
                        requestData[attributeName] = selectValue;
                    }

                    shouldContinue.push(true);
                });
            } else {
                shouldContinue.push(true);
            }

            // Check if all elements in the form extraction process were successful
            if ( this._areAllElementsTrue(shouldContinue)) {
                return requestData; // Return the object containing the form data
            } else {
                return false; // Return false if any part of the form extraction process failed
            }

        }

        /**
         * Validate Form
         *
         * This function will be responsible for handling the validation of a form.
         * @param {HTMLFormElement} form - The form element to be validated.
         * @param {boolean} isErrorInline - Flag to determine if errors should be displayed inline or in a modal. Default is true.
         * @returns {boolean} Returns true if the form passes all validation checks, otherwise false.
         */
        _validateForm(form, customErrorMessages, isErrorInline = true) {
            // Initialize the errorMessage variable
            let errorMessage;

            // Check if the form exists; if not, log an error to the console and return false
            if (!form) {
                errorMessage = 'Check the form you are trying to validate';
                console.error(errorMessage);
                return false;
            }

            // Initialize an array to track whether each validation check passes (true) or fails (false)
            var shouldContinue = [];

            if ( this.validateAllInput(form, customErrorMessages)  )
            {
                shouldContinue.push(true);
            }
            else
            {
                shouldContinue.push(false);
            }

            if ( this.validateAllTextarea(form, customErrorMessages) )
            {
                shouldContinue.push(true);
            }
            else
            {
                shouldContinue.push(false);
            }

            if ( this.validateAllSelect(form, customErrorMessages)    )
            {
                shouldContinue.push(true);
            }
            else
            {
                shouldContinue.push(false);
            }

            // Check if all elements in the shouldContinue array are equal to true
            if (this._areAllElementsTrue(shouldContinue)) {
                return true;
            } else {
                return false;
            }

        }

        /**
         * Check if All Elements are True
         *
         * This function checks if all elements in the given array are equal to true.
         *
         * @param {Array} arr - The array to be checked.
         * @returns {boolean} Returns true if all elements in the array are equal to true, otherwise false.
         */
        _areAllElementsTrue(arr) {
            // Use the 'every' method to check if every element in the array is equal to true
            return arr.every(element => element === true);
        }


        /**
         * Count Length of Object
         *
         * This function calculates the number of properties (keys) in a given object.
         * @param {Object} object - The object for which the length is to be calculated.
         * @returns {number} Returns the number of properties (keys) in the object.
         */
        _countLengthOfObject(object) {
            // Return the number of keys in the object using Object.keys() and calculating its length
            return Object.keys(object).length;
        }

        /**
         * Submit Form via AJAX
         *
         * This private function submits a form using AJAX (Asynchronous JavaScript and XML) to the specified URL.
         *
         * @param {Object} AJAXOptions - The AJAX request options object containing URL, RequestMethod, RequestHeader, and optionally RequestType (response type).
         * @param {HTMLFormElement} form - The form element to be submitted. Default is an empty string.
         * @returns {Promise} Returns a Promise that will resolve to the JSON response from the server or reject with an error.
         */
        async _submitFormAJAX(AJAXOptions, form = '') {
            form =  ( form && form !== '' ) ? form : this._form;
            // Extract AJAX request options from the provided AJAXOptions object
            const url = ( AJAXOptions && AJAXOptions['url'] ) ? AJAXOptions['url'] : this._getPageUrl();
            const requestMethod = AJAXOptions['RequestMethod'];
            const requestHeader = AJAXOptions['RequestHeader'];
            const responseType = (AJAXOptions['RequestType'] != undefined && AJAXOptions['RequestType'] != '') ? AJAXOptions['RequestType'] : 'json';

            // Initialize the ajaxContents variable to store the AJAX request parameters
            var ajaxContents;

            // Based on the request method, configure the AJAX request parameters
            if (requestMethod === 'POST' || requestMethod === 'PUT' || requestMethod === 'DELETE' || requestMethod === 'UPDATE') {

                let requestData ;

                if (AJAXOptions && AJAXOptions['RequestBody'])
                {
                    requestData = AJAXOptions['RequestBody'];
                }
                else if (typeof window !== 'undefined') {
                    // Get the form data using the `_getFormDetails` function
                    requestData = this._getFormDetails(form);
                }
                else
                {
                    requestData = '';
                }

                ajaxContents = {
                    method: requestMethod,
                    headers: requestHeader,
                    body: JSON.stringify(requestData)
                };

            } else {
                ajaxContents = {
                    method: requestMethod,
                    headers: requestHeader
                };
            }

            console.log("AJAX Loading....");

            /**
             * Makes an AJAX request to the server.
             * The result is a Promise that will resolve to the JSON response from the server or reject with an error.
             */
            let returnResult = await fetch(url, ajaxContents);

                if (returnResult.ok) {
                    console.log("AJAX Finished....");
                    const data = await returnResult.json();

                    return data;
                    // const token = data.token; // JWT token
                    // Store the token in localStorage or a secure cookie.
                } else {
                    return "AJAX Failed....";
                }

        }

        /**
         * Validates a form using custom error messages and optional inline error display.
         *
         * @param {HTMLElement} form - The form element to be validated.
         * @param {Object} customErrorMessages - Custom error messages for validation failures.
         * @param {boolean} [isErrorInline=true] - Whether to display errors inline.
         * @returns {boolean} - Returns true if the form is valid, otherwise false.
         */
        validate(form, customErrorMessages, isErrorInline = true) {
            // If 'form' parameter is not provided, use the internal form reference '_form'
            form = form ? form : this._form;

            // Call the internal '_validateForm' function to perform validation
            if (this._validateForm(form, customErrorMessages, isErrorInline)) {
                return true; // Form is valid
            }

            return false; // Form validation failed
        }

        /**
         * Submit Form with Validation and Optional AJAX
         *
         * This public method is used to submit a form with validation and optional AJAX handling.
         *
         * @param {Object} formDetails - The object containing form details, including 'form' (the form element), and 'isErrorMessageInline' (optional - whether to display error messages inline or in a modal).
         * @param {Object} AJAXOptions - The object containing AJAX request options, including 'url', 'RequestMethod', 'RequestHeader', and optionally 'RequestType' (response type).
         * @returns {boolean|Promise} Returns a boolean value indicating the success of form validation and AJAX processing, or a Promise containing the JSON response from the server (if AJAX is used).
         */
        submit() {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            // Extract form and error display options from the this._formOptions object
            const form = this._form;
            form.setAttribute('novalidate', '');
            form.addEventListener('submit', (e)=>{
                e.preventDefault();
            });
            const isErrorMessageInline = this._isErrorInline ;
            form.classList.add('relative-position');

            // Find the submit button based on its ID or type (button) within the form
            const submitBtn = form.querySelector('button[type=submit]') || form.querySelector('button[type=submit]') || form.querySelector('input[type=submit]') || form.querySelector('#jsSubmit') || form.querySelector('button') || false;
            
            if (submitBtn) {
                // Store the initial value or innerHTML of the submit button to be restored later
                var submitBtnInitialValue = submitBtn.value || submitBtn.innerHTML;

                // Attach a click event listener to the submit button
                submitBtn.addEventListener('click', () => {
                    
                    // Initialize a variable to hold the response data
                    var responseData = false;

                    // Show a loading message on the submit button while processing the form
                    (submitBtn.value) ? submitBtn.value = 'Loading...' : submitBtn.innerHTML = "<svg fill='currentcolor' class='spin' style='margin-right: 3px;' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'><path d='M462.25 0c-6.371 0 -11.531 5.159 -11.531 11.531l0 182.219l.031 0c0 6.347 5.153 11.5 11.5 11.5l69.063 0c.343 .03 .68 .031 1.031 .031 6.372 0 11.531 -5.16 11.531 -11.531l0 -182.219l-.031 0c0 -6.347 -5.153 -11.5 -11.5 -11.5l-69.094 0c-.328 -.03 -.663 -.031 -1 -.031zm249.594 46.594c-4.082 -.111 -8.091 1.968 -10.281 5.75l-91.094 157.781l0 .062c-3.161 5.5 -1.282 12.528 4.219 15.688l60.063 34.656c.203 .136 .41 .251 .625 .375 5.5 3.187 12.533 1.313 15.719 -4.188l91.125 -157.813c3.187 -5.5 1.282 -12.533 -4.219 -15.719l-60.688 -35.063c-1.719 -.996 -3.613 -1.481 -5.469 -1.531zm-428.375 2.688c-1.856 .051 -3.75 .567 -5.469 1.563l-60.688 35.063c-5.474 3.17 -7.372 10.199 -4.219 15.688l90.781 157.219c.106 .21 .224 .418 .344 .625 3.187 5.5 10.218 7.373 15.719 4.188l60.719 -35.063c5.474 -3.17 7.341 -10.199 4.188 -15.688l-90.75 -157.188c-.107 -.217 -.221 -.444 -.344 -.656 -2.19 -3.782 -6.199 -5.861 -10.281 -5.75zm620.375 162.313c-1.848 .046 -3.722 .515 -5.438 1.5l-157.219 90.781c-.21 .106 -.418 .224 -.625 .344 -5.5 3.187 -7.373 10.218 -4.188 15.719l35.063 60.719c3.17 5.474 10.199 7.341 15.688 4.188l157.188 -90.75c.217 -.107 .444 -.221 .656 -.344 5.5 -3.185 7.374 -10.25 4.188 -15.75l-35.063 -60.688c-2.179 -3.764 -6.184 -5.82 -10.25 -5.719zm-810.375 4.656c-4.082 -.111 -8.091 1.968 -10.281 5.75l-35.063 60.688c-3.187 5.5 -1.282 12.565 4.219 15.75l157.781 91.094l.062 0c5.5 3.161 12.528 1.282 15.688 -4.219l34.656 -60.063c.136 -.203 .251 -.41 .375 -.625 3.187 -5.5 1.313 -12.533 -4.188 -15.719l-157.813 -91.125c-1.719 -.996 -3.582 -1.481 -5.438 -1.531zm712.781 234.469l0 .031c-6.347 0 -11.5 5.153 -11.5 11.5l0 69.063c-.029 .343 -.063 .68 -.063 1.031 0 6.372 5.192 11.531 11.563 11.531l182.219 0l0 -.031c6.347 0 11.5 -5.153 11.5 -11.5l0 -69.094c.03 -.328 .031 -.663 .031 -1 0 -6.371 -5.159 -11.531 -11.531 -11.531l-182.219 0zm-794.719 5.406l0 .031c-6.347 0 -11.5 5.153 -11.5 11.5l0 69.094c-.03 .328 -.031 .663 -.031 1 0 6.371 5.159 11.531 11.531 11.531l182.219 0l0 -.031c6.347 0 11.5 -5.153 11.5 -11.5l0 -69.063c.03 -.343 .031 -.68 .031 -1.031 0 -6.372 -5.16 -11.531 -11.531 -11.531l-182.219 0zm772.844 152.813c-4.075 -.097 -8.078 1.968 -10.25 5.75l-34.656 60.063c-.136 .203 -.251 .41 -.375 .625 -3.187 5.5 -1.313 12.533 4.188 15.719l157.813 91.125c5.5 3.187 12.533 1.282 15.719 -4.219l35.063 -60.688c3.187 -5.5 1.282 -12.565 -4.219 -15.75l-157.781 -91.094l-.062 0c-1.719 -.988 -3.585 -1.487 -5.438 -1.531zm-566.063 4.688c-1.848 .046 -3.722 .546 -5.438 1.531l-157.188 90.75c-.217 .107 -.444 .221 -.656 .344 -5.5 3.185 -7.374 10.25 -4.188 15.75l35.063 60.688c3.17 5.474 10.199 7.372 15.688 4.219l157.219 -90.781c.21 -.106 .418 -.224 .625 -.344 5.5 -3.187 7.373 -10.218 4.188 -15.719l-35.063 -60.719c-2.179 -3.764 -6.184 -5.82 -10.25 -5.719zm467.188 121.188c-1.856 .051 -3.719 .567 -5.438 1.563l-60.719 35.063c-5.474 3.17 -7.341 10.199 -4.188 15.688l90.75 157.188c.107 .217 .221 .444 .344 .656 3.185 5.5 10.25 7.374 15.75 4.188l60.688 -35.063c5.474 -3.17 7.372 -10.199 4.219 -15.688l-90.781 -157.219c-.106 -.21 -.224 -.418 -.344 -.625 -2.191 -3.782 -6.199 -5.861 -10.281 -5.75zm-366.313 2.719c-4.082 -.111 -8.091 1.968 -10.281 5.75l-91.125 157.813c-3.187 5.5 -1.282 12.533 4.219 15.719l60.688 35.063c5.5 3.187 12.565 1.282 15.75 -4.219l91.094 -157.781l0 -.062c3.161 -5.5 1.282 -12.528 -4.219 -15.688l-60.063 -34.656c-.203 -.136 -.41 -.251 -.625 -.375 -1.719 -.996 -3.582 -1.512 -5.438 -1.563zm148.469 57.156c-6.372 0 -11.531 5.192 -11.531 11.563l0 182.219l.031 0c0 6.347 5.153 11.5 11.5 11.5l69.094 0c.328 .03 .663 .031 1 .031 6.371 0 11.531 -5.159 11.531 -11.531l0 -182.219l-.031 0c0 -6.347 -5.153 -11.5 -11.5 -11.5l-69.063 0c-.343 -.029 -.68 -.063 -1.031 -.063z'/></svg> loading ";

                    // Perform form validation using the `_validateForm` function
                    if (!this._validateForm(form, this._customErrorMessages, isErrorMessageInline)) {
                        // If form validation fails, set responseData to false and restore the submit button text to its initial value
                        responseData = false;
                        if (submitBtn.value) {
                            submitBtn.value = submitBtnInitialValue;
                        } else {
                            submitBtn.innerHTML = submitBtnInitialValue;
                        }
                        return responseData;
                    } else {
                        // If form validation is successful, check if the AJAX request should be synchronous or asynchronous
                        if (this._countLengthOfObject(this._ajaxOptions) === 0) {
                            // If no AJAX options provided, perform a regular form submission without AJAX
                            responseData = true;
                            form.submit();

                        } else if (this._ajaxOptions['RequestMethod'] != undefined && this._ajaxOptions['RequestMethod'].length === 0 ) {
                            // If AJAX options provided but the request method is missing, log an error
                            console.error("To perform an AJAX Request, you need to give a Request Method.");
                            responseData = false;
                            if (submitBtn.value) {
                                submitBtn.value = submitBtnInitialValue;
                            } else {
                                submitBtn.innerHTML = submitBtnInitialValue;
                            }
                        } else {
                            // If AJAX options provided and request method is specified, proceed with AJAX handling
                            var requestMethod = this._ajaxOptions['RequestMethod'];

                            if (requestMethod === 'POST' || requestMethod === 'GET' || requestMethod === 'PUT' || requestMethod === 'DELETE') {
                                // If the request method is valid, initiate the AJAX request using the `_submitFormAJAX` function
                                this._AJAXResult = null;
                                this._AJAXResult = this._submitFormAJAX(this._ajaxOptions, form);
                                responseData = true;
                            } else {
                                // If the request method is invalid, log an error
                                console.error("To perform an AJAX Request, you need to give a valid Request Method. Example (POST, GET, PUT, DELETE)");
                                responseData = false;
                            }

                            // Restore the submit button text to its initial value after the AJAX request
                            if (submitBtn.value) {
                                submitBtn.value = submitBtnInitialValue;
                            } else {
                                submitBtn.innerHTML = submitBtnInitialValue;
                            }
                        }
                    }

                });
            } else {
                // If no submit button is found, log an error and return false
                console.error("No Submit Button was found. Refer to NFORSHIFU234 FORM Validation documentation at http://documentation.nforshifu.com/");
                return false;
            }

        }

        /**
         * Display an error message in the specified manner.
         *
         * @param {Object} details - The details of the error message.
         * @param {string} details.type - The type of error display (either 'inline' or 'modal').
         * @param {string} details.message - The error message to be displayed.
         * @param {number} details.duration - The duration for which the error message should be visible.
         * @param {HTMLElement} details.element - The HTML element to which the error message is associated.
         * @param {boolean} [details.success=false] - A flag indicating whether the operation was successful.
         * @returns {boolean} Returns true if the error message was displayed successfully, false otherwise.
         */
        displayError(details) {
            // Check if the code is running in a browser environment
            if (typeof window === 'undefined') {
                // Display an error message if not in a browser environment
                console.error("To access this function, you will need to execute it in a browser like Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            // Extract relevant information from the 'details' object
            const type = details.type;
            const message = details.message;
            const duration = details.duration;
            const inputField = details.element;
            const isSuccess = (details.success && details.success === true) ? true : false;

            // Check if required parameters are missing
            if (!type || !message || !duration) return false;

            // Check if 'inputField' is a valid HTML element
            if (this.checkType(inputField) !== 'HTML element') {
                // Display an error message if 'inputField' is not a valid HTML element
                console.error("The HTML Element you are trying to use is not found.");
                return false;
            }

            // Set the 'position' property of 'inputField' to 'relative'
            inputField.style.position = 'relative';

            // Determine the type of error display and invoke the appropriate function
            if (type === 'inline') {
                this._displayErrorInline(inputField, message, duration, isSuccess);
            } else if (type === 'modal') {
                this._displayErrorModal(message, inputField, '', duration, isSuccess);
            } else {
                // Display an error message for unsupported error display types
                console.error("The type of error display you specified is not supported.");
            }
        }


        /**
         * isEmail
         *
         * This function checks if the given email string is a valid email format.
         *
         * @param {string} emailString - The email string to be validated.
         * @returns {boolean} Returns true if the email is valid, otherwise false.
         */
        isEmail(emailString) {
            // Call the private _isEmail function to validate the email format
            // Return true if it is a valid email, otherwise false
            return this._isEmail(emailString) ? true : false;
        }

        /**
         * isURL
         *
         * This function checks if the given URL string has a valid format.
         *
         * @param {string} url - The URL string to be validated.
         * @returns {boolean} Returns true if the URL format is valid, otherwise false.
         */
        isURL(url) {
            // Call the private _isURL function to validate the URL format
            // Return true if it is a valid URL, otherwise false
            return this._isURL(url);
        }

        /**
         * isZipcode
         *
         * This function checks if the given zipcode is valid.
         *
         * @param {string} zipcode - The zipcode string to be validated.
         * @returns {boolean} Returns true if the zipcode is valid, otherwise false.
         */
        isZipcode(zipcode) {
            // Call the private _isZIP function to validate the zipcode format
            // Return true if it is a valid zipcode, otherwise false
            return this._isZIP(zipcode) ;
        }

        /**
         * containsOnlyIntegers
         *
         * This function checks if the given string contains only integers (whole numbers).
         *
         * @param {string} string - The string to be checked for containing only integers.
         * @returns {boolean} Returns true if the string contains only integers, otherwise false.
         */
        containsOnlyIntegers(string) {
            // Call the private _containsOnlyIntegers function to check if the string contains only integers
            // Return true if the string contains only integers, otherwise false
            return this._containsOnlyIntegers(string) ? true : false;
        }

        /**
         * countString
         *
         * This function counts the number of characters in the given string.
         *
         * @param {string} string - The string whose character count is to be calculated.
         * @returns {number} Returns the number of characters in the string.
         */
        countString(string) {
            // Call the private _countString function to calculate the number of characters in the string
            return this._countString(string);
        }

        /**
         * generateRandomPassword
         *
         * This function generates a random password.
         *
         * @returns {string|boolean} Returns the randomly generated password as a string, or false if the generated value is not a string.
         */
        generateRandomPassword() {
            // Call the private _generatePassword function to generate the random password
            const pass = this._generatePassword();

            // Check if the generated password is a string
            if (typeof pass !== 'string') {
                // If the generated value is not a string, return false
                return false;
            }

            // Return the randomly generated password as a string
            return pass;
        }

        /**
         * Checks the validity of a password string based on specific criteria.
         *
         * @param {string} passwordString - The password string to be checked for validity.
         * @param {boolean} includeSymbolsCheck - An optional flag indicating whether to include symbols check in the password criteria.
         * @param {string} symbolRegex - An optional custom regular expression to specify the allowed symbols for the password (ignored if includeSymbolsCheck is false).
         * @returns {boolean} Returns true if the password meets the specified criteria; otherwise, returns false.
         * @memberof NFSFU234FormValidation
         */
        checkPassword(passwordString, includeSymbolsCheck = false, symbolRegex = '') {
            return  this._checkPassword(passwordString, includeSymbolsCheck, symbolRegex);
        }


        /**
         * Toggles the visibility of password fields.
         *
         * @param {HTMLFormElement} uform - The form element containing the password fields to toggle.
         * @param {Object} icons - An optional object containing custom icons for password visibility toggling.
         * @param {string} icons.show - The custom icon to represent the visible password state (optional).
         * @param {string} icons.hide - The custom icon to represent the hidden password state (optional).
         * @memberof NFSFU234FormValidation
         */
        togglePasswordVisibility(icons = {}, uform = '' ) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }
            this._togglePasswordVisibility(icons, uform);
            return true;
        }


        /**
         * getAJAXResponse
         * 
         * This function retrieves the AJAX response that was stored in the global variable `_AJAXResult`.
         * It returns the AJAX response if available or false if no response is found.
         * 
         * @returns {Promise|boolean} - Returns the AJAX response (a Promise) if available; otherwise, returns false.
         */
        getAJAXResponse() {
            if (this._AJAXResult) {
                // If `_AJAXResult` contains a value (Promise), return the AJAX response
                return this._AJAXResult;
            } else {
                // If `_AJAXResult` is empty (null or undefined), return false
                return false;
            }
        }

        /**
         * AJAX Request
         *
         * This method is used to make an AJAX request using the provided `AJAXOptions`.
         * @param {Object} AJAXOptions - The object containing AJAX request options, including 'url', 'RequestMethod', 'RequestHeader', and optionally 'RequestType' (response type).
         * @returns {Promise} Returns a Promise that will resolve to the JSON response from the server or reject with an error.
         */
        async ajax(AJAXOptions) {
            // Initialize the `_AJAXResult` variable to store the AJAX response
            this._AJAXResult = null;

            // Perform the AJAX request using the private `_submitFormAJAX` function and return the response in `_AJAXResult`
            return this._AJAXResult = await this._submitFormAJAX(AJAXOptions);
            
        }

        /**
         * Hashes a password securely, automatically detecting the environment.
         * @param {string} password - The password to be hashed.
         * @returns {Promise<string>} A promise that resolves to the hashed password.
         */
        async hashPassword(password) {
            return this._hashPassword(password);
        }
                

        /**
         * validateInput
         * 
         * This function is used to validate an input field based on its type and whether it is required or not.
         * @param {HTMLElement} inputField - The input field to validate.
         * @param {Object} customErrorMessages - An optional object containing custom error messages for different validation scenarios.
         * @returns {boolean} Returns true if the input field is valid; otherwise, returns false.
         */
        validateInput(inputFeild, customErrorMessages) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            // Check if the input field exists
            if (!inputFeild) {
                console.error(`The input field you are trying to validate does not exist...`);
                return false;
            }

            // Get the input field type, value, and required status
            const inputFeildType = inputFeild.getAttribute('type');
            const inputValue = inputFeild.value;
            const isRequired = (inputFeild.getAttribute('required') != null || inputFeild.classList.contains('js-required')) ? true : false;
            var errorMessage = null;

            // Perform validation based on the input field type and required status

            if ( inputFeildType === 'text' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['text'] && customErrorMessages['text'] !== '' ) ? customErrorMessages['text'] : ( this._customErrorMessages && this._customErrorMessages['text'] && this._customErrorMessages['text'] !== '' ) ? this._customErrorMessages['text']  : "Input Field Cannot be left empty";
            }
            else if ( inputFeildType === 'checkbox' && isRequired &&  ! inputFeild.checked  )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['checkbox'] && customErrorMessages['checkbox'] !== '' ) ? customErrorMessages['checkbox'] : ( this._customErrorMessages && this._customErrorMessages['checkbox'] && this._customErrorMessages['checkbox'] !== '' ) ? this._customErrorMessages['checkbox']  : "You cannot leave this box unchecked";
            }
            else if ( inputFeildType === 'color' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['color'] && customErrorMessages['color'] !== '' ) ? customErrorMessages['color'] : ( this._customErrorMessages && this._customErrorMessages['color'] && this._customErrorMessages['color'] !== '' ) ? this._customErrorMessages['color']  : "You cannot leave this box unchecked";
            }
            else if ( inputFeildType === 'datetime' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['datetime'] && customErrorMessages['datetime'] !== '' ) ? customErrorMessages['datetime'] : ( this._customErrorMessages && this._customErrorMessages['datetime'] && this._customErrorMessages['datetime'] !== '' ) ? this._customErrorMessages['datetime']  : "you have to choose a date and time";
            }
            else if ( inputFeildType === 'datetime-local' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['datetime-local'] && customErrorMessages['datetime-local'] !== '' ) ? customErrorMessages['datetime-local'] : ( this._customErrorMessages && this._customErrorMessages['datetime-local'] && this._customErrorMessages['datetime-local'] !== '' ) ? this._customErrorMessages['datetime-local']  : "you have to choose a date and time locally";
            }
            else if ( inputFeildType === 'email' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['email'] && customErrorMessages['email']['empty'] && customErrorMessages['email']['empty'] !== '' ) ? customErrorMessages['email']['empty'] : ( this._customErrorMessages && this._customErrorMessages['email'] && this._customErrorMessages['email']['empty'] && this._customErrorMessages['email']['empty'] !== '' ) ? this._customErrorMessages['email']['empty']  : "email feild is required";
            }
            else if ( inputFeildType === 'file' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['file'] && customErrorMessages['file'] !== '' ) ? customErrorMessages['file'] : ( this._customErrorMessages && this._customErrorMessages['file'] && this._customErrorMessages['file'] !== '' ) ? this._customErrorMessages['file']  : "you have to select a file";
            }
            else if ( inputFeildType === 'hidden' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['hidden'] && customErrorMessages['hidden'] !== '' ) ? customErrorMessages['hidden'] : ( this._customErrorMessages && this._customErrorMessages['hidden'] && this._customErrorMessages['hidden'] !== '' ) ? this._customErrorMessages['hidden']  : "input value is needed";
            }
            else if ( inputFeildType === 'image' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['image'] && customErrorMessages['image'] !== '' ) ? customErrorMessages['image'] : ( this._customErrorMessages && this._customErrorMessages['image'] && this._customErrorMessages['image'] !== '' ) ? this._customErrorMessages['image']  : "you need to select an image";
            }
            else if ( inputFeildType === 'month' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['month'] && customErrorMessages['month'] !== '' ) ? customErrorMessages['month'] : ( this._customErrorMessages && this._customErrorMessages['month'] && this._customErrorMessages['month'] !== '' ) ? this._customErrorMessages['month']  : "you need to select an image";
            }
            else if ( inputFeildType === 'number' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['number'] && customErrorMessages['number'] !== '' ) ? customErrorMessages['number'] : ( this._customErrorMessages && this._customErrorMessages['number'] && this._customErrorMessages['number'] !== '' ) ? this._customErrorMessages['number']  : "you need to type a number ";
            }
            else if ( inputFeildType === 'password' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['password'] && customErrorMessages['password'] !== '' ) ? customErrorMessages['password'] : ( this._customErrorMessages && this._customErrorMessages['password'] && this._customErrorMessages['password'] !== '' ) ? this._customErrorMessages['password']  : "password feild cannot be empty";
            }
            else if ( inputFeildType === 'radio' && !this.validateRadio(inputFeild) )
            {
                errorMessage = customErrorMessages && customErrorMessages.radio ? customErrorMessages.radio : 'Cannot submit. A required radio is not checked.';
            }
            else if ( inputFeildType === 'range' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['range'] && customErrorMessages['range'] !== '' ) ? customErrorMessages['range'] : ( this._customErrorMessages && this._customErrorMessages['range'] && this._customErrorMessages['range'] !== '' ) ? this._customErrorMessages['range']  : "range has to be chosen";
            }
            else if ( inputFeildType === 'tel' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['tel'] && customErrorMessages['tel'] !== '' ) ? customErrorMessages['tel'] : ( this._customErrorMessages && this._customErrorMessages['tel'] && this._customErrorMessages['tel'] !== '' ) ? this._customErrorMessages['tel']  : "enter phone";
            }
            else if ( inputFeildType === 'time' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['time'] && customErrorMessages['time'] !== '' ) ? customErrorMessages['time'] : ( this._customErrorMessages && this._customErrorMessages['time'] && this._customErrorMessages['time'] !== '' ) ? this._customErrorMessages['time']  : "choose time";
            }
            else if ( inputFeildType === 'url' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['url'] && customErrorMessages['url']['empty'] && customErrorMessages['url']['empty'] !== '' ) ? customErrorMessages['url']['empty'] : ( this._customErrorMessages && this._customErrorMessages['url'] && this._customErrorMessages['url']['empty'] && this._customErrorMessages['url']['empty'] !== '' ) ? this._customErrorMessages['url']['empty']  : "choose time";
            }
            else if ( inputFeildType === 'week' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['week'] && customErrorMessages['week'] !== '' ) ? customErrorMessages['week'] : ( this._customErrorMessages && this._customErrorMessages['week'] && this._customErrorMessages['week'] !== '' ) ? this._customErrorMessages['week']  : "you need to select a day of the week";
            }
            else if ( inputFeildType === 'zipcode' && isRequired &&  inputValue.length === 0   )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['zipcode'] &&  customErrorMessages['zipcode']['empty'] && customErrorMessages['zipcode']['empty'] !== '' ) ? customErrorMessages['zipcode']['empty'] : ( this._customErrorMessages && this._customErrorMessages['zipcode'] && this._customErrorMessages['zipcode']['empty'] && this._customErrorMessages['zipcode']['empty'] !== '' ) ? this._customErrorMessages['zipcode']['empty']  : "zip code is required";
            }
            else if ( inputFeildType === 'email' &&  inputValue != '' && ! this._isEmail(inputValue)  )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['email']  && customErrorMessages['email']['format'] && customErrorMessages['email']['format'] !== '' ) ? customErrorMessages['email']['format'] : ( this._customErrorMessages && this._customErrorMessages['email'] && this._customErrorMessages['email']['format'] && this._customErrorMessages['email']['format'] !== '' ) ? this._customErrorMessages['email']['format']  : "please enter a valid email address (username@domain.com)";
            }
            else if ( inputFeildType === 'url' &&  inputValue != '' && ! this._isURL(inputValue) )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['url'] && customErrorMessages['url']['format'] && customErrorMessages['url']['format'] !== '' ) ? customErrorMessages['url']['format'] : ( this._customErrorMessages && this._customErrorMessages['url'] && this._customErrorMessages['url']['format'] && this._customErrorMessages['url']['format'] !== '' ) ? this._customErrorMessages['url']['format']  : "please enter a valid url (e.x https://www.domain.com/)";
            }
            else if ( inputFeildType === 'zipcode' &&  inputValue != '' && ! this._isZIP(inputValue) )
            {
                errorMessage = ( customErrorMessages && customErrorMessages['zipcode'] && customErrorMessages['zipcode']['format'] && customErrorMessages['zipcode']['format'] !== '' ) ? customErrorMessages['zipcode']['format'] : ( this._customErrorMessages && this._customErrorMessages['zipcode'] && this._customErrorMessages['zipcode']['format'] && this._customErrorMessages['zipcode']['format'] !== '' ) ? this._customErrorMessages['zipcode']['format']  : "the zipcode is not in a correct format";
            }
            else if ( inputFeildType === undefined )
            {
                errorMessage = "There is an input feild with an attribute named, 'type'. kindly visit the documentation to know the types to use.";
                console.error(errorMessage);
            }


            // If errorMessage is not null, there's a validation error
            if (errorMessage !== null) {
                // Display the error message inline or in a modal based on the isErrorInline flag
                if (this._isErrorInline) {
                    this._displayErrorInline(inputFeild, errorMessage, 3000);
                } else {
                    this._focusInputElement(inputFeild, 3000);
                    this._displayErrorModal(errorMessage, this._form);
                }

                return false; // Input field is not valid
            }

            return true; // Input field is valid
        }

        /**
         * validateAllInput
         * 
         * This function is used to validate all input fields within a specified form.
         * @param {HTMLElement} uform - The form element containing the input fields to validate.
         * @param {Object} customErrorMessages - An optional object containing custom error messages for different validation scenarios.
         * @returns {boolean} Returns true if all input fields are valid; otherwise, returns false.
         */
        validateAllInput(uform, customErrorMessages) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            // Check if the form exists
            var form = (uform) ? uform : false;

            if (!form) {
                console.error("The form you are trying to validate does not exist...");
                return false;
            }

            var shouldContinue = [];
            const allInputsInForm = form.querySelectorAll('input');

            // If there are input fields in the form
            if (allInputsInForm.length > 0) {
                allInputsInForm.forEach((input) => {
                    // Validate each input field using the validateInput function
                    if (this.validateInput(input, customErrorMessages)) {
                        shouldContinue.push(true);
                    } else {
                        shouldContinue.push(false);
                    }
                });
            } else {
                // If there are no input fields in the form, consider it as valid
                shouldContinue.push(true);
            }

            // Check if all validation results are the same (either all true or all false)
            if (shouldContinue.length > 0 && this._areAllElementsTrue(shouldContinue)) {
                return true; // All input fields are valid
            } else {
                return false; // At least one input field is invalid
            }
        }

        /**
         * validateCheckbox
         * 
         * This function is used to validate a checkbox input field.
         * @param {HTMLElement} checkboxInputField - The checkbox input field to validate.
         * @param {Object} customErrorMessage - An object containing a custom error message for the validation scenario.
         * @returns {boolean} Returns true if the checkbox is valid (checked or not required); otherwise, returns false.
         */
        validateCheckbox(checkboxInputFeild, customErrorMessage) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            // Check if the input field is a checkbox
            if (checkboxInputFeild.getAttribute('type') !== 'checkbox') {
                return false; // Not a checkbox, return false
            }

            const isRequired = (checkboxInputFeild.getAttribute('required') != null || checkboxInputFeild.classList.contains('js-required')) ? true : false;
            var shouldContinue = [];

            // If the checkbox is required and not checked
            if (isRequired && !checkboxInputFeild.checked) {
                var errorMessage = (customErrorMessage && customErrorMessage['checkbox'] && customErrorMessage['checkbox'] !== '') ? customErrorMessage['checkbox'] : 'you need to check this box';

                // Display the error message inline or in a modal based on the isErrorInline flag
                if (this._isErrorInline) {
                    this._displayErrorInline(checkboxInputFeild, errorMessage, 3000);
                } else {
                    this._focusInputElement(checkboxInputFeild, 3000);
                    this._displayErrorModal(errorMessage, this._form);
                }

                shouldContinue.push(false); // Mark the validation as unsuccessful
            } else {
                shouldContinue.push(true); // Mark the validation as successful
            }

            // Check if all validation results are the same (either all true or all false)
            if (shouldContinue.length > 0 && this._areAllElementsTrue(shouldContinue)) {
                return true; // Checkbox is valid or not required
            } else {
                return false; // Checkbox is required and not checked
            }
        }

        /**
         * validateAllCheckbox
         * 
         * This function is used to validate all the checkbox input fields within a given form.
         * @param {HTMLFormElement} uform - The form to validate.
         * @param {Object} customErrorMessage - An object containing custom error messages for the validation scenarios.
         * @returns {boolean} Returns true if all checkboxes are valid (either checked or not required); otherwise, returns false.
         */
        validateAllCheckbox(uform, customErrorMessage) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            var form = (uform) ? uform : false;

            if (!form) {
                console.error("The form you are trying to validate does not exist...");
                return false;
            }

            var shouldContinue = [];
            const allCheckboxesInForm = form.querySelectorAll('input[type=checkbox]');

            if (allCheckboxesInForm.length > 0) {
                allCheckboxesInForm.forEach((checkbox) => {
                    if (this.validateInput(checkbox, customErrorMessage)) {
                        shouldContinue.push(true); // Checkbox is valid or not required
                    } else {
                        shouldContinue.push(false); // Checkbox is required and not checked
                    }
                });
            } else {
                shouldContinue.push(true); // No checkboxes found, mark validation as successful
            }

            // Check if all validation results are the same (either all true or all false)
            if (shouldContinue.length > 0 && this._areAllElementsTrue(shouldContinue)) {
                return true; // All checkboxes are valid or not required
            } else {
                return false; // At least one required checkbox is not checked
            }
        }

        /**
         * Validate a single radio input field.
         * 
         * This function is used to validate a single radio input field.
         *
         * @param {HTMLInputElement|string} radioInputField - The radio input field to validate. It can be either an HTMLInputElement or a string representing the name attribute of the radio group.
         * @returns {boolean} Returns true if the radio input is valid (either checked or not required); otherwise, returns false.
         */
        validateRadio(radioInputField) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            let radioName;
        
            // Check if the input field is of type "radio"
            if (typeof radioInputField === 'object' && radioInputField instanceof HTMLInputElement) {
            radioName = radioInputField.getAttribute('name');
            } else if (typeof radioInputField === 'string') {
            radioName = radioInputField;
            } else {
            // Invalid input field type, return false
            return false;
            }
        
            const radioGroup = document.querySelectorAll(`input[type=radio][name=${radioName}]`);
            let isRequired = false;
            let isAnyRadioChecked = false;
        
            radioGroup.forEach((radio) => {
            // Check if the radio input is required or has a class "js-required"
            if (radio.required || radio.classList.contains('js-required')) {
                isRequired = true;
                if (radio.checked) {
                isAnyRadioChecked = true;
                }
            }
            });
        
            if (isRequired && !isAnyRadioChecked) {
            // The radio input is required, but it's not checked
            return false;
            } else {
            return true;
            }
        }
  
        
        /**
         * validateAllRadio
         * 
         * This function is used to validate all radio input fields within a given form.
         * @param {HTMLFormElement} uform - The form to validate.
         * @param {Object} customErrorMessage - An object containing custom error messages for the radio input validation scenarios.
         * @returns {boolean} Returns true if all radio inputs in the form are valid (either checked or not required); otherwise, returns false.
         */
        validateAllRadio(form, customErrorMessage) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            const allRadiosInForm = form.querySelectorAll('input[type=radio]');
            let isValid = true;
        
            allRadiosInForm.forEach((radio) => {
                if (!this.validateRadio(radio, customErrorMessage)) {
                    isValid = false;
                }
            });
        
            return isValid;
        }

        /**
         * validateSelect
         * 
         * This function is used to validate a select (dropdown) field.
         * @param {HTMLSelectElement} selectField - The select field to validate.
         * @param {Object} customErrorMessage - An object containing custom error messages for the select field validation scenarios.
         * @returns {boolean} Returns true if the select field is valid (has a selected value or is not required); otherwise, returns false.
         */
        validateSelect(selectFeild, customErrorMessage) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            // Check if the select field exists
            if (!selectFeild) {
                console.error(`The select field was not found.`);
                // Push false to the shouldContinue array to indicate validation failure
                shouldContinue.push(false);
                return false;
            }

            // Determine if the select field is required based on the 'required' attribute
            const isRequired = (selectFeild.getAttribute('required') != null || selectFeild.classList.contains('js-required')) ? true : false;
            // Check if the select field has a value selected
            const selectValue = (selectFeild.value.length === 0 || selectFeild.value === " " || selectFeild.value === ""  ) ? false : true;

            var shouldContinue = [];

            if (isRequired && !selectValue) {
                // The select field is required, but no value is selected

                // Get the error message from customErrorMessage or use a default one
                var errorMessage = (customErrorMessage && customErrorMessage['select'] && customErrorMessage['select'] !== '') ? customErrorMessage['select'] : "You have to select an option";

                // Display the error message inline or in a modal based on the isErrorInline flag
                if (this._isErrorInline) {
                    this._displayErrorInline(selectFeild, errorMessage, 3000);
                } else {
                    this._focusInputElement(selectFeild, 3000);
                    this._displayErrorModal(errorMessage, this._form);
                }

                // Push false to the shouldContinue array to indicate validation failure
                shouldContinue.push(false);
            } else {
                // The select field is either not required or has a value selected

                // Push true to the shouldContinue array to indicate validation success
                shouldContinue.push(true);
            }

            // Check if all validation results are the same (either all true or all false)
            if (this._areAllElementsTrue(shouldContinue)) {
                return true; // Validation succeeded
            } else {
                return false; // Validation failed
            }
        }

        /**
         * validateAllSelect
         * 
         * This function is used to validate all select (dropdown) fields within a given form.
         * @param {HTMLFormElement} uform - The form to validate.
         * @param {Object} customErrorMessage - An object containing custom error messages for the select field validation scenarios.
         * @returns {boolean} Returns true if all select fields in the form are valid (have a selected value or are not required); otherwise, returns false.
         */
        validateAllSelect(uform, customErrorMessage) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            var form = (uform) ? uform : false;

            // Check if the form exists
            if (!form) {
                console.error("The form you are trying to validate does not exist...");
                return false;
            }

            var shouldContinue = [];
            const allSelectsInForm = form.querySelectorAll('select');

            if (allSelectsInForm.length > 0) {

                // Iterate through all select fields in the form
                allSelectsInForm.forEach((select) => {

                    // Call the validateSelect function for each select field
                    if (this.validateSelect(select, customErrorMessage)) {
                        shouldContinue.push(true); // Validation succeeded for this select field
                    } else {
                        shouldContinue.push(false); // Validation failed for this select field
                    }

                });

            } else {
                shouldContinue.push(true); // No select fields found in the form
            }

            // Check if all validation results are the same (either all true or all false)
            if (this._areAllElementsTrue(shouldContinue)) {
                return true; // All select fields are valid or not required
            } else {
                return false; // At least one select field validation failed
            }
        }

        /**
         * Validates a textarea field.
         * @param {HTMLTextAreaElement} textareaField - The textarea element to be validated.
         * @param {Object} customErrorMessage - An optional object containing custom error messages for different fields.
         * @returns {boolean} Returns true if the validation passes, otherwise returns false.
         */
        validateTextarea(textareaField, customErrorMessage) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            // Check if the textarea element is valid and exists in the DOM
            if (!textareaField) {
                console.error("The textarea you are trying to validate is not found");
                return false;
            }


            // Determine if the textarea is required based on the 'required' attribute
            const isRequired = (textareaField.getAttribute('required') != null || textareaField.classList.contains('js-required')) ? true : false;

            // Initialize an array to track whether each validation check passes (true) or fails (false)
            var shouldContinue = [];

            // Check if the textarea value is empty or not
            const textareaValue = (textareaField.value.length === 0 ) ? false : true;

            // Determine the error message to display for the textarea validation
            var errorMessage = (customErrorMessage && customErrorMessage['textarea'] && customErrorMessage['textarea'] !== '') ?
                customErrorMessage['textarea'] : (this._customErrorMessages && this._customErrorMessages['textarea'] &&
                    this._customErrorMessages['textarea'] !== '') ? this._customErrorMessages['textarea'] :
                "Textarea Field Cannot be left empty";


            // Perform the required validation for the textarea
            if (isRequired && !textareaValue) {
                // If the textarea is required and has no value, show the error message
                // Display the error message inline or in a modal based on the isErrorInline flag
                if (!this._isErrorInline) {
                    this._focusInputElement(textareaField, 3000);
                    this._displayErrorModal(errorMessage, this._form);
                } else {
                    this._displayErrorInline(textareaField, errorMessage, 3000);
                }

                shouldContinue.push(false); // Add 'false' to the shouldContinue array to indicate validation failure
            } else {
                shouldContinue.push(true); // Add 'true' to the shouldContinue array to indicate validation success
            }

            // Check if all elements in the shouldContinue array are equal to true
            // If all validations are successful, return true. Otherwise, return false.
            if (this._areAllElementsTrue(shouldContinue)) {
                return true; // All validation checks passed
            } else {
                return false; // Some validation checks failed
            }

        }

        /**
         * validateAllTextarea
         * 
         * This function is used to validate all textarea fields within a given form.
         * @param {HTMLFormElement} uform - The form to validate.
         * @param {Object} customErrorMessage - An object containing custom error messages for the textarea field validation scenarios.
         * @returns {boolean} Returns true if all textarea fields in the form are valid (have a value or are not required); otherwise, returns false.
         */
        validateAllTextarea(uform, customErrorMessage) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            var form = (uform) ? uform : false;

            // Check if the form exists
            if (!form) {
                console.error("The form you are trying to validate does not exist...");
                return false;
            }

            var shouldContinue = [];
            const allTextareasInForm = form.querySelectorAll('textarea');

            if (allTextareasInForm.length > 0) {

                // Iterate through all textarea fields in the form
                allTextareasInForm.forEach((textarea) => {

                    // Call the validateTextarea function for each textarea field
                    if (this.validateTextarea(textarea, customErrorMessage)) {
                        shouldContinue.push(true); // Validation succeeded for this textarea field
                    } else {
                        shouldContinue.push(false); // Validation failed for this textarea field
                    }

                });

            } else {
                shouldContinue.push(true); // No textarea fields found in the form
            }

            // Check if all validation results are the same (either all true or all false)
            if (this._areAllElementsTrue(shouldContinue)) {
                return true; // All textarea fields are valid or not required
            } else {
                return false; // At least one textarea field validation failed
            }
        }

        /**
         * restrictInputLengthWithCounter
         * 
         * This function restricts the input length of a given input element and displays a character counter.
         * @param {HTMLInputElement} inputElement - The input element to restrict the input length for.
         * @param {HTMLElement} counterContainer - The container element to display the character counter.
         * @param {Object} options - An object containing additional configuration options for the feature.
         */
        restrictInputLengthWithCounter(uInputElement, uCounterContainer, options) {

            if (typeof window === 'undefined') {
                console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc.");
                return false;
            }

            const inputElement = ( uInputElement && this._checkVariableType(uInputElement) === 'HTML element' ) ? uInputElement : ( uInputElement && this._checkVariableType(uInputElement) === 'string' ) ? document.getElementById(uInputElement) : false;

            if ( !inputElement )
            {
                console.error("The textarea you are trying to count and restrict is not found.");
                return false;
            }

            const counterContainer = (uCounterContainer && this._checkVariableType(uCounterContainer) === 'HTML element') ? uCounterContainer : (uCounterContainer && this._checkVariableType(uCounterContainer) === 'string' && document.getElementById(uCounterContainer) ) ? document.getElementById(uCounterContainer) : false;
            
            // Call the internal function to handle the character counting and input restriction while typing
            this._countInputCharactersAndRestrictInputWhileTyping(inputElement, counterContainer, options);

        }

        /**
         * Gets the page URL.
         *
         * @returns {string} The page URL.
         * @memberof NFSFU234FormValidation
         */
        getPageUrl() {
            return this._getPageUrl();
        }

        /**
         * Checks the type of a variable and returns a string representation of the type.
         * If the type cannot be determined, returns 'unknown'.
         *
         * @param {*} variable - The variable whose type needs to be checked.
         * @returns {string} A string representing the type of the variable, or 'unknown'.
         */
        checkType(variable) {
            // Use the private _checkVariableType function to get the type of the variable
            const type = this._checkVariableType(variable);

            // Check if the type is not null and is a string
            if (type !== null && typeof type === 'string') {
                return type;
            } else {
                return 'unknown';
            }
        }


    }

    // For Node.js (CommonJS) environment, export 'NFSFU234FormValidation' as a module.
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = NFSFU234FormValidation;
    }

    // For browser (window) environment, attach 'NFSFU234FormValidation' to the global object.
    if (typeof global !== 'undefined') {
        global.NFSFU234FormValidation = NFSFU234FormValidation;
    }

    // This is the end of the IIFE, and the 'NFSFU234FormValidation' class is encapsulated within it.
})(typeof window !== "undefined" ? window : global);
