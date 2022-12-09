'use strict';
import * as texts from './errorTexts.js';
const IncorrectCountParameterInFindWorstInObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectCountParameterInFindWorstInObjectArray
    throw error;
}
export default IncorrectCountParameterInFindWorstInObjectArray;