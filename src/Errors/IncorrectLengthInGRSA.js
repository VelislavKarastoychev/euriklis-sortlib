'use strict';
import * as texts from './errorTexts.js';
const IncorrectLengthInGRSA = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectLengthInGRSA;
    throw error;
}
export default IncorrectLengthInGRSA;