'use strict';
import * as texts from './errorTexts.js';
const IncorrectElementInAddElementInSortedObjectArrayByProperty = () => {
   const error = new Error();
   error.name = texts.ErrorText;
   error.message = texts.IncorrectElementInAddElementInSortedObjectArrayByProperty
   throw error;
}
export default IncorrectElementInAddElementInSortedObjectArrayByProperty;