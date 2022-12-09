'use strict';
import validator from '@euriklis/validator';
const IsStatus = item => new validator(item)
    .is_same_with_any(['sorted', 'unsorted'])
    .Or.isUndefined
    .answer;
export default IsStatus;