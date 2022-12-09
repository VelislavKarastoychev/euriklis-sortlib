'use strict';
import validator from '@euriklis/validator';
const AreObjectsEqual = (item1, item2) => new validator(item1).is_same(item2).answer;
export default AreObjectsEqual;