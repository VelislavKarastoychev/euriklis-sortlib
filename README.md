# Euriklis SORTLIB package

## Description

 The @euriklis/sortlib package is a library that contains a collection of sorting algorithms like bubble sort, heap sort, insertion sort, selection sort, merge sort, quick sort and many others algorithms. The implementation is made in such a way that the methods can be used for numerical arrays as well as for string or character arrays.

 # installation

 to install the @euriklis/sortlib package just run the command 
 ```sh
npm install @euriklis/sortlib --save
 ```
 or  for more strict mode if you wish to save the version you may use the command:

 ```sh
 npm install @euriklis/sortlib@x.x.x --save-exact
 ```
where with the "x.x.x" we denote the current version of the sortlib library
 
# Usage and examples:
 To declare the SortLib library/package you have to write after the installing procedure the following text into the main file:
 ```js
 const sortlib = require('@euriklis/sortlib')
 console.log(sortlib.version) // 1.0.0
 ```
 To create a SortLib instance you have to inside an object parameter into the SortLib constructor. This parameter has to contain the following properties:
 - *array* - an number or string array that has to be sorted from the algorithm
 - *algorithm* - the sorting algorithm. The possible values for this property are *"merge sort"* (if the algorithm is not set, then this value is assumed by default from the constructor), *"quick sort"*, *"heap sort"*, *"insertion sort"*, *"selection sort"* and *"bubble sort"*. The first three are fast sorting algorithms (complexity of order O(nlogn)) and the second three have complexity > O(n<sup>2</sup>).
 - *sort mode* - if the user would like to sort the array in ascending order, then he/she has to set the ***sort mode*** property to *'increase'* or *true*. The constructor assumes by default that this property is set to true if is missed. If on the other hand we want to sort the array property in descending order then the value of the ***sort mode*** property has to be set to 'decrease' or false.
 - status - if the user wants to declare that the array property which is inserted is sorted then he/she can set the status property to 'sorted'. The constructor set by default this property to 'unsorted'. When the user uses the *sort()* method then the value of this property changes automatically to 'sorted'.
 ```js
 const sortlib = require('@euriklis/sortlib')
 const sortlib_instance = new sortlib({
     array : [1, 8, 3, 7, 4, 2, 5, 6],
     algorithm : 'merge sort', 
     // as well as "quick sort", "heap sort", "insertion sort",
     // "bubble sort" and "selection sort"
     "sort mode" : 'increase' // or alternatively true for
     // ascending order sorting and 'decrease' or false for
     // descending order sorting of the array
 })
 ```
 The constructor creates automatically the property indices that is an array that shows the order or the index of every element of the array. When the element position changes by the sorting procedure, then the indices property changes the position of this element. In fact we need to create just the array parameter and all other parameters can be set automatically from the constructor of the SortLib class. 
 If we want to use just the sorting algorithms without creating of any instance, then we may use the static methods of the package.
 The SortLib static methods are the following:
 - *SortLib.addElementInSortedArray(array, element)* - this method ***assumes*** that the array is number or string array that is already sorted and put an arbitrary element (number of string value) to the existed array. The method computes automatically the mode of the ordering of the array (ascending of descending). Note that the returned result is an SortLib object.For example:
 ```js
 const sortlib = require('@euriklis/sortlib')
 const array = [1, 2, 3, 4,  5, 6]
 const extended_array = sortlib.addElementInSortedArray(array, 7)
 console.log(extended_array.array) // [1, 2, 3, 4, 5, 6, 7]
 ```
 - *SortLib.merge_sort(array, mode)* - the method assumes that the array is an number of string value array and the mode is set to true ("increase") if is not declared. The method implements the merge sort algorithms. Note that the returned result is an object with properties "array" that is the sorted array and "indices" that is an array with the index positions of the sorted elements in the initial array. The algorithm does not uses recursion and copies the elements of the initial array only one time. The partition of the array is simulated by swapping procedures. 
