'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayInRemoveElementFromSortedArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayInRemoveElementFromSortedArray
    throw error;
}
export default IncorrectArrayInRemoveElementFromSortedArray;