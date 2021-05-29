# Euriklis SORTLIB package

## Description

 The @euriklis/sortlib package is a library that contains a collection of sorting algorithms like bubble sort, heap sort, insertion sort, selection sort, merge sort, quick sort and many others algorithms. The implementation is made in such a way that the methods can be used for numerical arrays as well as for string or character arrays.

 # installation

 To install the @euriklis/sortlib package just run the command 
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
 - *SortLib.merge_sort(array, mode)* - the method assumes that the array is an number or string value array and the mode is set to true ("increase") if is not declared. The method implements the merge sort algorithms. Note that the returned result is an object with properties "array" that is the sorted array and "indices" that is an array with the index positions of the sorted elements in the initial array. The algorithm does not uses recursion and copies the elements of the initial array two times. This copy procedure is the reason for the delaying of the algorithm in comparison with the quick sort. 
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
- *SortLib.heap_sort(array, mode)* -  this method implements the heap sort algorithm. From version 1.1.0 the method does not use internal functions for the sorting procedure and in particular the utility functions ***shift_down*** and ***heap_shift_down*** which are widely used in the implementation of this family of sorting algorithms are avoided because of the more efficient execution of the algorithm. The parameter "array" has to be a number or string array and the "mode" as in the other cases noted above, is a boolean or a string variable with the only possible values "increase" and "decrease", when the parameter is of string type. For example:
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
const SortLib = require('@euriklis/sortlib')
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
const SortLib = require('@euriklis/sortlib')
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
const SortLib = require('@euriklis/sortlib')
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
- *SortLib.cocktail_sort(array, mode)* - implementation of the cocktail sort algorithm. Note that this algorithm is not fast and has complexity proportional to O(n<sup>2</sup>). The array and the mode parameters represents the same values as was noticed above. The method is available from version 1.0.2.
```js
const SortLib = require('@euriklis/sortlib')
const validator = require('@euriklis/validator')
const array = [45, 1, 5, 2, 423, 23, 21, 55, 16, 24, 67]
const sorted_array = [1, 2, 5, 16, 21, 23, 24, 45, 55, 67, 423]
const output = SortLib.cocktail_sort(array)
const reversed_output = SortLib.cocktail_sort(array, false)
const sort_lib_instance = new SortLib()
sort_lib_instance.array = array
sort_lib_instance.algorithm = 'cocktail sort'
sort_lib_instance["sort mode"] = true
sort_lib_instance.sort()
const reversed_instance = new SortLib()
reversed_instance.array = array
reversed_instance.algorithm = 'cocktail sort'
reversed_instance['sort mode'] = false
reversed_instance.sort() 
new validator(output.array).is_same(sorted_array)
    .and().bind(
        new validator(reversed_output.array).is_same([...sorted_array].reverse())
    )
    .and().bind(
        new validator(sort_lib_instance.array).is_same(sorted_array)
    )
    .and().bind(
        new validator(reversed_instance.array).is_same([...sorted_array].reverse())
    )
    .on(true, () => console.log(true) )
    .on(false, () => console.log(false))
```   
- *SortLib.bucket_sort(array, buckets, sort_mode)* - this method implements the bucket sort algorithm. Note that this method is not fast and has worst complexity O(n<sup>2</sup>) and average time complexity O(2 * n + n<sup>2</sup> / k + k), where the k is the number of the buckets. The buckets are lists in which the elements of the array have to be passed. Note that the number of the buckets can not be higher than the length of the array. In the case that the buckets are not declared the method automatically sets this parameter to floor (array.length / 2). In the case in which the number of the buckets is bugger than the length of the array, then the buckets will be set to the length of the array. It is important that this method can be executed only for number arrays. The method is available form version 1.0.3 and higher versions.
```js
const validator = require('@euriklis/validator')
const SortLib = require('@euriklis/sortlib')
let array = [12, 2, -21, 32,1.2, 43, 5, 3],
    sorted_array = [-21, 1.2, 2, 3, 5, 12, 32, 43],
    output = SortLib.bucket_sort(array, 3, true),
    reversed_output = SortLib.bucket_sort(array, 3, false)
new validator(output.array).is_same(sorted_array)
    .and().bind(
        new validator(reversed_output.array).is_same([...sorted_array].reverse())
    )
    .on(true, () => console.log('Correctly sorted array with bucket sort static method bucket_sort()'))
    .on(false, () => console.error('Error in the execution of the bucket sort algorithm from the static method bucket_sort().'))
```
- *SortLib.generate_random_array(length, seed)* - this method creates an array of uniform random values from 0 to 1 with length the first parameter of the package and use optionally seed parameter. We use the idea of the John Burkardt Fortran routine in this static method. The method is available from version 1.1.0 of the package.  
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

