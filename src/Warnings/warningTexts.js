'use strict';
const WarningText = 'Euriklis SortLib package warning message:\n'
const UndefinedArrayInSortLibConstructor = 'Undefined array in the SortLib class constructor. Note that to make sorting and to use the provided algorithms you have to declare an number or string array in the constructor options or parameters object.'
const IncorrectAlgorithmDeclaration = 'Incorrect declaration of the algorithm parameter in the constructor parameter. Please note that the algorithm has to be a string with possible values "merge sort", "quick sort", "heap sort", "insertion sort", "selection sort", "cocktail sort", "bucket sort" and "bubble sort"'
const IncorrectSortModeDeclaration = 'Incorrect declaration of the sort mode in the current SortLib constructor. Note that the sort mode of the instance can have the values "increase", "decrease", true or false.'
const IncorrectAlgorithmInAlgorithmSetter = 'Incorrect algorithm parameter into the setter method algorithm. Note that this parameter has to be a string with possible values "merge sort", "quick sort", "heap sort", "insertion sort", "selection sort", "cocktail sort", "bucket sort" and "bubble sort".'
const IncorrectCountParameterInFindBestElements = 'Incorrect type of the second parameter of the method find_best_elements. Note that the count parameter has to be an integer from 1 to the length of the array or an floating point number in the open interval (0, 1).'
const IncorrectCountParameterInFindWorstElements = 'Incorrect type of the second parameter of the method find_worst_elements. Note that the parameter has to be an integer from 1 to the length of the array or a real number from 0 and 1.'
const IncorrectOrUndefinedModeParameterInSortObjectArray = 'Incorrect or undefined mode parameter in the sort_object_array static method of the SortLib package. Note that the mode has to be only a boolean value or a string with values "decrease" or "increase".'
const IncorrectOrUndefinedAlgorithmParameterInSortObjectArray = 'Incorrect or undefined algorithm parameter in the sort_object_array_by_property static method. Note that this parameter has to be a string with the values "quick sort", "merge sort", "heap sort" and "bucket sort".'
export {
    WarningText,
    UndefinedArrayInSortLibConstructor,
    IncorrectAlgorithmDeclaration,
    IncorrectSortModeDeclaration, 
    IncorrectAlgorithmInAlgorithmSetter,
    IncorrectCountParameterInFindBestElements,
    IncorrectCountParameterInFindWorstElements,
    IncorrectOrUndefinedModeParameterInSortObjectArray,
    IncorrectOrUndefinedAlgorithmParameterInSortObjectArray,
};