'use strict';
import validator from '@euriklis/validator';
const IsStringArray = item => new validator(item).isStringArray.answer;
export default IsStringArray;