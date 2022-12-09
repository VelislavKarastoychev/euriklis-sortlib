'use strict';
import validator from "@euriklis/validator";
const IsObject = item => new validator(item).isObject.answer;
export default IsObject;