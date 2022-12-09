import validator from '@euriklis/validator';
const IsNumber = item => new validator(item).isNumber.answer;
export default IsNumber;