```js
const sortlib = require('@euriklis/sortlib')
const array = [19, 3, 38, 2, 14, 6, 48, 32, 12, 5]
const sorted_array = sortlib.merge_sort(array)
const inverse_sorted_array = sortlib.merge_sort(array, false)// or "decrease"
console.log(sorted_array)
/**
 * { 
 *    array: [ 2, 3, 5, 6, 12, 14, 19, 32, 38, 48 ],
 *    indices: [ 3, 1, 9, 5, 8, 4, 0, 7, 2, 6 ] 
 * }
 **/
console.log(inverse_sorted_array)
/**
 *{ 
 *    array: [ 48, 38, 32, 19, 14, 12, 6, 5, 3, 2 ],
 *   indices: [ 6, 2, 7, 0, 4, 8, 5, 9, 1, 3 ] 
 * } 
 **/
```
- *SortLib.quick_sort(array, mode)* - this method implements the quick sort algorithm. Note that this algorithm is fast (complexity O(nlogn)) and is implemented without using of recursion. The array parameter has to be a number of string array and the mode is a boolean or string variable with possible values "decrease" and "increase". By default the method assumes that the mode is set to "increase"/true. Note that the method returns an object with properties "array" and "indices" that represents the sorted array and the index position of the elements in the initial array. For example:
```js
const sortlib = require('@euriklis/sortlib')
const array = [3, 61, 23, 13, 87, 19, 185, 2, 26, 5]
const output = sortlib.quick_sort(array)// or ...quick_sort(array, true)
const reversed_output = sortlib.quick_sort(array, false) // or "decrease"
console.log(output)
=> { 
    array: [ 2, 3, 5, 13, 19, 23, 26, 61, 87, 185 ],
    indices: [ 7, 0, 9, 3, 5, 2, 8, 1, 4, 6 ] 
}
console.log(reversed_output)
=> { 
    array: [ 185, 87, 61, 26, 23, 19, 13, 5, 3, 2 ],
    indices: [ 6, 4, 1, 8, 2, 5, 3, 9, 0, 7 ] 
}
```
- *SortLib.heap_sort(array, mode)* -  this method implements the heap sort algorithm. The method uses internal functions for the sorting procedure and especially the utility functions ***shift_down*** and ***heap_shift_down*** which are widely used in the implementation of this family of sorting algorithms. The parameter "array" has to be a number or string array and the "mode" as in the other cases noted above, is a boolean or a string variable with the only possible values "increase" and "decrease", when the parameter is of string type. For example:
```js
const sortlib = require('@euriklis/sortlib')
const array = [1, 4, 2, 98, 32, 24, 42, 18, 3, 48, 21]
const output = sortlib.heap_sort(array)
const reversed_output = sortlib.heap_sort(array, "decrease") 
// or false alternatively
console.log(output)
=> { 
    array: [ 1, 2, 3, 4, 18, 21, 24, 32, 42, 48, 98 ],
    indices: [ 0, 2, 8, 1, 7, 10, 5, 4, 6, 9, 3 ] 
}
console.log(reversed_output)
=> { 
    array: [ 98, 48, 42, 32, 24, 21, 18, 4, 3, 2, 1 ],
    indices: [ 3, 9, 6, 4, 5, 10, 7, 1, 8, 2, 0 ] 
}
```
- *SortLib.insertion_sort(array, mode)* - this method implements the insertion sort algorithm. Note that the algorithm has non linear complexity (0(n<sup>2</sup>)). The array and the mode parameters represent the same values as in the strict methods above. For example:
```js
const sortlib = require('@euriklis/sortlib')
const array = [12, 1, 54, 34, 67, 13, 109, 32, 88]
const output = SortLib.insertion_sort(array)
const reversed_output = SortLib.insertion_sort(array, false)
console.log(output)
=> { 
    array: [ 1, 12, 13, 32, 34, 54, 67, 88, 109 ],
    indices: [ 1, 0, 5, 7, 3, 2, 4, 8, 6 ] 
}
console.log(reversed_output)
=> { 
    array: [ 109, 88, 67, 54, 34, 32, 13, 12, 1 ],
    indices: [ 6, 8, 4, 2, 3, 7, 5, 0, 1 ] 
}
```
- *SortLib.bubble_sort(array, mode)* - this algorithm implements the bubble sort algorithm. The method does not uses recursion. The "array" and "mode" parameters represent the same values as in the strict methods above.
```js
const sortlib = require('@euriklis/sortlib')
const array = [2, 18, 3, 84, 24, 13, 1, 42, 21, 11]
const output = SortLib.bubble_sort(array)
const reversed_output = SortLib.bubble_sort(array, false)
console.log(output)
=> { 
    array: [ 1, 2, 3, 11, 13, 18, 21, 24, 42, 84 ],
    indices: [ 6, 0, 2, 9, 5, 1, 8, 4, 7, 3 ] 
}
console.log(reversed_output)
=> { 
    array: [ 84, 42, 24, 21, 18, 13, 11, 3, 2, 1 ],
    indices: [ 3, 7, 4, 8, 1, 5, 9, 2, 0, 6 ] 
}
```
- *SortLib.selection_sort(array, mode)* - this method implements the selection sort algorithm. The "array" and "mode" parameters represent the same values as in the strict methods above.
```js
const sortlib = require('@euriklis/sortlib')
const array = [4, 1, 5, 35, 9, 289, 3, 24, 14, 21, 6, 28]
const output = SortLib.selection_sort(array)
const reversed_output = SortLib.selection_sort(array, false)
console.log(output)
=> { 
    array: [ 1, 3, 4, 5, 6, 9, 14, 21, 24, 28, 35, 289 ],
    indices: [ 1, 6, 0, 2, 10, 4, 8, 9, 7, 11, 3, 5 ] 
}
console.log(reversed_output)
=> { 
    array: [ 1, 3, 4, 5, 6, 9, 14, 21, 24, 28, 35, 289 ],
    indices: [ 1, 6, 0, 2, 10, 4, 8, 9, 7, 11, 3, 5 ] 
}
```
The SortLib package can run any of these methods shown above when the array parameter of the current instance is declared. This can be done with the using of the sort() method of the SortLib package/library. 
```js
const SortLib = require('../index')
const array = [4, 1, 5, 35, 9, 289, 3, 24, 14, 21, 6, 28]
const sortlib_instance = new SortLib({array})
// the unsorted array
console.log(sortlib_instance)
sortlib_instance.algorithm = 'quick sort'
// the sorted array with the quick sort algorithm
sortlib_instance.sort()
console.log(sortlib_instance)
// reset the array and apply the
// insertion sort algorithm.
sortlib_instance.algorithm = 'insertion sort'
sortlib_instance.status = 'unsorted'
sortlib_instance.array = array
sortlib_instance.sort()
// the sorted array with the insertion sort
// algorithm...
console.log(sortlib_instance)
sortlib_instance.algorithm = 'bubble sort'
sortlib_instance.status = 'unsorted'
sortlib_instance.sort()
console.log(sortlib_instance)
=> SortLib {
  __array__: [ 4, 1, 5, 35, 9, 289, 3, 24, 14, 21, 6, 28 ],
  __size__: 12,
  __algorithm__: 'merge sort',
  __sort_mode__: 'increase',
  __status__: 'unsorted',
  __indices__: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ] }
SortLib {
  __array__: [ 1, 3, 4, 5, 6, 9, 14, 21, 24, 28, 35, 289 ],
  __size__: 12,
  __algorithm__: 'quick sort',
  __sort_mode__: 'increase',
  __status__: 'sorted',
  __indices__: [ 1, 6, 0, 2, 10, 4, 8, 9, 7, 11, 3, 5 ] }
SortLib {
  __array__: [ 1, 3, 4, 5, 6, 9, 14, 21, 24, 28, 35, 289 ],
  __size__: 12,
  __algorithm__: 'insertion sort',
  __sort_mode__: 'increase',
  __status__: 'sorted',
  __indices__: [ 1, 6, 0, 2, 10, 4, 8, 9, 7, 11, 3, 5 ] }
SortLib {
  __array__: [ 1, 3, 4, 5, 6, 9, 14, 21, 24, 28, 35, 289 ],
  __size__: 12,
  __algorithm__: 'bubble sort',
  __sort_mode__: 'increase',
  __status__: 'sorted',
  __indices__: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ] }
```
To get or set the identical properties of the SortLib instance you have to use the get and set methods *array* , *size* (only getting mode), *algorithm* (if you try to set the algorithm to not supported value for the library, then the algorithm will be set automatically to "merge sort"), *sort mode* (getter and setter methods), *status* (getter and setter methods. The only supported values are 'sorted' and 'unsorted') and *indices* (getter and setter methods).

# Bugs and tips
If you have any well-meaning critique or have noticed any bug you may send me an email on exel_mmm@abv.bg or to euriklis@hotmail.bg
# Donations
Donations are welcome at BG27FINV915010BGN0A9G5 BGN
Every cent of your donated money will be used for the implementing of a library for artificial intelligence and econometric estimations (The required or wished donation is from 1 to 5 euro of dollars).
# License   
MIT License. This package will be provided for free to any user that use it for personal and non commercial usage. The author of the package is not liable for any errors in third party software, libraries, packages and source code used at these libraries. The author also may not responsible for some possible bugs that may exists in the library.
# Dependencies
The project has two dependencies that are the @euriklis/validator and the @euriklis/message libraries that are used for the testing and the setting of the methods of the SortLib class.
# Tests
You can run the tests of the @euriklis/sortlib package by typing the following command in the console/terminal into the directory of your project:
```sh
npm test
```
or
```sh
npm t
```