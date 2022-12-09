'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty = () => {
   const error = new Error();
   error.name = texts.ErrorText;
   error.message = texts.IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty
   throw error;
}
export default IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty;