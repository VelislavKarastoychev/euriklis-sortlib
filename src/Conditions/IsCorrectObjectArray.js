'use strict';
import validator from '@euriklis/validator';
const IsCorrectObjectArray = (array, property) => {
    return new validator(array).for_all(element => {
        let i, p, item = element.value, is_correct = true;
        const is_object = new validator(item).isObject.answer;
        if (is_object) {
            for (i = 0; i < property.length - 1; i++) {
                p = property[i];
                new validator(item[p]).isObject
                    .on(true, () => item = item[p])
                    .on(false, () => is_correct = false);
                if (!is_correct) break
            }
            if (is_correct) {
                item = item[property[property.length - 1]];
                is_correct = new validator(item).isNumber.Or.isString.answer;
            }
        } else is_correct = false;
        return new validator(is_correct).is_same(true);
    })
}
export default IsCorrectObjectArray;