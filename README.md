# Euriklis SORTLIB package

## Description

 The @euriklis/sortlib package is a library that contains a collection of sorting algorithms like bubble sort, heap sort, insertion sort, selection sort, merge sort, quick sort and many others algorithms. The implementation is made in such a way that the methods can be used for numerical arrays as well as for string or character arrays.

 ## Installation

 To install the @euriklis/sortlib package just run the command 
 ```sh
npm install @euriklis/sortlib --save
 ```
 or  for more strict mode, if you wish to save the version, you may use the command:

 ```sh
 npm install @euriklis/sortlib@x.x.x --save-exact
 ```
where with the "x.x.x" we denote the current version of the sortlib library

We recommend you to use the version 3.0.0 or greater versions (for more details see the technical characteristics bellow). The versions >= 2.x.x are constructed with the ES pattern of javascript. 

After series of tests we found out that the versions of @euriklis/sortlib@1.0.x are very inefficient in time and memory aspects. For this reason we unpublished these versions and now only the versions ^1.1.x are available in the npm site. The versions 1.0.x may be found in the github account which corresponds to this library.  

# Usage and examples:
 To declare the SortLib library/package you have to write after the installing procedure the following text into the (main) file:
 ```js
 import sortlib from '@euriklis/sortlib';
 console.log(sortlib.version) // 3.0.0
 ```

 To create a SortLib instance you have to inside an object parameter into the SortLib constructor. This parameter has to contains the following properties:
 - *array* - a number or string array that will be sorted from the algorithm
 - *algorithm* - the sorting algorithm. The possible values for this property are *"merge sort"* (if the algorithm is not set, then this value is assumed by default from the constructor), *"quick sort"*, *"heap sort"*, *"insertion sort"*, *"selection sort"*, *"bubble sort"*, *"bucket sort"* and "cocktail sort". The first three are fast sorting algorithms (complexity of order O(nlogn)) and the rest of the other algorithms have complexity > O(n<sup>2</sup>).
 - *sort mode* - if the user would like to sort the array in ascending order, then it is necessary  to set the ***sort mode*** property to *'increase'* or *true*. The constructor assumes by default that this property is set to true if is missed. If on the other hand we want to sort the array property in descending order then the value of the ***sort mode*** property has to be set to 'decrease' or false.
 - status - if the user wants to declare that the array property which is inserted is sorted then it is necessary to set the status property to 'sorted'. The constructor sets by default this property to 'unsorted'. When the user uses the *sort()* method, then the value of this property changes automatically to 'sorted'.
 ```js
 import SortLib from '@euriklis/sortlib';
 const sortlib_instance = new sortLib({
     array : [1, 8, 3, 7, 4, 2, 5, 6],
     algorithm : 'merge sort', 
     // as well as "quick sort", "heap sort", "insertion sort",
     // "bubble sort" and "selection sort"
     "sort mode" : 'increase' // or alternatively true for
     // ascending order sorting and 'decrease' or false for
     // descending order sorting of the array
 })
 ```
 The constructor creates automatically the property "indices" that is an array that shows the order or the index of every element of the array when it is initially inserted. When the element position changes from the sorting procedure, then the indices property changes the position of the index of this element. In fact you need to create just the array parameter and all other parameters can be set automatically from the constructor of the SortLib class. 
 If you want to use just the sorting algorithms without creating of any instance, then you may use the static methods of the package. Note that when you create a SortLib instance, then the constructor automatically checks the validity of each element (i.e. if the array is from numeric or string elements).
You can see all the methods of the SortLib package in the [documentation](./DOCUMENTATION.md).
# Technical information and details
For more time and memory efficiency we implement all fast sorting algorithms without internal functions and without recursions. Also in the copy  procedure of the arrays we avoid to use the javascript spread operator (...). The copy of the elements is made with bitwise operations and shifting techniques. For example we can realize a copy of an arbitrary array with random number elements by following alternative methods:*
1. *Very inefficient way:*
```js
let n = 100, array = Array.from({length : n}).map(Math.random), copied_array
copied_array = [...array]
```
2. *Inefficient way:*
```js
let i, n = 100, array = Array.from({length : n}).map(Math.random), copied_array = []
for (i = 0;i < n;i++) copied_array[i] = array[i]
```
3. *Efficient form*:
```js
let i, n = 100, array = Array.from({length : n}).map(Math.random)
for (i = 0;i < n >> 1;i++) {
    copied_array[i << 1] = array[i << 1]
    copied_array[(i << 1) + 1] = array[(i << 1) + 1]
}
if (n & 1) copied_array[n - 1] = array[n - 1]
```
In our library we use double shifting for the copy procedures (i.e. loops with size n >> 2 and four instructions in the body of the loop with three additional condition instructions).
We also use the minimum count of variables and simulate the multiplication by two with bitwise techniques when it is possible.
All algorithms and the theoretical basis for the implementation of the library are taken from the book of Manolis Loukakis "Data structures. Algorithms", Thessaloniki, 1998, Sofia press.
# Why to use this package?
This package is constructed and designed for the needs of efficient sorting of number or string arrays/lists. It is well known that the javascript language provides a conventional way for sorting of arrays. But because the method ___sort()___ is constructed to manage arrays with abstract nature, this method is very inefficient and unstable when we need fast sorting of number or character/string arrays. For that reason we created this library in order to implements the crucial sorting algorithms merge sort, quick sort, heap sort, bucket sort and the conventional algorithms bubble sort, insertion sort, selection sort, cocktail sort and a dozen of other useful algorithms that may be used for the needs of the econometric or AI package construction or just for experimental needs like testing of the efficiency of the sorting algorithms for small random arrays, medium random arrays, large random arrays and extremely large random arrays, extracting of sorted object patterns etc. 
Our experiments showed that the quick sort (SortLib.quick_sort_array(array, order)), merge sort, and heap sort are nearly three times faster than the conventional sort method of javascript.
The only surprising thing of the experiments was the time efficiency of the bucket sort algorithm. 
# Bugs and tips
If you have any well-meaning critique or have noticed any bug you may send me an email on exel_mmm@abv.bg or to euriklis@hotmail.bg
# License   
MIT License. This package will be provided for free to any user that use it for personal and non commercial usage. The author of the package is not liable for any errors in third party software, libraries, packages and source code used at these libraries. The author also may not responsible for some possible bugs that may exists in the library.
# Dependencies
The project has one dependency that is the @euriklis/validator package.
# Tests
Tests may be run by executing of
```sh
npx @euriklis/tests-for-sortlib
```
