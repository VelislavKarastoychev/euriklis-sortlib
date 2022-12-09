'use strict'
import * as texts from './errorTexts.js';
const IncorrectPropertyInSortObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectPropertyInSortObjectArray;
    throw error;
}
export default IncorrectPropertyInSortObjectArray;