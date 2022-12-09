'use strict';
import validator from '@euriklis/validator';
const IsNumberArray = item => new validator(item).isNumberArray.answer;
export default IsNumberArray;