'use strict'
import validator from '@euriklis/validator';
const IsCorrectlyDefinedIndices = (indices, size) => new validator(indices)
    .is_array_and_for_every(index => index.isInteger.And.is_in_closed_range(0, size - 1))
    .And.has_length(size).answer;
export default IsCorrectlyDefinedIndices;