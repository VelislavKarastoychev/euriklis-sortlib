# @euriklis/sortlib documentation: 

To use the SortLib you first have to declare (__import__) it in your project, i.e.

```js
// install the library with 
// npm install @euriklis/sortlib@latest --save
import SortLib from '@euriklis/sortlib';
```
or if you want to use the __require__ method in nodejs:

```js
const SortLib = require("@euriklis/sortlib");
```

The SortLib class provides both static and instance methods for sorting, searching, removing and adding of elements in arrays of numbers/strings as well as in object arrays by given property (key).
The static methods are more fast but the instance methods test the arguments for correct declaration.

To use the instance methods you have to define a SortLib instance, i.e.

```js
import SortLib from '@euriklis/sortlib';
const sl = new SortLib();
// sl.array = [number/string array]
// sl.algorithm = <"quick sort" | "merge sort" | "heap sort" etc.>
// sl.[call the methods of SortLib]
```
To use the static methods you simply have to call them from the SortLib

```js
import SortLib from '@euriklis/sortlib';
const random_array = SortLib.generate_random_array(100);
```
The SortLib package implements the __quick sort__, __merge sort__, __heap sort__, __bucket sort__, __cocktail sort__, __bubble sort__, __selection sort__ and __insertion sort__ algorithms for sorting of numeric/string arrays. Every of those algorithms need two parameters - the array and the sort mode , i.e the order in which you wish to sort the array (increasing or decreasing order). Only the __bucket sort__ requires an additional argument which is the ___buckets___ - an integer smaller than the length of the array. If is not defined then the method set it automatically.
We categorize the methods in three categories - fast, semi-fast and slow sorting algorithms. In the category of fast algorithms belong the methods quick sort, merge sort and heap sort. In the semi - fast group we put the algorithms bucket sort and cocktail sort which are efficiently fast when we require only array sorting without output of the indices. In the last group we put the slow algorithms which are the selection sort, the bubble sort and the insertion sort.
1. Quick sort algorithm:

To call the quick sort as static method write:
```js
SortLib.quick_sort(array, mode); // returns {array, indices}
```
or if you want to sort only the array without the indices: 

```js
SortLib.quick_sort_array(array, mode);
```
Example:

```js
import SortLib from '@euriklis/sortlib'
const array = SortLib.generate_random_array(100);
const mode = true;// or 'increase'. However if you want
// to sort the array in decreasing order set the mode
// to be equals to false or 'decrease'.
const sorted = SortLib.quick_sort(array, mode);
console.log(sorted.array);
console.log(sorted.indices);
``` 
To call the quick sort with the instance method you have to declare a SortLib instance and after the setting of the parameters to call the method.

Example: 

