'use strict';
import * as texts from './errorTexts.js';
const IncorrectArrayParameterInBucketSort = () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayParameterInBucketSort;
    throw error;
}
export default IncorrectArrayParameterInBucketSort;