'use strict';
import * as texts from './errorTexts.js';
const IncorrectElementParameterInFindElementsInSortedObjectArray =() => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectElementParameterInFindElementsInSortedObjectArray;
    throw error;
}
export default IncorrectElementParameterInFindElementsInSortedObjectArray;