```js
const array = SortLib.generate_random_array(100);
const sl = new SortLib();
sl.array = array;
/** 
 * set the mode. If the mode
 * is not set then by default
 * will be assumed to be equals
 * to true or 'increase'
*/
sl.sort_mode = 'decrease'; 
sl.algorithm = 'quick sort';
// see if sorting algorithm was applied
// on this array:
console.log(sl.status); // 'unsorted'
sl.sort();
console.log(sl) // nothing because all
// the properties are private! So you
// have to call the property which you are
// interested to see:
console.log(sl.array);
console.log(sl.indices);
// see if the array is sorted
console.log(sl.status); // 'sorted'
```
For versions 3.x.x is possible to use the quick sort algorithm as a static method only getting the sorted array without the indices. It makes the execution of the algorithm more efficient with respect to the time.

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its,
    sorted_with_qs,
    sorted_with_js_sort,
    average_time_qs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_qs = SortLib.quick_sort_array(random_array, true);
    dt2 = performance.now(); // or Date.now();
    average_time_qs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_qs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with quick sort for ${average_time_qs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```
output:

```
=>
sorted with quick sort for 0.18377225545406345 seconds.
sorted with js sort for 0.8228233136510849 seconds.
```
From version 4.0.0 you can use this method in asynchronous mode, i.e.
```js
import SortLib from '@euriklis/sortlib';
const  get_sorted_array = async (array) => {
    const result = SortLib.quick_sort_array_async(array);
    // !important. This method returns also
    // the time spent for the sorting of the array with the
    // quick sort algorithm. To get the time execution
    // of the method just type:
    // const time_execution = result.time_execution.
    return result.array; 
} 
```
If you want, you also may use the asynchronous mode for the integrated quick sort method:
```js
...
const result = await SortLib.quick_sort_async(array, sort_mode);
// returns Promise<{array: Array, indices:Array, time_execution: number}>...
```

The quick sort is the fastest algorithm in the package. Our experiments showed that the algorithm is three times faster than the conventional sort() method of the javascript library. To achieve this behavior we used bitwise operations where it is possible and loop splitting techniques. 
 
If you use the ___SortLib.quick_sort()___ (called integrated because returns also the indices of the sorted array), then the time efficiency will be equivalent to that of the conventional sort method of the javascript. Note that the javascript sort method destroys the initial array, where the SortLib (static) methods operate on a copy of the original array and save the initial array.

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its,
    sorted_with_qs,
    sorted_with_js_sort,
    average_time_qs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_qs = SortLib.quick_sort(random_array, true).array;
    dt2 = performance.now(); // or Date.now();
    average_time_qs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_qs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with integrated quick sort for ${average_time_qs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```
output 

```
sorted with integrated quick sort for 0.24525950110435493 seconds.
sorted with js sort for 0.8984885918140408 seconds.
```
or with the instance method:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its, sl,
    sorted_with_qs,
    sorted_with_js_sort,
    average_time_qs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sl = new SortLib();
    sl.algorithm = "merge sort";
    sl.array = random_array;
    sl.sort();
    sorted_with_qs = sl.array;
    dt2 = performance.now(); // or Date.now();
    average_time_qs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_qs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with instance quick sort for ${average_time_qs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```

output

```
sorted with instance quick sort for 0.4499779532861708 seconds.
sorted with js sort for 0.9048643643045425 seconds.
```
2. Merge sort algorithm:

To call the merge sort as static method write:

```js
SortLib.merge_sort(array, mode);
```
or if you wish only the sorted array, then write: 

```js
SortLib.merge_sort_array(array, mode);
```
Example: 

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its,
    sorted_with_ms,
    sorted_with_js_sort,
    average_time_ms = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_ms = SortLib.merge_sort_array(random_array);
    dt2 = performance.now(); // or Date.now();
    average_time_ms += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_ms).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with merge sort for ${average_time_ms} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```
output:

```
=>
sorted with merge sort for 0.26410367085933695 seconds.
sorted with js sort for 0.8500099996423719 seconds.
```

As in the case above with the quick sort, you may require both the sorted array and the indices of the array when the elements are sorted:

```js
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its,
    sorted_with_ms,
    sorted_with_js_sort,
    average_time_ms = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_ms = SortLib.merge_sort(random_array).array;
    dt2 = performance.now(); // or Date.now();
    average_time_ms += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_ms).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with integrated merge sort for ${average_time_ms} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```

output: 

```
=>
sorted with integrated merge sort for 0.3976515864086152 seconds.
sorted with js sort for 0.85968633313179 seconds.
```

The instance method can be used as alternative and in this case the array is tested for correct declaration.

```js
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its, sl,
    sorted_with_ms,
    sorted_with_js_sort,
    average_time_ms = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sl = new SortLib();
    sl.array = random_array;
    sl.algorithm = "merge sort";
    sl.sort_mode = 'increase';
    sl.sort();
    sorted_with_ms = sl.array;
    dt2 = performance.now(); // or Date.now();
    average_time_ms += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_ms).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with instance merge sort for ${average_time_ms} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```

output: 

```
=>
sorted with instance merge sort for 0.4899669378471375 seconds.
sorted with js sort for 0.9878581756925583 seconds.
```
From version ^4.0.0 you may use the merge sort method in asynchronous mode:

```js
const result = SortLib.merge_sort_async(array)
    .then(result => {
        // the result is object with properties
        // { array, indices, time_execution }
        return result;
    }).catch(error => console.log(error));
```

The merge sort method only for the array output has also asynchronous version: 

```js
const result = SortLib.merge_sort_array_async(array, sort_mode)
    .then(result => {
        // returns object with properties { array, time_execution}
        return result;
    })
```
3. Heap sort algorithm:

The static and instance methods are with structure similar to the previous, so we have to write:

```js
SortLib.heap_sort(array, mode);
```
and only for the array: 
```js
SortLib.heap_sort_array(array, mode);
```
 and for the instance method we need to declare the array and to set the algorithm and the mode property.
 ```js
 const sl = new SortLib();
 sl.array = some_array;
 sl.algorithm = "heap sort";
 sl.sort_mode = true;// or false or "increase" or "decrease"
 sl.sort();
 ```
 Example:

 ```js
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its,
    sorted_with_hs,
    sorted_with_js_sort,
    average_time_hs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_hs = SortLib.heap_sort_array(random_array);
    dt2 = performance.now(); // or Date.now();
    average_time_hs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_hs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with heap sort for ${average_time_hs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
 ```

 output

 ```
 =>
sorted with heap sort for 0.2201861771392823 seconds.
sorted with js sort for 0.8171291376829152 seconds.
 ```

 and with the integrated heap sort method:

```js
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its,
    sorted_with_hs,
    sorted_with_js_sort,
    average_time_hs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_hs = SortLib.heap_sort(random_array).array;
    dt2 = performance.now(); // or Date.now();
    average_time_hs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_hs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with integrated heap sort for ${average_time_hs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```

output:

 ```
=>
sorted with integrated heap sort for 0.3770429222536088 seconds.
sorted with js sort for 0.9659383380603788 seconds.
 ```
in the instance mode we have:

```js
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its, sl,
    sorted_with_hs,
    sorted_with_js_sort,
    average_time_hs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sl = new SortLib();
    sl.array = random_array;
    sl.algorithm = "heap sort";
    sl.sort_mode = 'increase';
    sl.sort();
    sorted_with_hs = sl.array;
    dt2 = performance.now(); // or Date.now();
    average_time_hs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_hs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with instance heap sort for ${average_time_hs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```

output:

 ```
sorted with instance heap sort for 0.3984684118604663 seconds.
sorted with js sort for 0.9388659856557845 seconds.
 ```
 From version 4.0.0 are available asynchronous mode versions for the **heap_sort()** and **heap_sort_array()** static methods.

 ```js
 const integrated = SortLib.heap_sort_async(array, sort_mode)
     .then(result => {
        // returns {array, indices, time_execution}
        return result;
     })
// or for the array only method...
const result = SortLib.heap_sort_array_async(array, sort_mode)
    .then(output => {
        // {array, time_execution}
        return output;
    })
 ```

4. Bucket sort algorithm:

The bucket sort algorithm is not fast, but when we use the bucket_sort_array method this method is efficient like the conventional sort method.

To use the bucket sort with the static method you have to write:

```js
SortLib.bucket_sort(array, mode);
```
or only for the sorted array:

```js
SortLib.bucket_sort_array(array, mode);
```

Example:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its,
    sorted_with_bs,
    sorted_with_js_sort,
    average_time_bs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_bs = SortLib.bucket_sort_array(random_array, true);
    dt2 = performance.now(); // or Date.now();
    average_time_bs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_bs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with bucket sort for ${average_time_bs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```

output:

```
=>
sorted with bucket sort for 0.5709628416681289 seconds.
sorted with js sort for 0.9884584129524234 seconds.
```

but the integrated bucket sort method is slower than the conventional js sort method.

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its,
    sorted_with_bs,
    sorted_with_js_sort,
    average_time_bs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_bs = SortLib.bucket_sort(random_array, true).array;
    dt2 = performance.now(); // or Date.now();
    average_time_bs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_bs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the integrated bucket sort for ${average_time_bs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```

output:

```
sorted with the integrated bucket sort for 1.1637805856418608 seconds.
sorted with js sort for 1.1352241854238512 seconds.
```

To use the bucket sort with the instance method, just set the algorithm property to "bucket sort". 

Example:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 1000000;
let dt1, dt2, random_array, its, sl,
    sorted_with_bs,
    sorted_with_js_sort,
    average_time_bs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sl = new SortLib();
    sl.algorithm = "bucket sort";
    sl.array = random_array;
    sl.sort_mode = "increase";
    sl.sort();
    sorted_with_bs = sl.array;
    dt2 = performance.now(); // or Date.now();
    average_time_bs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_bs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the instance bucket sort for ${average_time_bs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));
```

output:

```
sorted with the instance bucket sort for 1.1637805856418608 seconds.
sorted with js sort for 1.1352241854238512 seconds.
```

From version 4.0.0 asynchronous version for the bucket sort algorithm are available for the integrated and array mode:

```js
const integrated = SortLib.bucket_sort_async(array, sort_mode)
    .then(result => {
        // returns { array, indices, time_execution }
        return result;
    })
// if you want to get only the array you may use the method:
const result = SortLib.bucket_sort_array_async(array, sort_mode)
    .then(output => {
        // returns { array, time_execution }
        return output;
    })
```

5. Cocktail sort algorithm: 

The cocktail sort belongs to the group of the semi - fast but slow and asymptotically non efficient algorithms.

The static and instance methods for the cocktail sort algorithm follow the same structure as the other algorithms. So to use the static method you have to write:

```js
SortLib.cocktail_sort(array, mode); // returns {array, mode}
```
or only for the sorted array:

```js
SortLib.cocktail_sort_array(array, mode);
```

Example:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its,
    sorted_with_cs,
    sorted_with_js_sort,
    average_time_cs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_cs = SortLib.cocktail_sort_array(random_array, true);
    dt2 = performance.now(); // or Date.now();
    average_time_cs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_cs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the cocktail sort for ${average_time_cs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```

output: 

```
sorted with the cocktail sort for 0.16466441853523264 seconds.
sorted with js sort for 0.0037148646163940413 seconds.
```

The instance method respectively may be used with setting of algorithm property to "cocktail sort", i.e.

```js
import SortLib from '@euriklis/sortlib';
const sl = new SortLib();
sl.array = your_array;
sl.algorithm = "cocktail sort";
sl.sort_mode = true; // or "increase" or false, respectively "decrease".
sl.sort();
```
Example:

```js
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its, sl,
    sorted_with_cs,
    sorted_with_js_sort,
    average_time_cs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sl = new SortLib();
    sl.array = random_array;
    sl.algorithm = 'cocktail sort';
    sl.sort_mode = true;
    sl.sort();
    sorted_with_cs = sl.array;
    dt2 = performance.now(); // or Date.now();
    average_time_cs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_cs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the instance cocktail sort for ${average_time_cs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () =>
```
output:

```
sorted with the instance cocktail sort for 0.16240386292457568 seconds.
sorted with js sort for 0.0035355447959899908 seconds.
```

From version 4.0.0 you may use these methods in asynchronous mode:

```js
const integrated_cocktail_sort = SortLib.cocktail_sort_async(array, sort_mode)
    .then(result => {
        // returns { array, indices, time_execution }
        return result;
    })
// or if you wish to get only the array then you may use:
const cocktail_sort = SortLib.cocktail_sort_array_async(array, sort_mode)
    .then(output => {
        // returns { array, time_execution }
        return output;
    })
```

6. Selection sort.

The selection sort is inefficient sorting algorithm for medium and large arrays.


To call the selection sort with the static method you have to write:

```js
SortLib.selection_sort(array, sort_mode); // returns {array, indices}
```
or if you want to get only the sorted array:

```js
SortLib.selection_sort_array(array, sort_mode);
```

Example: 

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its,
    sorted_with_ss,
    sorted_with_js_sort,
    average_tim_ss = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_ss = SortLib.selection_sort_array(random_array, true);
    dt2 = performance.now(); // or Date.now();
    average_tim_ss += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = random_array.sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_ss).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the selection sort for ${average_tim_ss} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```

output:

```
sorted with the selection sort for 0.10220822831153868 seconds.
sorted with js sort for 0.0034612230920791623 seconds.
```

or for the integrated selection sort:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its,
    sorted_with_ss,
    sorted_with_js_sort,
    average_tim_ss = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_ss = SortLib.selection_sort(random_array, true).array
    dt2 = performance.now(); // or Date.now();
    average_tim_ss += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = [...random_array].sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_ss).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the integrated selection sort for ${average_tim_ss} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```

output

```
sorted with the integrated selection sort for 0.1070611577796936 seconds.
sorted with js sort for 0.0035141040372848524 seconds.
```

The instance method can be used when the algorithm property is set to "selection sort".

```js
import SortLib from "@euriklis/sortlib";
const sl = new SortLib();
sl.array = your_array;
sl.sort_mode = true;
sl.algorithm = "selection sort";
sl.sort(); // the array is sorted with selection sort
```
Example:

```js
import SortLib from '@euriklis/sortlib'
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its, sl,
    sorted_with_ss,
    sorted_with_js_sort,
    average_tim_ss = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sl = new SortLib();
    sl.array = random_array;
    sl.algorithm = "selection sort";
    sl.sort_mode = true;
    sl.sort();
    sorted_with_ss = sl.array;
    dt2 = performance.now(); // or Date.now();
    average_tim_ss += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = [...random_array].sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_ss).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the instance selection sort for ${average_tim_ss} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```
output:

```
sorted with the instance selection sort for 0.10490612853050234 seconds.
sorted with js sort for 0.003398091759681702 seconds.
```
From version 4.0.0 you may use also the asynchronous mode of that methods:

```js
const integrated_selection = SortLib.selection_sort_async(array, sort_mode)
    .then(result => {
        // returns { array, indices, time_execution }
        return result;
    })
// or if you wish to get only the sorted array, then use:
const selection_sort = SortLib.selection_sort_array_async(array, sort_mode)
    .then(output => {
        // returns { array, time_execution }
        return output;
    })
```

7. Insertion sort - the insertion sort is inefficient sorting algorithm, which sometimes is used in other more efficient algorithms, like bucket sort or even quick sort. In our library we use the insertion sort only in the bucket sort.

The syntax for the static methods is similar to the other sorting methods, namely, for the integrated insertion sort method you have to write:

```js
SortLib.insertion_sort(array, sort_mode); // returns {array, indices}
```

and if you are interested only for the sorted array, you have to use the method

```js
SortLib.insertion_sort_array(array, sort_mode);
```
Example:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its,
    sorted_with_is,
    sorted_with_js_sort,
    average_time_is = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_is = SortLib.insertion_sort_array(random_array, true);
    dt2 = performance.now(); // or Date.now();
    average_time_is += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = [...random_array].sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_is).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the insertion sort for ${average_time_is} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```
output: 

```
sorted with the insertion sort for 0.44934043471813206 seconds.
sorted with js sort for 0.0036166631269454975 seconds.
```

For the integrated method we have:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its,
    sorted_with_is,
    sorted_with_js_sort,
    average_time_is = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_is = SortLib.insertion_sort(random_array, true).array;
    dt2 = performance.now(); // or Date.now();
    average_time_is += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = [...random_array].sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_is).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the integrated insertion sort for ${average_time_is} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```

