'use strict';
import * as texts from './errorTexts.js';
const IncorrectWordSizeInGRSA = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectWordSizeInGRSA;
    throw error;
}
export default IncorrectWordSizeInGRSA;