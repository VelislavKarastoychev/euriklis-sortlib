'use strict'
import * as texts from './errorTexts.js';
const IncorrectArrayParameterInFindWorstElements = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayParameterInFindWorstElements
    throw error;
}
export default IncorrectArrayParameterInFindWorstElements;