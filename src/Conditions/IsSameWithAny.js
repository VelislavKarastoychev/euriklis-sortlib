'use strict';
import validator from '@euriklis/validator';
const IsSameWithAny = (item, list) => new validator(item).is_same_with_any(list).answer;
export default IsSameWithAny;