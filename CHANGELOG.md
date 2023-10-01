# Changelog


## [2.3.0-patch] - 2023-10-01

### Fixed
- Fixed the error of the new features `isOnline()` and `reset()` is not working in the initial `v2.3.0`.
## [2.3.0] - 2023-10-01

# 🚀 **Happy Independence Day!** 🇳🇬
![Independence Day Banner](images/Nigeria-Independence-Day-NFSFU234FormValidationBanner.png)

Celebrate this special day with my latest release!

### Added
- Added `isOnline()` function to check if a browser is connected to the internet or not
- Added `reset()` function to reset all the inputs to an empty value

### Changed
- Added comments to describe the `loading()` function released in the previous version(`v2.2.0`) in the `nfsfu234-form-validation.js` file located in the `src` folder

- Reviewd and edited the `displayError() function`list details in the `web/json/function-list.json` file,


Stay tuned for more updates and enjoy your Independence Day!

## [2.2.0] - 2023-09-25

### Added

- Added `loading()` function, this function is used to add your loading message incase you wished to have a custom loading animation or text if you choose not to use the defualt submit function. This function takes 2 parameters. See more information in the [ReadMe](ReadMe)

- Added a new HTML class, `js-spin` to be add to the previous `spin` class for adding sping effect to an element.

## [2.1.0] - 2023-09-09
### Added
- Added the `displayError()` function which accepts 1 parameter of data type object. See more details and how to use  it in the [ReadMe](ReadMe)
## [2.0.0] - 2023-08-26

### Breaking Change
- Renamed the minified CSS output file from `nfsfu234-formValidation.min.css` to `nfsfu234FormValidation.min.css`, impacting how users refrence the minified CSS 

### Other Changes
- Updated the banner from the versioning banner to a more staticand elegant banner.

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