output: 

```
sorted with the integrated insertion sort for 0.49577418472766865 seconds.
sorted with js sort for 0.003324933404922484 seconds.
```

To use the insertion sort like instance method just set the algorithm property to "insertion sort" and run the sort() method as above.

Example:

```js
'use strict'
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its, sl,
    sorted_with_is,
    sorted_with_js_sort,
    average_time_is = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sl = new SortLib();
    sl.array = random_array;
    sl.sort_mode = true;
    sl.algorithm = "insertion sort";
    sl.sort();
    sorted_with_is = sl.array;
    dt2 = performance.now(); // or Date.now();
    average_time_is += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = [...random_array].sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_is).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the instance insertion sort for ${average_time_is} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```

output: 

```
sorted with the instance insertion sort for 0.49409857907772065 seconds.
sorted with js sort for 0.0037493426752090455 seconds.
```

From version 4.0.0 you may use also the asynchronous mode of the methods:

```js
const integrated_IS = SortLib.insertion_sort_async(array, sort_mode)
    .then(result => {
        // returns {array, indices, time_execution}
        return result;
    })
// or if you want to obtain only the sorted array, then you have to use:
const insertion_sort = SortLib.insertion_sort_async(array, sort_mode)
    .then(output => {
        // returns { array, time_execution }
        return output;
    })
```

