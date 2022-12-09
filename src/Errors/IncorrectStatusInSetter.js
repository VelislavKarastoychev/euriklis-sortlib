'use strict';
import * as texts from './errorTexts.js';
const IncorrectStatusInSetter = () => {
    const error = new Error(); 
    error.name = texts.ErrorText;
    error.message = texts.IncorrectStatusInSetter
    throw error; 
}
export default IncorrectStatusInSetter;