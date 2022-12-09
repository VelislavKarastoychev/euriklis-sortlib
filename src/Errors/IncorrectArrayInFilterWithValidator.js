'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayInFilterWithValidator = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayInFilterWithValidator;
    throw error;
}
export default IncorrectArrayInFilterWithValidator;