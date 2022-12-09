'use strict';
import validator from '@euriklis/validator';
const IsCorrectArray = array => new validator(array)
    .isStringArray.Or.isNumberArray.Or.isEmpty
    .answer;
export default IsCorrectArray;