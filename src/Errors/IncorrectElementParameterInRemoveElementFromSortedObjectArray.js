'use strict';
import * as texts from './errorTexts.js';
const IncorrectElementParameterInRemoveElementFromSortedObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectElementParameterInRemoveElementFromSortedObjectArray;
    throw error;
}
export default IncorrectElementParameterInRemoveElementFromSortedObjectArray;