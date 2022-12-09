'use strict'
import * as texts from './errorTexts.js';
const IncorrectPropertyParameterInFindBestInSortedObjectArray = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectPropertyParameterInFindBestInObjectArray;
    throw error;
}
export default IncorrectPropertyParameterInFindBestInSortedObjectArray;