8. Bubble sort algorithm.

The bubble sort is also inefficient sorting algorithm, but for small arrays it is commonly used like the insertion sort, because it is very simple for implementation. Some sorting routines use the bubble sort when implement the quick sort, merge sort and bucket sort. In our library we prefer the insertion sort algorithm. Our selection was made randomly without some mathematical arguments. We was suggested for the insertion sort choice from the book of Manolis Lukakis.

The static methods which apply the bubble sort are the following:

```js
SortLib.bubble_sort(array, sort_mode); // returns {array, indices}
```
and for the sorted array only, you may use

```js
SortLib.bubble_sort_array(array, sort_mode);
```

Example: 

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its,
    sorted_with_bs,
    sorted_with_js_sort,
    average_time_bs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_bs = SortLib.bubble_sort_array(random_array, true);
    dt2 = performance.now(); // or Date.now();
    average_time_bs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = [...random_array].sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_bs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the bubble sort for ${average_time_bs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```
output: 

```
sorted with the bubble sort for 0.3216669359636304 seconds.
sorted with js sort for 0.0036090421962738047 seconds.
```
and for the integrated bubble sort method/algorithm:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its,
    sorted_with_bs,
    sorted_with_js_sort,
    average_time_bs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sorted_with_bs = SortLib.bubble_sort(random_array, true).array;
    dt2 = performance.now(); // or Date.now();
    average_time_bs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = [...random_array].sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_bs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the bubble sort for ${average_time_bs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```
output: 

```
sorted with the bubble sort for 0.40432516529083246 seconds.
sorted with js sort for 0.0042432585811615 seconds.
```

The method can be called from SortLib instance, when the algorithm property is set to "bubble sort".

Example: 

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const iterations = 100, len = 10000;
let dt1, dt2, random_array, its, sl,
    sorted_with_bs,
    sorted_with_js_sort,
    average_time_bs = 0,
    average_time_js_sort = 0;
for (its = 0; its < iterations; its++) {
    random_array = SortLib.generate_random_array(len);
    dt1 = performance.now(); // or Date.now();
    sl = new SortLib();
    sl.array = random_array;
    sl.sort_mode = "increase";
    sl.algorithm = "bubble sort";
    sl.sort();
    sorted_with_bs = sl.array;
    dt2 = performance.now(); // or Date.now();
    average_time_bs += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_with_js_sort = [...random_array].sort((a, b) => a - b);
    dt2 = performance.now();
    average_time_js_sort += 0.001 * (dt2 - dt1) / iterations;
}
// check if the sorted_arrays are equals.
new validator(sorted_with_bs).is_same(sorted_with_js_sort)
    .on(true, () => {
        console.log(`sorted with the instance bubble sort for ${average_time_bs} seconds.`);
        console.log(`sorted with js sort for ${average_time_js_sort} seconds.`);
    }).on(false, () => console.log('Something went wrong.'));   
```
output: 

```
sorted with the instance bubble sort for 0.4207113573551179 seconds.
sorted with js sort for 0.004196393752098084 seconds.
```

From version 4.0.0 you also may use the asynchronous mode of these methods:

```js
const integrated_bubble_sort = SortLib.bubble_sort_async(array, sort_mode)
    .then(result => {
        // returns { array, indices, time_execution }
        return result;
    })
// or if you want to obtain only the sorted array then you may use:
const bubble_sort = SortLib.bubble_sort_array_async(array, sort_mode)
    .then(output => {
        // returns { array, time_execution }
        return output;
    })
```

The SortLib package provides also a set of utility methods which may be used for sorting of object arrays by given property, where this property is number or string. Some of these methods are:

9. Adding element in sorted array:

```js
SortLib.add_elements_in_sorted_array(array, element, sort_mode); // returns a SortLib instance.
```
This method uses the bisection method to find the correct place / position of the element in the array object. The sort mode is also needed to be inserted. The method does not tests if the array is already sorted, so you have to be sure that this array is really sorted. If the sort mode is not set to true/"increase" or false / "decrease", then the method set it to true by default. The method tests if the array is number or string array and if the element is string or number. Also this method generates indices property.

Example: 

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
let i, iterations = 100, count = 1000000,
    element, dt1, dt2,
    array, extended_array1,
    extended_array2, average_by_bisection = 0, average_by_sort = 0;
for (i = 0; i < iterations; i++) {
    array = SortLib.generate_random_array(count);
    array = SortLib.quick_sort_array(array, true);
    element = 0.5;
    extended_array2 = [...array];
    dt1 = performance.now();
    extended_array1 = SortLib.add_element_in_sorted_array(array, element, true).array;
    dt2 = performance.now();
    average_by_bisection += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();

    extended_array2.push(element)
    extended_array2.sort((a, b) => a - b);
    dt2 = performance.now();
    average_by_sort += 0.001 * (dt2 - dt1) / iterations;
}
new validator(extended_array1).is_same(extended_array2)
    .on(true, () => console.log(`average time of SortLib.add --> ${average_by_bisection} vs average time conventional sort ${average_by_sort}`))
    .on(false, () => console.log('Something went wrong!!!'));
```

output: 

```
average time of SortLib.add --> 0.12212278446197508 vs 
average time conventional sort 0.09989086256027223
```
From version 4.0.0 this method may be used also in asynchronous mode:

```js
SortLib.add_elements_in_sorted_array_async(array, element, sort_mode);
```
Note that in this case the method returns a Promise instance.

10. Add element in sorted object array by some property. 

To add an element in array of objects,sorted by some property, you may use the static method
```js
SortLib.add_element_in_sorted_object_array_by_property(array, property, element, mode, test_array);
```
The method gets five parameters (arguments). The first one is the "array" of objects, the second is the "property" - a string array which represents the depth of the object property. The third parameter is the element which has to be added to the array. The element will be tested from the method for correct structure. The forth parameter of the method is the mode - increasing or decreasing order of elements. The final fifth argument is the "test_array" parameter which has to be a boolean parameter and if is true, then the array will be checked for correctly declared structure accordingly to the property parameter. Otherwise no tests will be made. 
Example:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
let i, iterations = 100, count = 1000000,
    element, dt1, dt2,
    array, extended_array1,
    extended_array2, average_by_bisection = 0, average_by_sort = 0;
for (i = 0; i < iterations; i++) {
    array = SortLib.generate_random_array(count, null, element => {
        return { attributes: {value: element} };
    });
    array = SortLib.sort_object_array_by_property(array, ['attributes', 'value']).array;
    element = { attributes: { value: 0.5 } };
    extended_array2 = [...array];
    dt1 = performance.now();
    extended_array1 = SortLib.add_element_in_sorted_object_array_by_property(array, ['attributes', 'value'], element, true);
    dt2 = performance.now();
    average_by_bisection += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    extended_array2.push(element)
    extended_array2.sort((a, b) => a.attributes.value - b.attributes.value);
    dt2 = performance.now();
    average_by_sort += 0.001 * (dt2 - dt1) / iterations;
}
new validator(extended_array1).is_same(extended_array2)
    .on(true, () => console.log(`average time of SortLib.add --> ${average_by_bisection} vs average time conventional sort ${average_by_sort}`))
    .on(false, () => console.log('Something went wrong!!!'));
```
output: 

```
average time of SortLib.add --> 0.2693589860153199 vs 
average time conventional sort 0.3231743433189391
```

If the sort_array parameter is set to true, then the array will be tested for correctly defined structure, which will slow down the method execution.

From version 4.0.0 this method is also available in asynchronous mode:

```js
SortLib.add_element_in_sorted_object_array_by_property_async(array, property, element, sort_mode);
```
The arguments of the methods are the same as in the synchronous mode but in the asynchronous mode the static method returns a Promise instance.

11. Find elements in sorted array. 

If you want to extract only the values of the array which are equals to some value (with the indices), then you may use the static method of the SortLib package:

```js
SortLib.find_elements_in_sorted_array(array, element, mode);
```

If in the array does not exist elements which are equal to the element parameter, then the output of the method will be:

```js
{array: [], indices: [-1]}
```

otherwise the method will returns the elements and their indices.

Example:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const count = 1000000, iterations = 100;
let array = SortLib.generate_random_array(count),
    element = array[0],
    i, average_time_find_SL = 0, average_time_find = 0,
    find_SL, find_conventional, dt1, dt2, fe, fi;
array = SortLib.quick_sort_array(array, true);
for (i = 0; i < iterations; i++) {
    dt1 = performance.now();
    find_SL = SortLib.find_elements_in_sorted_array(array, element, true);
    dt2 = performance.now();
    average_time_find_SL += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    // find elements in sorted array
    fe = array.find(item => item === element);
    fi = array.findIndex(item => item === element);
    find_conventional = { array: [fe], indices: [fi] }
    dt2 = performance.now();
    average_time_find += 0.001 * (dt2 - dt1) / iterations;
}
new validator(find_SL).is_same(find_conventional)
    .on(true, () => {
        console.log(`average time of SortLib find element --> ${average_time_find_SL}s`);
        console.log(`average time conventional find ${average_time_find}s`);
    }).on(false, () => console.log(`Something went wrong.`));
```
output:

```
average time of SortLib find element --> 0.002894212322235108s
average time conventional find 0.025960877709388736s
```

From version 4.0.0 this method is available also in asynchronous mode:

```js
SortLib.find_element_in_sorted_array_async(array, element, sort_mode);
```
Note that in this case the method returns a Promise instance.

12. Find elements in sorted object array by some property.

If the user wishes to find some elements in array of objects which are sorted by some property, then the method which has to be used is the static method:

```js
SortLib.find_elements_in_sorted_object_array_by_property(array, element, mode )
```

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const count = 1000000, iterations = 100;
let array = SortLib.generate_random_array(count, null, item => {
    return { attributes: { value: item } };
}),
    element = array[0],
    i, average_time_find_SL = 0, average_time_find = 0,
    find_SL, find_conventional, dt1, dt2, fe, fi;
array = SortLib.sort_object_array_by_property(array, ['attributes', 'value'], true, 'quick sort').array;
for (i = 0; i < iterations; i++) {
    dt1 = performance.now();
    find_SL = SortLib.find_elements_in_sorted_object_array_by_property(array, ['attributes', 'value'], element, true);
    dt2 = performance.now();
    average_time_find_SL += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    // find elements in sorted array
    fe = array.find(item => JSON.stringify(item) === JSON.stringify(element));
    fi = array.findIndex(item => JSON.stringify(item) === JSON.stringify(element));
    find_conventional = { array: [fe], indices: [fi] }
    dt2 = performance.now();
    average_time_find += 0.001 * (dt2 - dt1) / iterations;
}
new validator(find_SL).is_same(find_conventional)
    .on(true, () => {
        console.log(`average time of SortLib find element --> ${average_time_find_SL}s`);
        console.log(`average time conventional find ${average_time_find}s`);
    }).on(false, () => console.log(`Something went wrong.`));
```

output: 

```
average time of SortLib find element --> 0.00010989200592041021s
average time conventional find 3.786335378255842s
```

Note that this method can not be used like instance method, because the SortLib constructor gets only number or string arrays.

From version 4.0.0 this method may be used in asynchronous mode:

```js
SortLib.find_element_in_sorted_object_array_by_property_async(array, property, element, sort_mode);
```

Note that in this case the method returns a Promise instance.

13. Removing of element from sorted array. 

If you wish to delete some element from a sorted array, then the method which has to be used is the:

```js
SortLib.remove_element_from_sorted_array(array, element, order);// returns {array, indices}
```

The method returns array and indices in which the first item and the corresponded to it index that is found to be equals to the element is deleted. An example of how the method may be used is:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const count = 1000000, iterations = 100;
let array = SortLib.generate_random_array(count),
    element = array[0], i, dt1, dt2,
    removed_element_array, filtered_array,
    average_remove = 0, average_filter = 0;
array = SortLib.quick_sort_array(array, true);
for (i = 0; i < iterations; i++) {
    dt1 = performance.now();
    removed_element_array = SortLib.remove_element_from_sorted_array(array, element, true).array;
    dt2 = performance.now();
    average_remove += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    filtered_array = [...array].filter(item => item !== element);
    dt2 = performance.now();
    average_filter += 0.001 * (dt2 - dt1) / iterations;
}
new validator(removed_element_array).is_same(filtered_array)
    .on(true, () => {
        console.log(`average time of remove element with SortLib --> ${average_remove}s`);
        console.log(`average time of remove element with filter --> ${average_filter}s`);
    }).on(false, () => console.log(`Something went wrong!`));
```

output: 

```
average time of remove element with SortLib --> 0.038564315462112427s
average time of remove element with filter --> 0.04613672134399412s
```
The method does not tests if the inserted in it array argument is sorted, or if is number or string array.
The corresponded instance method is the __delete()__ method, so if you wish to remove element from a SortLib instance you have to write:

```js
const sl = new SortLib();
sl.array = some_array;
sl.delete(10);
```
Note that this method sorts the array if is not sorted and stores the indices with the index of the deleted element to be removed.

From version 4.0.0 you may use the asynchronous mode of this method:

```js
SortLib.remove_element_from_sorted_array_async(array, element, sort_mode);
```

It is logical that in this case the method will returns a Promise instance.

14. Remove element from sorted object array by property:

If is given an array of object items, sorted by some of the array properties which is number or string, then in the case in which we want to delete some element of this array (the required element has to be equals to the underlined), then we have to use the static method:

```js
SortLib.remove_element_from_sorted_object_array_by_property(array, property, element, mode);
```

Example:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const count = 1000000, iterations = 100;
let array = SortLib.generate_random_array(count, null, item => {
    return { attributes: { value: item } };
}),
    element = array[0],
    i, average_time_remove = 0, average_time_filter = 0,
    removed_SL, filter, dt1, dt2;
array = SortLib.sort_object_array_by_property(array, ['attributes', 'value'], true, 'quick sort').array;
for (i = 0; i < iterations; i++) {
    dt1 = performance.now();
    removed_SL = SortLib.remove_element_from_sorted_object_array_by_property(array, ['attributes', 'value'], element, true);
    dt2 = performance.now();
    average_time_remove += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    // note that if the filter checks if the both objects are
    // equals, then the method would be slower!
    filter = [...array].filter(item => item.attributes.value !== element.attributes.value)
    dt2 = performance.now();
    average_time_filter += 0.001 * (dt2 - dt1) / iterations;
}
new validator(removed_SL).is_same(filter)
    .on(true, () => {
        console.log(`average time of SortLib remove element from object array --> ${average_time_remove}s`);
        console.log(`average time of conventional filter --> ${average_time_filter}s`);
    }).on(false, () => console.log(`Something went wrong.`));
```

output:

```
average time of SortLib remove element from object array --> 0.21358258719921108s
average time of conventional filter --> 0.43436287065982815s
```
From version 4.0.0 is available asynchronous mode version for this method:

```js
SortLib.removed_element_from_sorted_object_array_by_property_async(array, property, element, sort_mode);
```

Note that in this case the method returns a Promise instance.

15. Generate random array:

The package provides two static methods which generate number or string arrays with random values . However it is possible to create arbitrary arrays with using the callback parameter. The callback gets as parameters the element and the index of the array (automatically).

The syntax of the methods is:

```js
SortLib.generate_random_array(length:integer, seed:integer|null, callback:function(element, index));
SortLib.generate_random_string_array(length:integer, world_size:integer, seed:integer|null, callback:function(item, index));
```

From version 4.0.0 these methods are available also in asynchronous mode:

```js
SortLib.generate_random_array_async(length, seed, callback);
SortLib.generate_random_string_array_async(length, word_size, seed, callback(item, index));
```

In the asynchronous mode the method returns a Promise instance.

16. Find the "best" or "worst" elements in numeric/string array.

The package provides static methods for finding the "best" (greatest) and "worst" (smallest) elements using the heap sort algorithm. The syntax of the methods is:

```js
SortLib.find_best_elements(array, count | percent);
SortLib.find_worst_elements(array, count | percent);
```

An example how to use the methods is:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const count = 1000000, iterations = 100;
let array = SortLib.generate_random_array(count);
let best10, worst10, best10Conventionally, worst10Conventionally,
    average_best_10 = 0, average_best_conventionally = 0,
    average_worst_10 = 0, average_worst_conventionally = 0,
    dt1, dt2, i;
for (i = 0; i < iterations; i++) {
    dt1 = performance.now();
    best10 = SortLib.find_best_elements(array, 10).array;
    dt2 = performance.now();
    average_best_10 += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    worst10 = SortLib.find_worst_elements(array, 10).array;
    dt2 = performance.now();
    average_worst_10 += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    best10Conventionally = [...array].sort((a, b) => b - a).slice(0, 10);
    dt2 = performance.now();
    average_best_conventionally += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    worst10Conventionally = [...array].sort((a, b) => a - b).slice(0, 10);
    dt2 = performance.now();
    average_worst_conventionally += 0.001 * (dt2 - dt1) / iterations;
}
new validator(best10Conventionally).is_same(best10)
    .And.bind(
        new validator(worst10Conventionally).is_same(worst10)
    ).on(true, () => {
        console.log(`Average time best 10 for ${count} elements --> ${average_best_10}s`);
        console.log(`Average time worst 10 for ${count} elements --> ${average_worst_10}s`);
        console.log(`Average time best 10 for conventional extraction --> ${average_best_conventionally}s`);
        console.log(`Average time worst 10 for conventional extraction --> ${average_worst_conventionally}s`);
    }).on(false, () => console.log('Something went wrong...'));
```

output:

```
Average time best 10 for 1000000 elements --> 0.09060412872314454s
Average time worst 10 for 1000000 elements --> 0.09050923328876499s
Average time best 10 for conventional extraction --> 1.1376828888177875s
Average time worst 10 for conventional extraction --> 1.198225995883942s
```

From version 4.0.0 these method are also available in asynchronous mode:

```js
SortLib.find_best_elements_async(array, n);
SortLib.find_worst_elements_async(array, n);
```
In the asynchronous mode the methods return Promise types.


17. Find "best" and "worst" elements from object array by property:

The find best and worst methods are extended also for array of objects. The syntax is similar to the previous static methods:
```js
SortLib.find_best_for_object_array_by_property(array, property, count, test);
// and for the worst elements
SortLib.find_worst_for_object_array_by_property(array, property, count, test);
```
These methods return an object with key values "array" and "indices". The test parameter is a boolean variable which when is set to true checks if the array has correct structure.
If the test is set to true, then the method will be executed very inefficiently.

Example:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const count = 1000000, iterations = 100;
let array = SortLib.generate_random_array(count, null, element => {
    return {
        attributes: {
            value: element
        }
    };
}), i, dt1, dt2, best10, worst10, best10Conventionally, worst10Conventionally,
    average_time_best10 = 0,
    average_time_worst10 = 0,
    average_time_bestConventionally = 0,
    average_time_worstConventionally = 0;
for (i = 0; i < iterations; i++) {
    dt1 = performance.now();
    best10 = SortLib.find_best_for_object_array_by_property(array, ['attributes', 'value'], 10).array;
    dt2 = performance.now();
    average_time_best10 += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    worst10 = SortLib.find_worst_for_object_array_by_property(array, ['attributes', 'value'], 10).array;
    dt2 = performance.now();
    average_time_worst10 += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    best10Conventionally = [...array].sort((a, b) => b.attributes.value - a.attributes.value).slice(0, 10);
    dt2 = performance.now();
    average_time_bestConventionally += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    worst10Conventionally = [...array].sort((a, b) => a.attributes.value - b.attributes.value).slice(0, 10);
    dt2 = performance.now();
    average_time_worstConventionally += 0.001 * (dt2 - dt1) / iterations;
}
new validator(best10).is_same(best10Conventionally)
    .And.bind(
        new validator(worst10).is_same(worst10Conventionally)
    ).on(true, () => {
        console.log(`Results for the tests of time efficiency for arrays of ${count} elements from ${iterations} iterations.`)
        console.log(`Average time best 10 with SortLib: ${average_time_best10}s`);
        console.log(`Average time best 10 conventional way: ${average_time_bestConventionally}s`);
        console.log(`Average time worst 10 with SortLib: ${average_time_worst10}s`);
        console.log(`Average time worst 10 conventional way: ${average_time_worstConventionally}s`)
    }).on(false, () => console.log('Something went wrong!'));
```

output:

```
Results for the tests of time efficiency for arrays of 1000000 elements from 100 iterations.
Average time best 10 with SortLib: 0.24838620031833653s
Average time best 10 conventional way: 2.3365322738838192s
Average time worst 10 with SortLib: 0.3290558718633652s
Average time worst 10 conventional way: 2.41432895591259s
```
From version 4.0.0 are available asynchronous versions of these methods:

```js
SortLib.find_best_for_object_array_by_property_async(array, count);
SortLib.find_worst_for_object_array_by_property_async(array, count);
```

18. Sort array of objects by given number/string property value.

If you have an array of objects and wish to sort it with respect to some number or string property with arbitrary depth, then you have to use the static method:

```js
// returns {array, indices};
SortLib.sort_object_array_by_property(array, property, mode, algorithm, show_warnings, test);
```
The array has to be an object array, the property has to be a string or a string array, depending on the structure of the object, the mode as above is a boolean variable or has to be equals to "increase" or "decrease". The "show_warnings" and "test" method parameters are both boolean variables and by default are set to false. If test is true, then the array will be checked for correct structure.

Example: 

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const count = 1000000, iterations = 100;
let array = SortLib.generate_random_array(count, null, element => {
    return {
        attributes: {
            value: element
        }
    };
}), i, dt1, dt2, sort_sl, sorted_conventionally,
    average_time_sort_sl = 0, average_time_sort_conventionally = 0;
for (i = 0; i < iterations; i++) {
    dt1 = performance.now();
    sort_sl = SortLib.sort_object_array_by_property(array, ['attributes', 'value'], true, 'quick sort').array;
    dt2 = performance.now();
    average_time_sort_sl += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    sorted_conventionally = [...array].sort((a, b) => a.attributes.value - b.attributes.value);
    dt2 = performance.now();
    average_time_sort_conventionally += 0.001 * (dt2 - dt1) / iterations;
}
new validator(sort_sl).is_same(sorted_conventionally)
    .on(true, () => {
        console.log(`Results for the tests of time efficiency for arrays of ${count} elements from ${iterations} iterations.`)
        console.log(`Average time of sort object array by property: ${average_time_sort_sl}s.`);
        console.log(`Average time of sort object array with the conventional way: ${average_time_sort_conventionally}s.`);
    }).on(false, () => console.log('Something went wrong!'));
```

output: 

```
Results for the tests of time efficiency for arrays of 1000000 elements from 100 iterations.
Average time of sort object array by property: 0.6153991694879534s.
Average time of sort object array with the conventional way: 1.7935129843378073s.
```

From version 4.0.0 this method is available also in asynchronous form:

```js
SortLib.sort_object_array_by_property_async(array, property, sort_mode, algorithm);
```

In the asynchronous case the method returns a Promise.

19. Filter the elements of an array using the validator library:

The static method

```js
SortLib.filter_with_validator(array, callback);
```
provides the possibility to select the elements of an array.

Example:

```js
import SortLib from '@euriklis/sortlib';
import validator from '@euriklis/validator';
const count = 10000, iterations = 10,
    array = SortLib.generate_random_array(count);
let filtered_sl, filtered, average_time_fv = 0, average_time_filter = 0, dt1, dt2, i;
for (i = 0; i < iterations; i++) {
    dt1 = performance.now();
    filtered_sl = SortLib.filter_with_validator(array, item => item.is_in_closed_range(0.19, 0.39)).array;
    dt2 = performance.now();
    average_time_fv += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    filtered = [...array].filter(item => item <= 0.39 && item >= 0.19);
    dt2 = performance.now();
    average_time_filter += 0.001 * (dt2 - dt1) / iterations;
}
new validator(filtered).is_same(filtered_sl)
    .on(true, () => {
        console.log(`Average time filter with validator: ${average_time_fv}s.`);
        console.log(`Average time conventional filter: ${average_time_filter}s.`);
    }).on(false, () => console.log(`Something went wrong!`));

```
output: 


```
Average time filter with validator: 8.993777289533616s.
Average time conventional filter: 0.0030568875789642336s.
```
This method is very inefficient!!!

From version 4.0.0 was added an asynchronous version of the method: 

```js
SortLib.filter_with_validator_async(array, callback);
```
The method returns a Promise type.

20. Filter the array with arbitrary callback function.

Because the filter_with_validator static method is very inefficient, we create the method filter, which works in the same way as the conventional javascript filter method but in addition returns also the indices of the initial array. The method is available in static and instance form, so if you wish to filter the array you have to use the following methods:
```js
SortLib.filter(array, callback(item, index, array)); // returns {array, indices}
```
or for instance usage:

```js
const sl = new SortLib();
sl.array = some_array;
sl.filter(callback(item, index, array)); // sets the array and the indices properties.
```
If the callback is not function, then an error message will be thrown. When we use the static method the "array" property will be tested and if is not array also an error message will be thrown.

Example:

```js
import validator from '@euriklis/validator';
const count = 10000, iterations = 10,
    array = SortLib.generate_random_array(count);
let filtered_sl, filtered, average_time_fv = 0, average_time_filter = 0, dt1, dt2, i;
for (i = 0; i < iterations; i++) {
    dt1 = performance.now();
    filtered_sl = SortLib.filter(array, item => item <= 0.39 && item >= 0.19).array;
    dt2 = performance.now();
    average_time_fv += 0.001 * (dt2 - dt1) / iterations;
    dt1 = performance.now();
    filtered = [...array].filter(item => item <= 0.39 && item >= 0.19);
    dt2 = performance.now();
    average_time_filter += 0.001 * (dt2 - dt1) / iterations;
}
new validator(filtered).is_same(filtered_sl)
    .on(true, () => {
        console.log(`Average time filter: ${average_time_fv}s.`);
        console.log(`Average time conventional filter: ${average_time_filter}s.`);
    }).on(false, () => console.log(`Something went wrong!`));

```

output: 

```
Average time filter: 0.0008685545998625457s.
Average time conventional filter: 0.0004637260998599232s.
```
From version 4.0.0 this method is also available in asynchronous mode:

```js
SortLib.filter_async(array, callback)
    .then(result => {
        return result;
    })
```