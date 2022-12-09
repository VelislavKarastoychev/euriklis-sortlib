'use strict'
import * as  texts from './errorTexts.js';
const IncorrectArrayInSetterArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayInSetterArray;
    throw new error;
}
export default IncorrectArrayInSetterArray;