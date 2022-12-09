'use strict';
import * as  texts from './errorTexts.js';
const IncorrectArrayParameterInSortObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayParameterInSortObjectArray
    throw error;
}
export default IncorrectArrayParameterInSortObjectArray;