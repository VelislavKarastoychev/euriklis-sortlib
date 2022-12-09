'use strict';
import validator from '@euriklis/validator';
const IsString = item => new validator(item).isString.answer;
export default IsString;