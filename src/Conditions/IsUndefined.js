'use strict';
import validator from '@euriklis/validator';
const IsUndefined = item => new validator(item).isUndefined.answer;
export default IsUndefined;