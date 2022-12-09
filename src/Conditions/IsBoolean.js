'use strict';
import validator from '@euriklis/validator';
const IsBoolean = item => new validator(item).isBoolean.answer;
export default IsBoolean;