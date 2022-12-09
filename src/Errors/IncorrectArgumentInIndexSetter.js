'use strict'
import * as texts from './errorTexts.js';
const IncorrectArgumentInIndexSetter = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArgumentInIndexSetter;
    throw error;
}
export default IncorrectArgumentInIndexSetter;