# Technical information and details
For more time and memory efficiency we implement all fast sorting algorithms without internal functions and without recursions. Also in the copy  procedure of the arrays we avoid to use the javascript spread operator (...). The copy of the elements is made with bitwise operations and shifting techniques. For example we can realize the loop
```js
let i, n = 100, array = []
for (i = 0;i < n;i++) array[i] = i
```
with the following more time efficient form:
```js
let i, n = 100, array = []
for (i = 0;i < n >> 1;i++) {
    array[i << 1] = i << 1
    array[(i << 1) + 1] = (i << 1) + 1
}
if (n & 1) array[n - 1] = n - 1
```
In our library we use two bits shifting for the copy procedures and the loops which allows that technique.
We also use the minimum count of variables and simulate the multiplication with bitwise techniques when this is possible.
# Why to use this package?
This package is constructed and designed for the needs of efficient sorting of number or string arrays/lists. It is well known that the javascript language provides a conventional way for sorting of arrays. But because of the generality of the nature of the arrays, the method ___sort()___ of javascript is very inefficient and unstable when we need fast sorting of number or character/string arrays. For that reason we created this library that implements the crucial sorting algorithms merge sort, quick sort, bucket sort and the conventional algorithms bubble sort, insertion sort, selection sort, cocktail sort and a dozen of other useful algorithms that may be used for the needs of the econometric or AI package construction or simply for experimental needs (testing of the efficiency of the sorting algorithms for small random arrays, medium random arrays, large random arrays and extremely large random arrays and etc). 

To demonstrate the time efficiency of the SortLib library we present the results that was obtained from the comparison of the SortLib algorithms and the conventional javascript method ___sort()___. First of all for medium arrays (in our case a random array form 100000 number elements) we observe that the most efficient algorithm is the quick sort, then the merge sort, heap sort and the conventional javascript algorithm. Concretely for 1 experiment for an array of 100000 random number elements we obtain:
```js
'use strict'
const message = require('@euriklis/message')
function ComparisonSortLibAndSort() {
    let answer = false, elements = 100000, iterations = 1,
        dt1, dt2, qs_time = 0, ms_time = 0, hs_time = 0, bs_time = 0,
        bub_time = 0, convent_time = 0, cs_time = 0, is_time = 0,
        sels_time = 0
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    const array = SortLib.generate_random_array(elements, 123456)
    const conventional_sorting = function (array, mode) {
        if (typeof mode === 'undefined') mode = true
        if (mode === 'decrease') mode = false
        const n = array.length
        let i, sorted_array = []
        for (i = 0; i < n >> 2; i++) {
            sorted_array[i << 2] = array[i << 2]
            sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
            sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
            sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        }
        if ((n % 4) >= 1) {
            sorted_array[n - 1] = array[n - 1]
        }
        if ((n % 4) >= 2) {
            sorted_array[n - 2] = array[n - 2]
        }
        if ((n % 4) >= 2) {
            sorted_array[n - 3] = array[n - 3]
        }
        return mode ? sorted_array.sort((a, b) => a - b) : sorted_array.sort((a, b) => b - a)
    }
    console.clear()
    new message().bold().set_color_green().append_check_mark().append_white_space()
        .set_color_yellow().append(`A random array with ${elements} elements from 0 to 1 was created successfully.`).reset().log()
    let sorted_array_qs, sorted_array_ms, sorted_array_cs, sorted_array_bubs,
        sorting_array_conventionally, sorted_array_hs, sorted_array_is, sorted_array_bcs,
        sorted_array_sels, i

    new message().bold().italic().underline().set_color_blue()
        .append('Results from the executing of the sorting algorithms efficiency:\n')
        .reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_qs = SortLib.quick_sort(array).array
        dt2 = Date.now()
        qs_time += (dt2 - dt1) / iterations
    }
    new message()
        .set_color_yellow()
        .append(`quick sort: ${qs_time / 1000} seconds.\n`).reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_ms = SortLib.merge_sort(array).array
        dt2 = Date.now()
        ms_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`merge sort: ${ms_time / 1000} seconds.\n`).reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_hs = SortLib.heap_sort(array).array
        dt2 = Date.now()
        hs_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`heap sort: ${hs_time / 1000} seconds.\n`).reset().log()

    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_bcs = SortLib.bucket_sort(array).array
        dt2 = Date.now()
        bs_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`bucket sort: ${bs_time / 1000} seconds.\n`).reset().log()
    
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_cs = SortLib.cocktail_sort(array).array
        dt2 = Date.now()
        cs_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`cocktail sort: ${cs_time / 1000} seconds.\n`).reset().log()
    
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorting_array_conventionally = conventional_sorting(array)
        dt2 = Date.now()
        convent_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`conventional js sort: ${convent_time / 1000} seconds.\n`).reset().log()
    
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_is = SortLib.insertion_sort(array).array
        dt2 = Date.now()
        is_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`insertion sort: ${is_time / 1000} seconds.\n`).reset().log()
    
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_bubs = SortLib.bubble_sort(array).array
        dt2 = Date.now()
        bub_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`bubble sort: ${bub_time / 1000} seconds.\n`).reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_sels = SortLib.selection_sort(array).array
        dt2 = Date.now()
        sels_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`selection sort: ${sels_time / 1000} seconds.\n`).reset().log()
        
    new validator(sorting_array_conventionally).is_same(sorted_array_ms)
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_qs)
        )
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_bubs)
        )
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_bcs)
        )
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_is)
        )
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_cs)
        )
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_hs)
        )
        .on(true, () => console.log(answer))
        .on(false, () => {
            throw new Error('Incorrect comparison or internal error into the sorting algorithms of SortLib.')
        })
```
output:
![](./src/assets/SortingAlgorithmSnapshot.png)

