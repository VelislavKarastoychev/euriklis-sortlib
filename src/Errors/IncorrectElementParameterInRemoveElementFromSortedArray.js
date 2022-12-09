'use strict';
import * as texts from './errorTexts.js';
const IncorrectElementParameterInRemoveElementFromSortedArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectElementParameterInRemoveElementFromSortedArray;
    throw error;
}
export default IncorrectElementParameterInRemoveElementFromSortedArray;