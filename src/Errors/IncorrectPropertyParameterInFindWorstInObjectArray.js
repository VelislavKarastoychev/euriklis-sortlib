'use strict';
import * as  texts from './errorTexts.js';
const IncorrectPropertyParameterInFindWorstInSortedObjectArray = () => {
    const error = new Error(); 
    error.name = texts.ErrorText;
    error.message = texts.IncorrectPropertyParameterInFindWorstInObjectArray
    throw error;
}
export default IncorrectPropertyParameterInFindWorstInSortedObjectArray;