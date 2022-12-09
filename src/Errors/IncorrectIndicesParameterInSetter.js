'use strict';
import * as texts from './errorTexts.js';
const IncorrectIndicesParameterInSetter = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectIndicesParameterInSetter;
    throw error;
}
export default IncorrectIndicesParameterInSetter;