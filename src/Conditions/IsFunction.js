'use strict';
import validator from '@euriklis/validator';
const IsFunction = item => new validator(item).isFunction.answer;
export default IsFunction;