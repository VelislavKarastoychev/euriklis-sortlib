'use strict';
import validator from '@euriklis/validator';
const IsSortMode = item => new validator(item).is_same_with_any([true, false, 'increase', 'decrease']).answer;
export default IsSortMode;