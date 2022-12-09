'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayInFindElementsInSortedObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayInFindElementsInSortedObjectArray;
    throw error;
}
export default IncorrectArrayInFindElementsInSortedObjectArray;