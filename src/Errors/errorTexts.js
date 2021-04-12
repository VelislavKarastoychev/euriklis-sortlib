'use strict'
const ErrorText = 'Euriklis SortLib package error message:\n'
const IncorrectArrayDeclarationInSortLibConstructor = 'Incorrect declaration of the array in the SortLib class constructor argument. Note that the array parameter has to be an number or string array.'
const IncorrectArrayInAddElementInSortedArray = 'Incorrect array parameter in the method addElementInSortedArray. Note that the array has to be a number of string array.'
const IncorrectArrayInSetterArray = 'Incorrect array parameter in the array setter method. Note that this parameter has to be an number or string array.'
const IncorrectArgumentInIndexSetter = 'Incorrect argument in the index setter. Note that the argument of the method has to be an object with keys (properties) index and item.'
const IncorrectStatusInSetter = 'Incorrect status in the setter method. Note that the status argument of the method has to be a string with possible values "sorted" and "unsorted".'
const IncorrectArrayParameterInBucketSort = 'Incorrect array parameter in the bucket_sort method. Note that this method requires the array to consists only from number elements.'
module.exports = {
    ErrorText,
    IncorrectArrayDeclarationInSortLibConstructor,
    IncorrectArrayInAddElementInSortedArray,
    IncorrectArrayInSetterArray,
    IncorrectArgumentInIndexSetter,
    IncorrectStatusInSetter,      
    IncorrectArrayParameterInBucketSort,   
}