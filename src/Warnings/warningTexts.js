'use strict'
const WarningText = 'Euriklis SortLib package warning message:\n'
const UndefinedArrayInSortLibConstructor = 'Undefined array in the SortLib class constructor. Note that to make sorting and to use the provided algorithms you have to declare an number or string array in the constructor options or parameters object.'
const IncorrectAlgorithmDeclaration = 'Incorrect declaration of the algorithm parameter in the constructor parameter. Please note that the algorithm has to be a string with possible values "merge sort", "quick sort", "heap sort", "interpolation"and "bubble sort"'
const IncorrectSortModeDeclaration = 'Incorrect declaration of the sort mode in the current SortLib constructor. Note that the sort mode of the instance can have the values "increase", "decrease", true or false.'
const IncorrectAlgorithmInAlgorithmSetter = 'Incorrect algorithm parameter into the setter method algorithm. Note that this parameter has to be a string with possible values "merge sort", "quick sort", "heap sort", "interpolation" and "bubble sort".'



module.exports = {
    WarningText,
    UndefinedArrayInSortLibConstructor,
    IncorrectAlgorithmDeclaration,
    IncorrectSortModeDeclaration, 
    IncorrectAlgorithmInAlgorithmSetter,
      
}