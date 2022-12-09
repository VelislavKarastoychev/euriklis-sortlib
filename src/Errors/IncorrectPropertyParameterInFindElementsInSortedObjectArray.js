'use strict';
import * as texts from './errorTexts.js';
const IncorrectPropertyParameterInFindElementsInSortedObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectPropertyParameterInFindElementsInSortedObjectArray;
    throw error;
}
export default IncorrectPropertyParameterInFindElementsInSortedObjectArray;