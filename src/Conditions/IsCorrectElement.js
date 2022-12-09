import validator from '@euriklis/validator';
const IsCorrectElement = (element, property) => {
    let i, p, item = Object.assign({}, element), is_correct = true;
    for (i = 0;i < property.length - 1;i++) {
        p = property[i];
        item = item[p];
        is_correct = new validator(item).isObject.answer;
        if (!is_correct) break;
    }
    if (is_correct) {
        item = item[property[property.length - 1]];
        is_correct = new validator(item).isNumber.Or.isString.answer;
    }
    return is_correct;
} 
export default IsCorrectElement;