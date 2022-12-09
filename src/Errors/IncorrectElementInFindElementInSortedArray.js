'use strict';
import * as texts from './errorTexts.js';
const IncorrectElementInFindElementInSortedArray = () => {
    const error = new Error(); 
    error.name = texts.ErrorText;
    error.message = texts.IncorrectElementInFindElementInSortedArray
    throw error; 
}
export default IncorrectElementInFindElementInSortedArray;