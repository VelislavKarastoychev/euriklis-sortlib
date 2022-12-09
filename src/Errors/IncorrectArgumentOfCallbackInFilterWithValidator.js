'use strict';
import * as texts from './errorTexts.js';
const IncorrectArgumentOfCallbackInFilterWithValidator = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArgumentOfCallbackInFilterWithValidator;
    throw error;
}
export default IncorrectArgumentOfCallbackInFilterWithValidator;