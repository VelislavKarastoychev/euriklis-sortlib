'use strict';
const ErrorText = 'Euriklis SortLib package error message:\n';
const IncorrectArrayDeclarationInSortLibConstructor = 'Incorrect declaration of the array in the SortLib class constructor argument. Note that the array parameter has to be an number or string array.';
const IncorrectArrayInAddElementInSortedArray = 'Incorrect array parameter in the method addElementInSortedArray. Note that the array has to be a number of string array.';
const IncorrectArrayInSetterArray = 'Incorrect array parameter in the array setter method. Note that this parameter has to be an number or string array.';
const IncorrectArgumentInIndexSetter = 'Incorrect argument in the index setter. Note that the argument of the method has to be an object with keys (properties) index and item.';
const IncorrectStatusInSetter = 'Incorrect status in the setter method. Note that the status argument of the method has to be a string with possible values "sorted" and "unsorted".';
const IncorrectArrayParameterInBucketSort = 'Incorrect array parameter in the bucket_sort method. Note that this method requires the array to consists only from number elements.';
const IncorrectParameterInGRA = 'Incorrect parameter in the generate random array static method. Note that the parameter n has to be an integer.';
const IncorrectArrayParameterInFindBestElements = 'Incorrect array parameter in the find_best_elements static method. The array has to be number or string array.';
const IncorrectArrayParameterInFindWorstElements = 'Incorrect array parameter in the find_worst_elements static method of the SortLib package. To be valid, the array has to be a number or string array.';
const IncorrectArrayParameterInSortObjectArray = 'Incorrect array parameter in sort_object_array_by_property static method. Note that this array has to include only object type elements.';
const IncorrectPropertyInSortObjectArray = 'Incorrect property parameter in the sort_object_array_by_property static method. Note that the property has to be a string or string array. If the property/es does not exist in any object element of the array, this element will be omitted.';
const IncorrectArrayParameterInFindBestInObjectArray = 'Incorrect array parameter in the find_best_in_object_array_by_property static method. Note that this parameter has to be an array, each element of which is an object.';
const IncorrectPropertyParameterInFindBestInObjectArray = 'Incorrect property parameter in find_best_in_object_array_by_property static method. Note that this parameter has to be an array with string elements or a string value.';
const IncorrectArrayParameterInFindWorstInObjectArray = 'Incorrect array parameter in find_worst_for_object_array_by_property static method. Note that this parameter has to be an array, each of the elements of which is an object.';
const IncorrectPropertyParameterInFindWorstInObjectArray = 'Incorrect property parameter in find_worst_for_object_array_by_property static method. Note that this parameter has to be an array, each of the elements of which is a string or a string array.';
const IncorrectCountParameterInFindWorstInObjectArray = 'Incorrect count parameter in find_worst_for_object_array_by_property static method. Note that this parameter has to be an integer number of a floating point number in the open range (0, 1).';
const IncorrectElementInFindElementInSortedArray = 'Incorrect element in find_element_in_sorted_array() static method of the library. Note that the element (the second parameter of the method) has to be a number of string.';
const IncorrectArrayInFindElementInSortedArray = 'Incorrect array in find_element_in_sorted_array() static method of the library. Note that this parameter (the first parameter of the method) has to be a number or string array.';
const IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty = 'Incorrect array parameter in the add_element_sorted_object_array_by_property() static method. The array has to be an object array and to contains only string or number values in the leafs.';
const IncorrectPropertyParameterInAddElementInSortedObjectArrayByProperty = 'Incorrect property parameter in the add_element_in_sorted_object_array_by_property() static method. Note that this parameter has to be a string array or a string.';
const IncorrectElementInAddElementInSortedObjectArrayByProperty = 'Incorrect element in the add_element_in_sorted_object_array_by_property() static method. Note that this parameter has to be a string or a number and nothing else.';
const IncorrectLengthInGRSA = 'Incorrect length argument in the generate random string array static method. This is the first parameter in the method and represents the length of the array of random strings which have to be created, so this parameter has to be strictly positive integer.';
const IncorrectWordSizeInGRSA = 'Incorrect word size argument in the generate random string array static method. This is the second parameter in the method and represents the word size (count of symbols or characters of each element) of the array of random strings which have to be created, so this parameter has to be strictly positive integer.';
module.exports = {
    ErrorText,
    IncorrectArrayDeclarationInSortLibConstructor,
    IncorrectArrayInAddElementInSortedArray,
    IncorrectArrayInSetterArray,
    IncorrectArgumentInIndexSetter,
    IncorrectStatusInSetter,      
    IncorrectArrayParameterInBucketSort,   
    IncorrectParameterInGRA,
    IncorrectArrayParameterInFindBestElements,
    IncorrectArrayParameterInFindWorstElements,
    IncorrectArrayParameterInSortObjectArray,
    IncorrectPropertyInSortObjectArray,
    IncorrectArrayParameterInFindBestInObjectArray,
    IncorrectPropertyParameterInFindBestInObjectArray,
    IncorrectArrayParameterInFindWorstInObjectArray,
    IncorrectPropertyParameterInFindWorstInObjectArray,
    IncorrectCountParameterInFindWorstInObjectArray,
    IncorrectElementInFindElementInSortedArray,
    IncorrectArrayInFindElementInSortedArray,
    IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty,
    IncorrectPropertyParameterInAddElementInSortedObjectArrayByProperty,
    IncorrectElementInAddElementInSortedObjectArrayByProperty,
    IncorrectLengthInGRSA, 
    IncorrectWordSizeInGRSA,
}