The same paradigm is valid for the large arrays (1000000 elements). The mean results which was obtained for 100 sorting procedures shows that the quick sort and merge sort are the most efficient algorithms, followed from the heap sort and the traditional javascript sorting method. 
```js
'use strict'
const message = require('@euriklis/message')
function ComparisonSortLibAndSort() {
    let answer = false, elements = 1000000, iterations = 100,
        dt1, dt2, qs_time = 0, ms_time = 0, hs_time = 0, bs_time = 0,
        bub_time = 0, convent_time = 0, cs_time = 0, is_time = 0,
        sels_time = 0
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    const array = SortLib.generate_random_array(elements, 123456)
    const conventional_sorting = function (array, mode) {
        if (typeof mode === 'undefined') mode = true
        if (mode === 'decrease') mode = false
        const n = array.length
        let i, sorted_array = []
        for (i = 0; i < n >> 2; i++) {
            sorted_array[i << 2] = array[i << 2]
            sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
            sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
            sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        }
        if ((n % 4) >= 1) {
            sorted_array[n - 1] = array[n - 1]
        }
        if ((n % 4) >= 2) {
            sorted_array[n - 2] = array[n - 2]
        }
        if ((n % 4) >= 2) {
            sorted_array[n - 3] = array[n - 3]
        }
        return mode ? sorted_array.sort((a, b) => a - b) : sorted_array.sort((a, b) => b - a)
    }
    console.clear()
    new message().bold().set_color_green().append_check_mark().append_white_space()
        .set_color_yellow().append(`A random array with ${elements} elements from 0 to 1 was created successfully.`).reset().log()
    let sorted_array_qs, sorted_array_ms, sorted_array_cs, sorted_array_bubs,
        sorting_array_conventionally, sorted_array_hs, sorted_array_is, sorted_array_bcs,
        sorted_array_sels, i

    new message().bold().italic().underline().set_color_blue()
        .append('Results from the executing of the sorting algorithms efficiency:\n')
        .reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_qs = SortLib.quick_sort(array).array
        dt2 = Date.now()
        qs_time += (dt2 - dt1) / iterations
    }
    new message()
        .set_color_yellow()
        .append(`quick sort: ${qs_time / 1000} seconds.\n`).reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_ms = SortLib.merge_sort(array).array
        dt2 = Date.now()
        ms_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`merge sort: ${ms_time / 1000} seconds.\n`).reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_hs = SortLib.heap_sort(array).array
        dt2 = Date.now()
        hs_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`heap sort: ${hs_time / 1000} seconds.\n`).reset().log()

    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_bcs = SortLib.bucket_sort(array).array
        dt2 = Date.now()
        bs_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`bucket sort: ${bs_time / 1000} seconds.\n`).reset().log()
    
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorting_array_conventionally = conventional_sorting(array)
        dt2 = Date.now()
        convent_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`conventional js sort: ${convent_time / 1000} seconds.\n`).reset().log()
    new validator(sorting_array_conventionally).is_same(sorted_array_ms)
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_qs)
        )
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_bcs)
        )
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_hs)
        )
        .on(true, () => console.log(answer))
        .on(false, () => {
            throw new Error('Incorrect comparison or internal error into the sorting algorithms of SortLib.')
        })
```
output:
![](./src/assets/FastAlgorithmsSnapshot.png)

The obtained results was realized on Dell Latitude E654D machine.
# Bugs and tips
If you have any well-meaning critique or have noticed any bug you may send me an email on exel_mmm@abv.bg or to euriklis@hotmail.bg
# Donations
Donations are welcome at 

> BG52FINV91502015033152 EUR

Every cent of your donated money will be used for the implementing of a library for artificial intelligence and econometric estimations (The required or wished donation is from 1 to 5 euro of dollars).
# License   
MIT License. This package will be provided for free to any user that use it for personal and non commercial usage. The author of the package is not liable for any errors in third party software, libraries, packages and source code used at these libraries. The author also may not responsible for some possible bugs that may exists in the library.
# Dependencies
The project has two dependencies that are the @euriklis/validator and the @euriklis/message libraries that are used for the testing and the setting of the methods of the SortLib class.
# Tests
Some tests of the library are available in the Tests folder of the package. You can run these tests with the trivial way by running of the command:
```sh
node node_nodules/@euriklis/sortlib/Tests
```
or to move the Tests folder to wished form you directory in which are all your tests and to run it from there.
