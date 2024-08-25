# Changelog

All notable changes to the NFSFU234FormValidation Library will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and adheres to Semantic Versioning.

## [3.0.0-beta] - 2024-08-25

### Important Notes

- 🚨 **Repository Transfer:** This repository has been moved from nforshifu234dev's personal account to the NFSFU234FormValidation organization. Access it under the NFSFU234FormValidation organization by clicking [here](https://github.com/NFSFU234FormValidation/).

### Added

- **Framework Compatibility:** Added support for React JS and Vite, allowing seamless integration with these frameworks.
- **TypeScript Upgrade:** The library has been upgraded from Vanilla JavaScript to TypeScript for enhanced code efficiency and debugging.
- **Error Handling Enhancements:** Introduced the `ErrorMessage` and `ErrorHandler` interfaces for clearer error insights, allowing errors to be handled as HTML elements, text, or null.
- **Revamped Methods:** Redesigned `submit` and `validate` methods to return a Promise resolving to an `ErrorMessageInterface`, providing detailed feedback on validation results.

### Updated

- **Class and ID Renaming:** Updated the `js-required` class to `nfsfu234-fv-required` and the `jsSubmit` ID to `nfsfu234-fv-form` to maintain a consistent naming convention.
- **Website Improvements:** Ongoing work to enhance the website for a more user-friendly experience, with final changes expected by the stable release.

### Removed

- None

## [2.4.4] - 2024-03-01

## IMPORTANT INFORMATION

🚨 **Repository Transfer:** This repository has been moved from nforshifu234dev's personal account to the NFSFU234FormValidation organization. You can now access it under the NFSFU234FormValidation organization by clicking [here](https://github.com/NFSFU234FormValidation/).

### Added
- Added a new [`CODE_OF_CONDUCT`](CODE_OF_CONDUCT.md) file to promote a welcoming and inclusive community.

### Updated
- Modified the [`CONTRIBUTING.md`](CONTRIBUTING.md) file to provide updated guidelines for contributors.
- Updated the [`LICENSE`](LICENSE) file to reflect the project's license.
- Modified the [`Package Information`](package.json) file to ensure accurate information.

