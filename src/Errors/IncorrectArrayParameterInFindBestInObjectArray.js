'use strict'
import * as texts from './errorTexts.js';
const IncorrectArrayParameterInFindBestInObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayParameterInFindBestInObjectArray;
    throw error;
}
export default IncorrectArrayParameterInFindBestInObjectArray;