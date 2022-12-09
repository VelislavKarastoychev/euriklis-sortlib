'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayParameterInFindWorstInObjectArray = () => {
    const error = new Error(); 
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayParameterInFindBestInObjectArray;
    throw error;
}
export default IncorrectArrayParameterInFindWorstInObjectArray;