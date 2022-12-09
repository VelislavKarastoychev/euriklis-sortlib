'use strict';
import validator from '@euriklis/validator';
const IsEmpty = item => new validator(item).isEmpty.answer;
export default IsEmpty;