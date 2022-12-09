'use strict'
import * as texts from './errorTexts.js';
const IncorrectArrayInAddElementInSortedArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayDeclarationInSortLibConstructor;
    throw error;
}
export default IncorrectArrayInAddElementInSortedArray;