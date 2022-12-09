'use strict';
import validator from '@euriklis/validator';
import sortingAlgorithmsList from '../Models/SortAlgorithmList.js';
const IsSortingAlgorithm = (algorithm) => new validator(algorithm).is_same_with_any(sortingAlgorithmsList).answer;
export default IsSortingAlgorithm;