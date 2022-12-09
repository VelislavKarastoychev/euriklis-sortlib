'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayInRemoveElementFromSortedObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayInRemoveElementFromSortedObjectArray
    throw error;
}
export default IncorrectArrayInRemoveElementFromSortedObjectArray;