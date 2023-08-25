!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.NFSFU234FormValidation=t():e.NFSFU234FormValidation=t()}(this,(()=>(()=>{var e={861:(e,t,r)=>{function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function s(e,t){for(var r=0;r<t.length;r++){var s=t[r];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,(i=s.key,n=void 0,n=function(e,t){if("object"!==o(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var s=r.call(e,t||"default");if("object"!==o(s))return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(i,"string"),"symbol"===o(n)?n:String(n)),s)}var i,n}var i,n;i="undefined"!=typeof window?window:r.g,n=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),console.log("NFSFU234FormValidation Library Initiated"),"undefined"!=typeof window?this._form=t&&t.form&&"string"===this._checkVariableType(t.form)&&""!==t.form?document.getElementById(t.form):t&&t.form&&"HTML element"===this._checkVariableType(t.form)?t.form:document.getElementById("jsForm")?document.getElementById("jsForm"):document.querySelector("form")?document.querySelector("form"):null:this._form=null,this._errorMessageContainer=null,this._AJAXResult=null,this._formOptions=t||[],this._ajaxOptions=r||[],this._isErrorInline=!t||!1!==t.isErrorMessageInline,this._customErrorMessages=t&&t.customErrorMessages?t.customErrorMessages:[]}var t,r,i;return t=e,r=[{key:"_isEmail",value:function(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}},{key:"_containsOnlyIntegers",value:function(e){return/^\d+$/.test(e)}},{key:"_isZIP",value:function(e){return/^\d{5}(?:\d{1})?/.test(e)}},{key:"_isURL",value:function(e){return"string"==typeof e&&/^(http:\/\/|https:\/\/)/i.test(e)}},{key:"_checkVariableType",value:function(e){return"string"==typeof e?"string":"number"==typeof e?"number":"boolean"==typeof e?"boolean":void 0===e?"undefined":null===e?"null":"object"===o(e)&&e instanceof Array?"array":"object"===o(e)&&e instanceof Object?"object":"function"==typeof e?"function":e instanceof HTMLElement?"HTML element":"null"}},{key:"_countInputCharactersAndRestrictInputWhileTyping",value:function(e,t){var r=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!e)return console.error("The input element you are trying to count and restrict is not found. Check your HTML code."),!1;var s=parseInt(o.maxLength)&&o.maxLength>=1?o.maxLength:250,i=parseInt(o.minLength)?o.minLength:0,n=!!o.shouldButtonDisable,a=""!=o.formId&&document.getElementById(o.formId)?document.getElementById(o.formId):o.formId?o.formId:document.querySelector("form");e.addEventListener("input",(function(){var o,l=r._countString(e.value),u=!1;return t?o=t:((o=document.createElement("span")).classList.add("js-counterContainer"),e.parentNode.appendChild(o)),l>s?(l=s,o.classList.remove("text-fail"),o.classList.add("text-success"),e.value=e.value.slice(0,s),n&&a&&a.querySelectorAll("button").forEach((function(e){e.disabled=!1})),u=!0):l>=s?(e.value=e.value.slice(0,s),o.classList.remove("text-fail"),o.classList.add("text-success"),n&&a&&a.querySelectorAll("button").forEach((function(e){e.disabled=!1})),u=!0):l>=i&&0!==i?(o.classList.remove("text-fail"),o.classList.add("text-success"),n&&a&&a.querySelectorAll("button").forEach((function(e){e.disabled=!1})),u=!0):(o.classList.add("text-fail"),n&&a&&a.querySelectorAll("button").forEach((function(e){e.disabled=!1}))),o.innerHTML="".concat(l,"/").concat(s),u}))}},{key:"_generatePassword",value:function(){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZ",t="abcdefghijklmnopqrstuvwxyz",r="0123456789",o="!@#$%^&*()",s="",i=Math.floor(9*Math.random())+8;s+=e[Math.floor(26*Math.random())],s+=o[Math.floor(10*Math.random())],s+=r[Math.floor(10*Math.random())];for(var n=3;n<i;){var a=Math.floor(4*Math.random());s+=0===a?e[Math.floor(26*Math.random())]:1===a?t[Math.floor(26*Math.random())]:2===a?o[Math.floor(10*Math.random())]:r[Math.floor(10*Math.random())],n++}return s}},{key:"_checkPassword",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return e.length<8||e.length>20?"Make sure the length of your password ranges from 8 - 20 characters":/[A-Z]/.test(e)?/[a-z]/.test(e)?/[0-9]/.test(e)?!(t&&!(""!==r?r:/[!@#$%^&*()]/).test(e))||"Your password needs to have one symbol e.g (!@#$%^&*())":"Your password needs to have at least one number (0-9)":"Your password needs to have at least one lowercase (a-z)":"Your password needs to have at least 1 uppercase (A-Z)"}},{key:"_countString",value:function(e){return("string"==typeof e?e:e.toString()).length}},{key:"_getPageUrl",value:function(){return window.location.href}},{key:"_togglePasswordVisibility",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=t||(document.getElementById(t)?document.getElementById(t):this._form);r.querySelectorAll('input[type="password"]').forEach((function(t){r.querySelectorAll(".js-togglePassword").forEach((function(r){r.addEventListener("click",(function(){var o=t.getAttribute("type");t.setAttribute("type","password"===o?"text":"password");var s=e&&e.show&&""!==e.show?e.show:"show",i=e&&e.hide&&""!==e.hide?e.hide:"hide";r.innerHTML="password"===o?i:s}))}))}))}},{key:"_focusInputElement",value:function(e,t){e.focus(),e.classList.add("input-focus-error"),setTimeout((function(){e.classList.remove("input-focus-error")}),t)}},{key:"_displayErrorInline",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3e3,o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];this._focusInputElement(e,r);var s=document.createElement("div");s.classList.add("js-inline-message"),s.innerHTML=t,e.parentNode.appendChild(s),o&&s.classList.add("text-success"),setTimeout((function(){e.parentNode.removeChild(s)}),r)}},{key:"_displayErrorModal",value:function(e,t){var r,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3e3,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],n=arguments.length>5&&void 0!==arguments[5]&&arguments[5];""!=o?r=document.getElementById(o):document.querySelectorAll("#js-errorMessageContainer").length>0?r=t.querySelector("#js-errorMessageContainer"):((r=document.createElement("div")).classList.add("js-errorMessageContainer"),r.setAttribute("id","js-errorMessageContainer"),t.appendChild(r));var a=document.createElement("div");a.classList.add("login-error-message-container","active");var l=document.createElement("div");l.classList.add("message","js-message"),l.innerHTML=e;var u=document.createElement("div");u.classList.add("icon","close","js-close"),u.innerHTML="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M15.71,8.29a1,1,0,0,0-1.42,0L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L13.41,12l2.3-2.29A1,1,0,0,0,15.71,8.29Zm3.36-3.36A10,10,0,1,0,4.93,19.07,10,10,0,1,0,19.07,4.93ZM17.66,17.66A8,8,0,1,1,20,12,7.95,7.95,0,0,1,17.66,17.66Z'/></svg>",a.appendChild(l),a.appendChild(u),r.appendChild(a),i&&a.classList.add("success"),a.querySelector(".js-close").addEventListener("click",(function(){a&&a.parentNode&&a.parentNode.removeChild(a)})),setTimeout((function(){a&&a.parentNode&&a.parentNode.removeChild(a)}),s),n&&console.error(e)}},{key:"_getFormDetails",value:function(e){if(!e)return console.error("Check the form you are trying to validate"),!1;var t=[],r={},o=e.querySelectorAll("input"),s=e.querySelectorAll("textarea"),i=e.querySelectorAll("select");return o.length>0?o.forEach((function(e,o){var s=e.getAttribute("data-attr-name")?e.getAttribute("data-attr-name"):o,i=e.value;"checkbox"===e.getAttribute("type")&&(i=!!e.checked),"radio"===e.getAttribute("type")&&(i=!!e.checked),null==s&&NaN==s&&null==s&&"null"==s||(r[s]=i),t.push(!0)})):t.push(!0),s.length>0?s.forEach((function(e){var o=e.getAttribute("data-attr-name"),s=e.value;null==o&&NaN==o&&null==o||(r[o]=s),t.push(!0)})):t.push(!0),i.length>0?i.forEach((function(e){var o=e.getAttribute("data-attr-name"),s=e.value;null==o&&NaN==o&&null==o||(r[o]=s),t.push(!0)})):t.push(!0),!!this._areAllElementsTrue(t)&&r}},{key:"_validateForm",value:function(e,t){if(!e)return console.error("Check the form you are trying to validate"),!1;var r=[];return this.validateAllInput(e,t)?r.push(!0):r.push(!1),this.validateAllTextarea(e,t)?r.push(!0):r.push(!1),this.validateAllSelect(e,t)?r.push(!0):r.push(!1),!!this._areAllElementsTrue(r)}},{key:"_areAllElementsTrue",value:function(e){return e.every((function(e){return!0===e}))}},{key:"_countLengthOfObject",value:function(e){return Object.keys(e).length}},{key:"_submitFormAJAX",value:function(e){var t,r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",s=e.url||this._getPageUrl(),i=e.RequestMethod,n=e.RequestHeader,a=null!=e.RequestType&&""!=e.RequestType?e.RequestType:"json";return"POST"===i||"PUT"===i||"DELETE"===i?(r="undefined"!=typeof window?this._getFormDetails(o):e&&e.RequestBody?e.RequestBody:"",t={method:i,headers:n,body:JSON.stringify(r)}):t={method:i,headers:n},console.log("AJAX Loading...."),fetch(s,t).then((function(e){var t;if(!e.ok)throw t=404===e.status?"The Resource you are trying to access is either not found or returned a Page Not Found Error message.":500===e.status?"Internal server error":405===e.status?"Method Not Allowed":"Network Response was not Okay",new Error(t);return console.log("AJAX Finished...."),"json"===a?e.json():e})).catch((function(e){return console.error(e.message),e}))}},{key:"submit",value:function(){var e=this;if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;var t=this._form;t.setAttribute("novalidate",""),t.addEventListener("submit",(function(e){e.preventDefault()}));var r=this._isErrorInline;t.classList.add("relative-position");var o=t.querySelector("button[type=submit]")||t.querySelector("button[type=submit]")||t.querySelector("input[type=submit]")||t.querySelector("#jsSubmit")||t.querySelector("button")||!1;if(!o)return console.error("No Submit Button was found. Refer to NFORSHIFU234 FORM Validation documentation at http://documentation.nforshifu.com/"),!1;var s=o.value||o.innerHTML;o.addEventListener("click",(function(){var i=!1;if(o.value?o.value="Loading...":o.innerHTML="<svg fill='currentcolor' class='spin' style='margin-right: 3px;' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'><path d='M462.25 0c-6.371 0 -11.531 5.159 -11.531 11.531l0 182.219l.031 0c0 6.347 5.153 11.5 11.5 11.5l69.063 0c.343 .03 .68 .031 1.031 .031 6.372 0 11.531 -5.16 11.531 -11.531l0 -182.219l-.031 0c0 -6.347 -5.153 -11.5 -11.5 -11.5l-69.094 0c-.328 -.03 -.663 -.031 -1 -.031zm249.594 46.594c-4.082 -.111 -8.091 1.968 -10.281 5.75l-91.094 157.781l0 .062c-3.161 5.5 -1.282 12.528 4.219 15.688l60.063 34.656c.203 .136 .41 .251 .625 .375 5.5 3.187 12.533 1.313 15.719 -4.188l91.125 -157.813c3.187 -5.5 1.282 -12.533 -4.219 -15.719l-60.688 -35.063c-1.719 -.996 -3.613 -1.481 -5.469 -1.531zm-428.375 2.688c-1.856 .051 -3.75 .567 -5.469 1.563l-60.688 35.063c-5.474 3.17 -7.372 10.199 -4.219 15.688l90.781 157.219c.106 .21 .224 .418 .344 .625 3.187 5.5 10.218 7.373 15.719 4.188l60.719 -35.063c5.474 -3.17 7.341 -10.199 4.188 -15.688l-90.75 -157.188c-.107 -.217 -.221 -.444 -.344 -.656 -2.19 -3.782 -6.199 -5.861 -10.281 -5.75zm620.375 162.313c-1.848 .046 -3.722 .515 -5.438 1.5l-157.219 90.781c-.21 .106 -.418 .224 -.625 .344 -5.5 3.187 -7.373 10.218 -4.188 15.719l35.063 60.719c3.17 5.474 10.199 7.341 15.688 4.188l157.188 -90.75c.217 -.107 .444 -.221 .656 -.344 5.5 -3.185 7.374 -10.25 4.188 -15.75l-35.063 -60.688c-2.179 -3.764 -6.184 -5.82 -10.25 -5.719zm-810.375 4.656c-4.082 -.111 -8.091 1.968 -10.281 5.75l-35.063 60.688c-3.187 5.5 -1.282 12.565 4.219 15.75l157.781 91.094l.062 0c5.5 3.161 12.528 1.282 15.688 -4.219l34.656 -60.063c.136 -.203 .251 -.41 .375 -.625 3.187 -5.5 1.313 -12.533 -4.188 -15.719l-157.813 -91.125c-1.719 -.996 -3.582 -1.481 -5.438 -1.531zm712.781 234.469l0 .031c-6.347 0 -11.5 5.153 -11.5 11.5l0 69.063c-.029 .343 -.063 .68 -.063 1.031 0 6.372 5.192 11.531 11.563 11.531l182.219 0l0 -.031c6.347 0 11.5 -5.153 11.5 -11.5l0 -69.094c.03 -.328 .031 -.663 .031 -1 0 -6.371 -5.159 -11.531 -11.531 -11.531l-182.219 0zm-794.719 5.406l0 .031c-6.347 0 -11.5 5.153 -11.5 11.5l0 69.094c-.03 .328 -.031 .663 -.031 1 0 6.371 5.159 11.531 11.531 11.531l182.219 0l0 -.031c6.347 0 11.5 -5.153 11.5 -11.5l0 -69.063c.03 -.343 .031 -.68 .031 -1.031 0 -6.372 -5.16 -11.531 -11.531 -11.531l-182.219 0zm772.844 152.813c-4.075 -.097 -8.078 1.968 -10.25 5.75l-34.656 60.063c-.136 .203 -.251 .41 -.375 .625 -3.187 5.5 -1.313 12.533 4.188 15.719l157.813 91.125c5.5 3.187 12.533 1.282 15.719 -4.219l35.063 -60.688c3.187 -5.5 1.282 -12.565 -4.219 -15.75l-157.781 -91.094l-.062 0c-1.719 -.988 -3.585 -1.487 -5.438 -1.531zm-566.063 4.688c-1.848 .046 -3.722 .546 -5.438 1.531l-157.188 90.75c-.217 .107 -.444 .221 -.656 .344 -5.5 3.185 -7.374 10.25 -4.188 15.75l35.063 60.688c3.17 5.474 10.199 7.372 15.688 4.219l157.219 -90.781c.21 -.106 .418 -.224 .625 -.344 5.5 -3.187 7.373 -10.218 4.188 -15.719l-35.063 -60.719c-2.179 -3.764 -6.184 -5.82 -10.25 -5.719zm467.188 121.188c-1.856 .051 -3.719 .567 -5.438 1.563l-60.719 35.063c-5.474 3.17 -7.341 10.199 -4.188 15.688l90.75 157.188c.107 .217 .221 .444 .344 .656 3.185 5.5 10.25 7.374 15.75 4.188l60.688 -35.063c5.474 -3.17 7.372 -10.199 4.219 -15.688l-90.781 -157.219c-.106 -.21 -.224 -.418 -.344 -.625 -2.191 -3.782 -6.199 -5.861 -10.281 -5.75zm-366.313 2.719c-4.082 -.111 -8.091 1.968 -10.281 5.75l-91.125 157.813c-3.187 5.5 -1.282 12.533 4.219 15.719l60.688 35.063c5.5 3.187 12.565 1.282 15.75 -4.219l91.094 -157.781l0 -.062c3.161 -5.5 1.282 -12.528 -4.219 -15.688l-60.063 -34.656c-.203 -.136 -.41 -.251 -.625 -.375 -1.719 -.996 -3.582 -1.512 -5.438 -1.563zm148.469 57.156c-6.372 0 -11.531 5.192 -11.531 11.563l0 182.219l.031 0c0 6.347 5.153 11.5 11.5 11.5l69.094 0c.328 .03 .663 .031 1 .031 6.371 0 11.531 -5.159 11.531 -11.531l0 -182.219l-.031 0c0 -6.347 -5.153 -11.5 -11.5 -11.5l-69.063 0c-.343 -.029 -.68 -.063 -1.031 -.063z'/></svg> loading ",!e._validateForm(t,e._customErrorMessages,r))return i=!1,o.value?o.value=s:o.innerHTML=s,i;if(console.log("Validation Success"),0===e._countLengthOfObject(e._ajaxOptions))i=!0,t.submit();else if(null!=e._ajaxOptions.RequestMethod&&0===e._ajaxOptions.RequestMethod.length)console.error("To perform an AJAX Request, you need to give a Request Method."),i=!1,o.value?o.value=s:o.innerHTML=s;else{var n=e._ajaxOptions.RequestMethod;"POST"===n||"GET"===n||"PUT"===n||"DELETE"===n?(e._AJAXResult=null,e._AJAXResult=e._submitFormAJAX(e._ajaxOptions,t),i=!0):(console.error("To perform an AJAX Request, you need to give a valid Request Method. Example (POST, GET, PUT, DELETE)"),i=!1),o.value?o.value=s:o.innerHTML=s}}))}},{key:"isEmail",value:function(e){return!!this._isEmail(e)}},{key:"isURL",value:function(e){return this._isURL(e)}},{key:"isZipcode",value:function(e){return this._isZIP(e)}},{key:"containsOnlyIntegers",value:function(e){return!!this._containsOnlyIntegers(e)}},{key:"countString",value:function(e){return this._countString(e)}},{key:"generateRandomPassword",value:function(){var e=this._generatePassword();return"string"==typeof e&&e}},{key:"checkPassword",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return this._checkPassword(e,t,r)}},{key:"togglePasswordVisibility",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return"undefined"==typeof window?(console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1):(this._togglePasswordVisibility(e,t),!0)}},{key:"getAJAXResponse",value:function(){return!!this._AJAXResult&&this._AJAXResult}},{key:"ajax",value:function(e){return this._AJAXResult=null,this._AJAXResult=this._submitFormAJAX(e),this.getAJAXResponse()}},{key:"validateInput",value:function(e,t){if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;if(!e)return console.error("The input field you are trying to validate does not exist..."),!1;var r=e.getAttribute("type"),o=e.value,s=!(null==e.getAttribute("required")&&!e.classList.contains("js-required")),i=null;return"text"===r&&s&&0===o.length?i=t&&t.text&&""!==t.text?t.text:this._customErrorMessages&&this._customErrorMessages.text&&""!==this._customErrorMessages.text?this._customErrorMessages.text:"Input Field Cannot be left empty":"checkbox"===r&&s&&!e.checked?i=t&&t.checkbox&&""!==t.checkbox?t.checkbox:this._customErrorMessages&&this._customErrorMessages.checkbox&&""!==this._customErrorMessages.checkbox?this._customErrorMessages.checkbox:"You cannot leave this box unchecked":"color"===r&&s&&0===o.length?i=t&&t.color&&""!==t.color?t.color:this._customErrorMessages&&this._customErrorMessages.color&&""!==this._customErrorMessages.color?this._customErrorMessages.color:"You cannot leave this box unchecked":"datetime"===r&&s&&0===o.length?i=t&&t.datetime&&""!==t.datetime?t.datetime:this._customErrorMessages&&this._customErrorMessages.datetime&&""!==this._customErrorMessages.datetime?this._customErrorMessages.datetime:"you have to choose a date and time":"datetime-local"===r&&s&&0===o.length?i=t&&t["datetime-local"]&&""!==t["datetime-local"]?t["datetime-local"]:this._customErrorMessages&&this._customErrorMessages["datetime-local"]&&""!==this._customErrorMessages["datetime-local"]?this._customErrorMessages["datetime-local"]:"you have to choose a date and time locally":"email"===r&&s&&0===o.length?i=t&&t.email&&t.email.empty&&""!==t.email.empty?t.email.empty:this._customErrorMessages&&this._customErrorMessages.email&&this._customErrorMessages.email.empty&&""!==this._customErrorMessages.email.empty?this._customErrorMessages.email.empty:"email feild is required":"file"===r&&s&&0===o.length?i=t&&t.file&&""!==t.file?t.file:this._customErrorMessages&&this._customErrorMessages.file&&""!==this._customErrorMessages.file?this._customErrorMessages.file:"you have to select a file":"hidden"===r&&s&&0===o.length?i=t&&t.hidden&&""!==t.hidden?t.hidden:this._customErrorMessages&&this._customErrorMessages.hidden&&""!==this._customErrorMessages.hidden?this._customErrorMessages.hidden:"input value is needed":"image"===r&&s&&0===o.length?i=t&&t.image&&""!==t.image?t.image:this._customErrorMessages&&this._customErrorMessages.image&&""!==this._customErrorMessages.image?this._customErrorMessages.image:"you need to select an image":"month"===r&&s&&0===o.length?i=t&&t.month&&""!==t.month?t.month:this._customErrorMessages&&this._customErrorMessages.month&&""!==this._customErrorMessages.month?this._customErrorMessages.month:"you need to select an image":"number"===r&&s&&0===o.length?i=t&&t.number&&""!==t.number?t.number:this._customErrorMessages&&this._customErrorMessages.number&&""!==this._customErrorMessages.number?this._customErrorMessages.number:"you need to type a number ":"password"===r&&s&&0===o.length?i=t&&t.password&&""!==t.password?t.password:this._customErrorMessages&&this._customErrorMessages.password&&""!==this._customErrorMessages.password?this._customErrorMessages.password:"password feild cannot be empty":"radio"!==r||this.validateRadio(e)?"range"===r&&s&&0===o.length?i=t&&t.range&&""!==t.range?t.range:this._customErrorMessages&&this._customErrorMessages.range&&""!==this._customErrorMessages.range?this._customErrorMessages.range:"range has to be chosen":"tel"===r&&s&&0===o.length?i=t&&t.tel&&""!==t.tel?t.tel:this._customErrorMessages&&this._customErrorMessages.tel&&""!==this._customErrorMessages.tel?this._customErrorMessages.tel:"enter phone":"time"===r&&s&&0===o.length?i=t&&t.time&&""!==t.time?t.time:this._customErrorMessages&&this._customErrorMessages.time&&""!==this._customErrorMessages.time?this._customErrorMessages.time:"choose time":"url"===r&&s&&0===o.length?i=t&&t.url&&t.url.empty&&""!==t.url.empty?t.url.empty:this._customErrorMessages&&this._customErrorMessages.url&&this._customErrorMessages.url.empty&&""!==this._customErrorMessages.url.empty?this._customErrorMessages.url.empty:"choose time":"week"===r&&s&&0===o.length?i=t&&t.week&&""!==t.week?t.week:this._customErrorMessages&&this._customErrorMessages.week&&""!==this._customErrorMessages.week?this._customErrorMessages.week:"you need to select a day of the week":"zipcode"===r&&s&&0===o.length?i=t&&t.zipcode&&t.zipcode.empty&&""!==t.zipcode.empty?t.zipcode.empty:this._customErrorMessages&&this._customErrorMessages.zipcode&&this._customErrorMessages.zipcode.empty&&""!==this._customErrorMessages.zipcode.empty?this._customErrorMessages.zipcode.empty:"zip code is required":"email"!==r||""==o||this._isEmail(o)?"url"!==r||""==o||this._isURL(o)?"zipcode"!==r||""==o||this._isZIP(o)?void 0===r&&(i="There is an input feild with an attribute named, 'type'. kindly visit the documentation to know the types to use.",console.error(i)):i=t&&t.zipcode&&t.zipcode.format&&""!==t.zipcode.format?t.zipcode.format:this._customErrorMessages&&this._customErrorMessages.zipcode&&this._customErrorMessages.zipcode.format&&""!==this._customErrorMessages.zipcode.format?this._customErrorMessages.zipcode.format:"the zipcode is not in a correct format":i=t&&t.url&&t.url.format&&""!==t.url.format?t.url.format:this._customErrorMessages&&this._customErrorMessages.url&&this._customErrorMessages.url.format&&""!==this._customErrorMessages.url.format?this._customErrorMessages.url.format:"please enter a valid url (e.x https://www.domain.com/)":i=t&&t.email&&t.email.format&&""!==t.email.format?t.email.format:this._customErrorMessages&&this._customErrorMessages.email&&this._customErrorMessages.email.format&&""!==this._customErrorMessages.email.format?this._customErrorMessages.email.format:"please enter a valid email address (username@domain.com)":i=t&&t.radio?t.radio:"Cannot submit. A required radio is not checked.",null===i||(this._isErrorInline?this._displayErrorInline(e,i,3e3):(this._focusInputElement(e,3e3),this._displayErrorModal(i,this._form)),!1)}},{key:"validateAllInput",value:function(e,t){var r=this;if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;var o=e||!1;if(!o)return console.error("The form you are trying to validate does not exist..."),!1;var s=[],i=o.querySelectorAll("input");return i.length>0?i.forEach((function(e){r.validateInput(e,t)?s.push(!0):s.push(!1)})):s.push(!0),!!(s.length>0&&this._areAllElementsTrue(s))}},{key:"validateCheckbox",value:function(e,t){if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;if("checkbox"!==e.getAttribute("type"))return!1;var r=[];if(null==e.getAttribute("required")&&!e.classList.contains("js-required")||e.checked)r.push(!0);else{var o=t&&t.checkbox&&""!==t.checkbox?t.checkbox:"you need to check this box";this._isErrorInline?this._displayErrorInline(e,o,3e3):(this._focusInputElement(e,3e3),this._displayErrorModal(o,this._form)),r.push(!1)}return!!(r.length>0&&this._areAllElementsTrue(r))}},{key:"validateAllCheckbox",value:function(e,t){var r=this;if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;var o=e||!1;if(!o)return console.error("The form you are trying to validate does not exist..."),!1;var s=[],i=o.querySelectorAll("input[type=checkbox]");return i.length>0?i.forEach((function(e){r.validateInput(e,t)?s.push(!0):s.push(!1)})):s.push(!0),!!(s.length>0&&this._areAllElementsTrue(s))}},{key:"validateRadio",value:function(e){if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;var t;if("object"===o(e)&&e instanceof HTMLInputElement)t=e.getAttribute("name");else{if("string"!=typeof e)return!1;t=e}var r=document.querySelectorAll("input[type=radio][name=".concat(t,"]")),s=!1,i=!1;return r.forEach((function(e){(e.required||e.classList.contains("js-required"))&&(s=!0,e.checked&&(i=!0))})),!(s&&!i)}},{key:"validateAllRadio",value:function(e,t){var r=this;if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;var o=e.querySelectorAll("input[type=radio]"),s=!0;return o.forEach((function(e){r.validateRadio(e,t)||(s=!1)})),s}},{key:"validateSelect",value:function(e,t){if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;if(!e)return console.error("The select field was not found."),s.push(!1),!1;var r=!(null==e.getAttribute("required")&&!e.classList.contains("js-required")),o=0!==e.value.length&&" "!==e.value&&""!==e.value,s=[];if(r&&!o){var i=t&&t.select&&""!==t.select?t.select:"You have to select an option";this._isErrorInline?this._displayErrorInline(e,i,3e3):(this._focusInputElement(e,3e3),this._displayErrorModal(i,this._form)),s.push(!1)}else s.push(!0);return!!this._areAllElementsTrue(s)}},{key:"validateAllSelect",value:function(e,t){var r=this;if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;var o=e||!1;if(!o)return console.error("The form you are trying to validate does not exist..."),!1;var s=[],i=o.querySelectorAll("select");return i.length>0?i.forEach((function(e){r.validateSelect(e,t)?s.push(!0):s.push(!1)})):s.push(!0),!!this._areAllElementsTrue(s)}},{key:"validateTextarea",value:function(e,t){if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;if(!e)return console.error("The textarea you are trying to validate is not found"),!1;var r=!(null==e.getAttribute("required")&&!e.classList.contains("js-required")),o=[],s=0!==e.value.length,i=t&&t.textarea&&""!==t.textarea?t.textarea:this._customErrorMessages&&this._customErrorMessages.textarea&&""!==this._customErrorMessages.textarea?this._customErrorMessages.textarea:"Textarea Field Cannot be left empty";return r&&!s?(this._isErrorInline?this._displayErrorInline(e,i,3e3):(this._focusInputElement(e,3e3),this._displayErrorModal(i,this._form)),o.push(!1)):o.push(!0),!!this._areAllElementsTrue(o)}},{key:"validateAllTextarea",value:function(e,t){var r=this;if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;var o=e||!1;if(!o)return console.error("The form you are trying to validate does not exist..."),!1;var s=[],i=o.querySelectorAll("textarea");return i.length>0?i.forEach((function(e){r.validateTextarea(e,t)?s.push(!0):s.push(!1)})):s.push(!0),!!this._areAllElementsTrue(s)}},{key:"restrictInputLengthWithCounter",value:function(e,t,r){if("undefined"==typeof window)return console.error("To access this function, you will need to execute it in a browser like, Google Chrome, Safari, FireFox, Microsoft Edge, etc."),!1;var o=e&&"HTML element"===this._checkVariableType(e)?e:!(!e||"string"!==this._checkVariableType(e))&&document.getElementById(e);if(!o)return console.error("The textarea you are trying to count and restrict is not found."),!1;var s=t&&"HTML element"===this._checkVariableType(t)?t:!(!t||"string"!==this._checkVariableType(t)||!document.getElementById(t))&&document.getElementById(t);this._countInputCharactersAndRestrictInputWhileTyping(o,s,r)}},{key:"getPageUrl",value:function(){return this._getPageUrl()}},{key:"checkType",value:function(e){var t=this._checkVariableType(e);return null!==t&&"string"==typeof t?t:"unknown"}}],r&&s(t.prototype,r),i&&s(t,i),Object.defineProperty(t,"prototype",{writable:!1}),e}(),void 0!==e.exports&&(e.exports=n),void 0!==i&&(i.NFSFU234FormValidation=n)}},t={};function r(o){var s=t[o];if(void 0!==s)return s.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,r),i.exports}return r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r(861)})()));
//# sourceMappingURL=nfsfu234FormValidation.js.map