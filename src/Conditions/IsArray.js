'use strict';
import validator from  '@euriklis/validator';
const IsArray = array => new validator(array).isArray.answer;
export default IsArray;