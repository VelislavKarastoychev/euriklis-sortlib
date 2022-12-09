'use strict';
import * as texts from './errorTexts.js';
const IncorrectPropertyParameterInRemoveElementFromSortedObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectPropertyParameterInRemoveElementFromSortedObjectArray;
    throw error;
}
export default IncorrectPropertyParameterInRemoveElementFromSortedObjectArray;