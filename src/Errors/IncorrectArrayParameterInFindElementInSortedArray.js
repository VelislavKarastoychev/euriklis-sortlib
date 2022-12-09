'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayParameterInFindElementInSortedArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayInFindElementInSortedArray
    throw error;
}
export default IncorrectArrayParameterInFindElementInSortedArray;