'use strict';
import * as texts from './errorTexts.js';
const IncorrectCallbackParameterInFilter = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectCallbackParameterInFilter;
    throw error;
}
export default IncorrectCallbackParameterInFilter;