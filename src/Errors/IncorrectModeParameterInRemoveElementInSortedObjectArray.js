'use strict';
import * as texts from './errorTexts.js';
const IncorrectModeParameterInRemoveElementInSortedObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectModeParameterInRemoveElementFromSortedObjectArray
    throw error;
}
export default IncorrectModeParameterInRemoveElementInSortedObjectArray;