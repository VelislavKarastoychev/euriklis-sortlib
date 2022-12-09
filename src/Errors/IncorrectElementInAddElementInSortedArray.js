'use strict';
import * as texts from './errorTexts.js';
const IncorrectElementInAddElementInSortedArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectElementInAddElementInSortedArray;
    throw error;
}
export default IncorrectElementInAddElementInSortedArray;