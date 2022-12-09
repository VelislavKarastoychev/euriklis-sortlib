'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayParameterInFilter = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayParameterInFilter;
    throw error;
}
export default IncorrectArrayParameterInFilter;