### Removed
- The `web` folder has been removed and transferred to its own repository. You can now find it in its dedicated repository [here](https://github.com/NFSFU234FormValidation/website/).


## [2.4.3] - 2024-01-25


## Important Note

- When utilizing the `JsDelivr CDN URL` to access the `NFSFU234FormValidation Library` with the `@latest` tag, be aware that, in some instances, it might not include the latest updates. To ensure the inclusion of the most recent code, consider using the specific version number (e.g., 2.4.3).

- This observation was made during the release of version `2.4.2`.


### Added
- Added `redirect()` function, used for redirecting a user to a specific url or path

### Updated
- Website UI has been updated.
- `copy-webpack-plugin` was updated to `v12.0.2` from `v11.0.0`
- `css-minimizer-webpack-plugin` was updated to `v6.0.0` from `5.0.1`

### Changed 
- Modified the `_getFormDetails()` function
    - Fixed the bug, `formValidator.getFormDetails is not a function`. This was due to a bundling error during the rlease of `v2.3.2`
    - Had to add `index` variable when selcting textareas, and select tags. It was returning errors in previous versions.

- Modified the `_loading()` function
    - Here I added the ability for the `loading()` function to select inut feilds with the type `search`

- Modified the `submit()` function
    - Modfied this function in the `else` part when checking if a `button` exists. The console error was a mess.

- Modified the `validateInput()` function
    - Modifed this function to be able to check for `date` type in any input feild.
    - Modified this function to display the prorper error message if an input is of type `url` and is `required`

### Removed 
- None

## [2.3.2] - 2023-11-27

### Added

- none

### Changed

- Modified the ReadMe.md file
- Modified the function call attribute for `verifyPassword()` function.
- Modified the `_togglePasswordVisibility()` function to ensure more flexiblity to icon display during toggling more than one password input feild
- Updated the `_getFormDetails()`. In the previous version, only inputs feilds were affected with the updates but now all for elements `inputs`, `textareas`, `select`.

### Removed
- none

## [2.3.1] - 2023-11-25

### Information 🥳🥂

- You can now follow `NFSFU234 Form Validation Library` on [X (Formerly Twitter)](https://x.com/nf_validator234/) and [Instagram](https://www.instagram.com/nf_validator234/). The username is  `nf_validator234`. 

- Also you can send an email to `nf.validator234@gmail.com`

### Added

- [verifyPassword()](ReadMe.md#verifypasswordpassword1-string-password2-string-ishashed--false-promiseboolean). Asynchronously compares two passwords, supporting both hashed and plaintext formats. More information in the ReadMe file.

- [getFormDetails()](ReadMe.md#getformdetailsform-htmlformelement). It gets the values of all form elements in a form. Be it inputs, textareas, selects or even checkboks & radio elements. Find More information in the ReadMe file num

### Changed

- Updated the `babel`, `jest` and `webpack` packages to versions `7.23.3`, `29.7.0`, and `5.89.0` respectively

- New instructions to install NFSFU234 Form Validation Library via `npm`, `yarn` in the [Installation Section]()

- Updated the documentation for the illustration for how to use the `generateRandomPassword()` function . Removed the parameters from the illustration because this function does not allow parameters yet.

- Updated the `isURL()` function to properly check and validate URLS.

- Updated the private function , `_getFormDetails()` function. The function could only get form data based on only if the form element has the `data-attr-name` attribute. Then i thought to myself since a lot of forms use the name attribute why not add that attribute to the list. Find out more information in the `getFormDetails()` function that has been made visible


### Removed
- Removed the Independence Day Banner.

## [2.3.0-patch] - 2023-10-01

### Fixed
- Fixed the error of the new features `isOnline()` and `reset()` is not working in the initial `v2.3.0`.
## [2.3.0] - 2023-10-01

### Added
- Added `isOnline()` function to check if a browser is connected to the internet or not
- Added `reset()` function to reset all the inputs to an empty value

### Changed
- Added comments to describe the `loading()` function released in the previous version(`v2.2.0`) in the `nfsfu234-form-validation.js` file located in the `src` folder

- Reviewd and edited the `displayError() function` list details in the `web/json/function-list.json` file,



## [2.2.0] - 2023-09-25

### Added

- Added `loading()` function, this function is used to add your loading message incase you wished to have a custom loading animation or text if you choose not to use the defualt submit function. This function takes 2 parameters. See more information in the [ReadMe](ReadMe)

- Added a new HTML class, `js-spin` to be added to the previous `spin` class for adding spining effect to an element.

## [2.1.0] - 2023-09-09
### Added
- Added the `displayError()` function which accepts 1 parameter of data type object. See more details and how to use  it in the [ReadMe](ReadMe)
## [2.0.0] - 2023-08-26

### Breaking Change
- Renamed the minified CSS output file from `nfsfu234-formValidation.min.css` to `nfsfu234FormValidation.min.css`, impacting how users refrence the minified CSS 

### Other Changes
- Updated the banner from the versioning banner to a more static and elegant banner.

## [1.2.4] - 2023-08-26

### Changed
- Improved the `ajax()` function for a  more clean experience.

### Fixed
- Fixed the issue of `custom ajax request body not sending in browser rather getting the form details.`


## [1.2.3] - 2023-08-25

### Fixed

-   Fixed the `bcrypt is not defined` issue from both browser and node environments.

## [1.2.2] - 2023-08-25

### Fixed

- Fixed the Netlify website issue and added the neccessary file for the website.
## [1.2.1] - 2023-08-25

### Added

- Website to view all available functions and how to call them. The website is url is [https://nforshifu234dev-nfsfu234-form-validation.netlify.app](https://nforshifu234dev-nfsfu234-form-validation.netlify.app/)
- `hashPassword(password or any string)` function to hash your password or information from a form before sending it from your form.
- `Clearer Information for contribution` in the [`CONTRIBUTING.md`](CONTRIBUTING.md)  file

## [1.1.1] - 2023-08-23

### Added

- `validate()` function for optional validations and more flexibility before submitting a form.

## [1.0.1] - 2023-08-20

### Changed

- Improved the `ajax()` function for a more smoother experience.

### Fixed

- Fixed `ajax()` function to be able to correctly collect the URL from the ajaxOptions parameter or uses the current page URL.
## [1.0.0] - 2023-08-15
🚀 Hello, World! My First Library - NFSFU234 Form Validation Library 📚

I'm thrilled to introduce the first release of the NFSFU234 Form Validation Library! This marks a significant milestone as it's my very first library ever created. I'm excited to share with you a suite of functions designed to validate and interact with various form elements. Whether you're a developer building web applications or working with Node.js, these functions provide a solid foundation for accurate and reliable validation solutions.

### Added
- `submit()` function for form validation and submission.
- `ajax(AJAXOptions)` function for making AJAX requests.
- `getAJAXResponse()` function for retrieving responses from AJAX requests.
- `generateRandomPassword()` function for generating random passwords.
- `checkPassword(password, shouldIncludeSymbol)` function for password strength validation.
- `isEmail(email)` function for email format validation.
- `isURL(url)` function for URL format validation.
- `isZipcode(zipcode)` function for ZIP code validation.
- `containsOnlyIntegers(inputValue)` function for integer content validation.
- `countString(inputValue)` function for character counting.
- `togglePasswordVisibility(form, icons)` function for enabling password visibility toggle.
- `validateInput(input)` function for input field validation.
- `validateAllInput()` function for validating all input fields.
- `validateSelect(select)` function for select field validation.
- `validateAllSelect()` function for validating all select fields.
- `validateTextarea(textarea)` function for textarea field validation.
- `validateAllTextarea()` function for validating all textarea fields.
- `validateCheckbox(checkbox)` function for checkbox field validation.
- `validateAllCheckbox()` function for validating all checkbox fields.
- `validateRadio(radioName)` function for radio button group validation.
- `validateAllRadio()` function for validating all radio button groups.
- `restrictInputLengthWithCounter(inputElement, counterContainer, options)` function for input length restriction with a character counter.
- `checkType(variable)` function for determining the type of a variable.
- `getPageUrl()` function for retrieving the current page URL.

### Changed
- Improved validation logic for better accuracy.
- Enhanced error message handling for better user feedback.

### Fixed
- Resolved issue with incorrect error messages being displayed.

### Removed
- None

As my very first library creation, the NFSFU234 Form Validation Library holds a special place in my journey. 🌱 I'm eager to present these functions that have been crafted with care to streamline form validation processes. 🛠️ Your feedback and support are invaluable as I embark on this exciting journey of library development. 🚀 Thank you for being part of it! 🙏

