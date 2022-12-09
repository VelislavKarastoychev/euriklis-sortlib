'use strict'
import validator from '@euriklis/validator';
const IsInteger = item => new validator(item).isInteger.answer;
export default IsInteger;