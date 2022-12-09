'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayParameterInFindBestElements = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayParameterInFindBestElements;
    throw error;
}
export default IncorrectArrayParameterInFindBestElements;