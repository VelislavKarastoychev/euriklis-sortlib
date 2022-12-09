'use strict';
const ErrorText = 'Euriklis SortLib package error message:\n';
const IncorrectArgumentInIndexSetter = 'Incorrect argument in the index setter. Note that the argument of the method has to be an object with keys (properties) index and item.';
const IncorrectArgumentOfCallbackInFilterWithValidator = 'Incorrect first argument in the callback function parameter in the static method filter with validator. Note that the argument of the callback function has to be a validator instance variable.';
const IncorrectArrayDeclarationInSortLibConstructor = 'Incorrect declaration of the array in the SortLib class constructor argument. Note that the array parameter has to be an number or string array.';
const IncorrectArrayInAddElementInSortedArray = 'Incorrect array parameter in the method addElementInSortedArray. Note that the array has to be a number of string array.';
const IncorrectArrayInFilterWithValidator = 'Incorrect array argument in the filter with validator static method. The argument/parameter has to be an arbitrary array.';
const IncorrectArrayInFindElementInSortedArray = 'Incorrect array in find_element_in_sorted_array() static method of the library. Note that this parameter (the first parameter of the method) has to be a number or string array.';
const IncorrectArrayInFindElementsInSortedObjectArray = 'Incorrect array parameter in find elements in sorted object array method of the @euriklis/sortlib package. Note that this parameter has to be an object array with arbitrary properties.';
const IncorrectArrayInRemoveElementFromSortedArray = 'Incorrect array parameter in the static method remove element from sorted array. Note that the array has to contain only number or string elements.';
const IncorrectArrayInRemoveElementFromSortedObjectArray = 'Incorrect array parameter in the static method remove element from sorted object array by property. Note that this parameter has to be an array, each element of which is an arbitrary object.';
const IncorrectArrayInSetterArray = 'Incorrect array parameter in the array setter method. Note that this parameter has to be an number or string array.';
const IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty = 'Incorrect array parameter in the add_element_sorted_object_array_by_property() static method. The array has to be an object array and to contains only string or number values in the leafs.';
const IncorrectArrayParameterInBucketSort = 'Incorrect array parameter in the bucket_sort method. Note that this method requires the array to consists only from number elements.';
const IncorrectArrayParameterInFilter = 'Incorrect array parameter in the static filter method. This parameter has to be an array with elements of number or string or object type.';
const IncorrectArrayParameterInFindBestElements = 'Incorrect array parameter in the find_best_elements static method. The array has to be number or string array.';
const IncorrectArrayParameterInFindBestInObjectArray = 'Incorrect array parameter in the find_best_in_object_array_by_property static method. Note that this parameter has to be an array, each element of which is an object.';
const IncorrectArrayParameterInFindWorstElements = 'Incorrect array parameter in the find_worst_elements static method of the SortLib package. To be valid, the array has to be a number or string array.';
const IncorrectArrayParameterInFindWorstInObjectArray = 'Incorrect array parameter in find_worst_for_object_array_by_property static method. Note that this parameter has to be an array, each of the elements of which is an object.';
const IncorrectArrayParameterInSortObjectArray = 'Incorrect array parameter in sort_object_array_by_property static method. Note that this array has to include only object type elements.';
const IncorrectCallbackParameterInFilter = "Incorrect callback parameter in the static filter method. Note that the callback parameter has to be a function with three elements the first one is the item of the array, the second one is the index of the item in the array and the third is the array.";
const IncorrectCountParameterInFindWorstInObjectArray = 'Incorrect count parameter in find_worst_for_object_array_by_property static method. Note that this parameter has to be an integer number of a floating point number in the open range (0, 1).';
const IncorrectElementInAddElementInSortedArray = 'Incorrect element parameter in the add_element_in_sorted_array() method of the SortLib package. Note that this argument has to be of number or of string type.';
const IncorrectElementInAddElementInSortedObjectArrayByProperty = 'Incorrect element in the add_element_in_sorted_object_array_by_property() static method. Note that this parameter has to be a string or a number and nothing else.';
const IncorrectElementInFindElementInSortedArray = 'Incorrect element in find_element_in_sorted_array() static method of the library. Note that the element (the second parameter of the method) has to be a number of string.';
const IncorrectElementParameterInFindElementsInSortedObjectArray = 'Incorrect element parameter in the find elements in sorted object array. Note that this property has to be an object with keys, which are identical to the elements of the property array.';
const IncorrectElementParameterInRemoveElementFromSortedArray = 'Incorrect element parameter in the static method remove element from sorted array. Note that the element parameter has to be of string or number type.';
const IncorrectElementParameterInRemoveElementFromSortedObjectArray = 'Incorrect element parameter in the static method remove element from sorted object array by property. Note that this element has to be an arbitrary object.';
const IncorrectIndicesParameterInSetter = 'Incorrect indices property of the corresponding setter method. The indices has to be an array of length the size of the array property and elements which are smaller than the size of the array.'
const IncorrectLengthInGRSA = 'Incorrect length argument in the generate random string array static method. This is the first parameter in the method and represents the length of the array of random strings which have to be created, so this parameter has to be strictly positive integer.';
const IncorrectModeParameterInRemoveElementFromSortedObjectArray = 'Incorrect mode parameter in the static method remove element from sorted object array. Note that this parameter has to be a boolean value or increase or decrease. '
const IncorrectParameterInGRA = 'Incorrect parameter in the generate random array static method. Note that the parameter n has to be an integer.';
const IncorrectPropertyInSortObjectArray = 'Incorrect property parameter in the sort_object_array_by_property static method. Note that the property has to be a string or string array. If the property/es does not exist in any object element of the array, this element will be omitted.';
const IncorrectPropertyParameterInAddElementInSortedObjectArrayByProperty = 'Incorrect property parameter in the add_element_in_sorted_object_array_by_property() static method. Note that this parameter has to be a string array or a string.';
const IncorrectPropertyParameterInFindBestInObjectArray = 'Incorrect property parameter in find_best_in_object_array_by_property static method. Note that this parameter has to be an array with string elements or a string value.';
const IncorrectPropertyParameterInFindElementsInSortedObjectArray = 'Incorrect property parameter in find elements in sorted object array by property method. Note that this property has to be a string array with the strings to represent the nested object structure of each element.';
const IncorrectPropertyParameterInFindWorstInObjectArray = 'Incorrect property parameter in find_worst_for_object_array_by_property static method. Note that this parameter has to be an array, each of the elements of which is a string or a string array.';
const IncorrectPropertyParameterInRemoveElementFromSortedObjectArray = 'Incorrect property parameter in the remove element from sorted object array by property static method. Note that this argument has to be an string array which elements corresponds to the keys of the element structure.';
const IncorrectStatusInSetter = 'Incorrect status in the setter method. Note that the status argument of the method has to be a string with possible values "sorted" and "unsorted".';
const IncorrectWordSizeInGRSA = 'Incorrect word size argument in the generate random string array static method. This is the second parameter in the method and represents the word size (count of symbols or characters of each element) of the array of random strings which have to be created, so this parameter has to be strictly positive integer.';
export {
    ErrorText,
    IncorrectArgumentInIndexSetter,
    IncorrectArgumentOfCallbackInFilterWithValidator,
    IncorrectArrayDeclarationInSortLibConstructor,
    IncorrectArrayInAddElementInSortedArray,
    IncorrectArrayInFilterWithValidator,
    IncorrectArrayInFindElementInSortedArray,
    IncorrectArrayInRemoveElementFromSortedArray,
    IncorrectArrayInRemoveElementFromSortedObjectArray,
    IncorrectArrayInSetterArray,
    IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty,
    IncorrectArrayParameterInBucketSort,   
    IncorrectArrayParameterInFilter,
    IncorrectArrayParameterInFindBestElements,
    IncorrectArrayParameterInFindBestInObjectArray,
    IncorrectArrayParameterInFindWorstElements,
    IncorrectArrayParameterInFindWorstInObjectArray,
    IncorrectArrayParameterInSortObjectArray,
    IncorrectArrayInFindElementsInSortedObjectArray,
    IncorrectCallbackParameterInFilter,
    IncorrectCountParameterInFindWorstInObjectArray,
    IncorrectElementInAddElementInSortedArray,
    IncorrectElementInAddElementInSortedObjectArrayByProperty,
    IncorrectElementInFindElementInSortedArray,
    IncorrectElementParameterInFindElementsInSortedObjectArray,
    IncorrectElementParameterInRemoveElementFromSortedArray,
    IncorrectElementParameterInRemoveElementFromSortedObjectArray,
    IncorrectIndicesParameterInSetter,
    IncorrectLengthInGRSA, 
    IncorrectModeParameterInRemoveElementFromSortedObjectArray,
    IncorrectParameterInGRA,
    IncorrectPropertyInSortObjectArray,
    IncorrectPropertyParameterInAddElementInSortedObjectArrayByProperty,
    IncorrectPropertyParameterInFindBestInObjectArray,
    IncorrectPropertyParameterInFindElementsInSortedObjectArray,
    IncorrectPropertyParameterInFindWorstInObjectArray,
    IncorrectPropertyParameterInRemoveElementFromSortedObjectArray,
    IncorrectStatusInSetter,      
    IncorrectWordSizeInGRSA,
};