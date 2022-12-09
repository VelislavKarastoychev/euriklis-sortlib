'use strict';
import * as texts from './errorTexts.js';
const IncorrectPropertyParameterInAddElementInSortedObjectArray = () => {
   const error = new Error();
   error.name = texts.ErrorText;
   error.message = texts.IncorrectPropertyParameterInAddElementInSortedObjectArrayByProperty
   throw error;
}
export default IncorrectPropertyParameterInAddElementInSortedObjectArray;