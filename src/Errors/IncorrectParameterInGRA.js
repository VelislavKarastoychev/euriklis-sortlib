'use strict';
import * as texts from './errorTexts.js';
const IncorrectParameterInGRA = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectParameterInGRA;
    throw error;
}
export default IncorrectParameterInGRA;