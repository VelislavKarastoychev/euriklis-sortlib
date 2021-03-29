'use strict'
/**
 * 
 * @param {Array} array 
 * @param {number} element 
 * @param {boolean} ascending_order
 * @returns {Array} sorted_array
 * @description - this is an utility function
 * for the statistics library of the
 * euriklis package. The function uses the
 * binary searching to detect the correct
 * position of the new element and then puts
 * it to the array. Finally all the elements are
 * shifted because of the new size of the array.
 * The array is copied for more security. 
 */
function PutInSortedArray(array, element, ascending_order) {
    let new_array = [], n = array.length,
        middle, start, end, i, condition
    if (typeof ascending_order === 'undefined') ascending_order = true
    // get the middle of the array:
    // set the start and the end parameters:
    start = 0, end = n - 1
    middle = (start + end) >> 1
    do {
        condition = ascending_order ? element > array[middle] : element < array[middle]
        if (element === array[middle]) break
        else if (start === end && end === middle) break
        else if (condition) end = middle
        else if (!condition) start = middle + 1
        middle = (start + end) >> 1
    } while (1)
    for (i = 0; i < n + 1; i++) new_array[i] = i <= middle ?
        array[i] : i === middle + 1 ? element : array[i - 1]
    return new_array
}
/**
 * 
 * @param {Array} array 
 * @param {boolean} ascending_order
 * @returns {{array : Array, indices : Array}} 
 * @description this is an utility function for the
 * statistics library of the euriklis package. The
 * function implements the merge sort algorithm. We
 * have done some improvements for the more efficient
 * functionality of the algorithm. First we do not use
 * recursion in the algorithm, second we do not use
 * additional arrays to keep the items of the initial
 * array that have to be merged. Third we implement the
 * sorting algorithm directly into the function without
 * calling any additional function. These three things
 * improve the speed and the time efficiency of the algorithm
 * more than two times according to our metrics.
 */
function merge_sort(array, ascending_order) {
    let sorted_array = [...array], // real array
        sorted_indices = array.map((e, i) => i), // real array
        i, j, // real or integer 
        k, l, m, n, s, sub_arrays, // integers
        condition, stop_condition1, stop_condition2 // boolean
    if (typeof ascending_order === 'undefined') ascending_order = true
    // get the length of the array.
    n = sorted_array.length
    // initializations
    k = 1, sub_arrays = Math.ceil(n / k)
    while (sub_arrays !== 1) {
        for (s = 1; s < sub_arrays; s += 2) {
            for (l = 0; l < (s + 1) * k > n ? n - s * k : k; l++) {
                i = 0, j = k - 1, m = (i + j) >> 1
                while (1) {
                    condition = ascending_order ?
                        sorted_array[(s - 1) * k + m] > sorted_array[s * k + l]
                        : sorted_array[(s - 1) * k + m] < sorted_array[s * k + l]
                    stop_condition1 = sorted_array[(s - 1) * k + m] === sorted_array[s * k + l]
                    stop_condition2 = i === m && m === j
                    if (stop_condition1) break
                    else if (stop_condition2) break
                    else if (condition) i = m + 1
                    else j = m
                    m = (i + j) >> 1
                } // swapping...
                for (i = 0; i < k - m; i++) {
                    j = sorted_array[s * k + l]
                    sorted_array[s * k + l] = sorted_array[(s - 1) * k + i + m]
                    sorted_array[(s - 1) * k + i + m] = j
                    j = sorted_indices[s * k + l]
                    sorted_indices[s * k + l] = sorted_indices[(s - 1) * k + i + m]
                    sorted_indices[(s - 1) * k + i + m] = j
                }
            }
        }
        k << 1, sub_arrays = Math.ceil(n / k)
    }
    return { array: sorted_array, indices: sorted_indices }
}
/**
 * 
 * @param {Array} array
 * @param {boolean} ascending_order
 * @returns {Array} sorted_array
 * @description this function is an utility
 * function for the statistics library of the
 * euriklis package. This function sorts the 
 * elements of an unordered array of numbers.
 * The algorithm is structured with the following
 * design.
 * Definition: Rigid (static) point of an arbitrary 
 * array is a point which preserve its position when
 * the array is sorted. 
 * Definition: Turning point of an array is a point that
 * is rigid point and all the elements before this point 
 * are smaller than this point and all the elements after
 * it are higher than this point.
 * Proposition: An array is sorted if every element is turning
 * point. So if a point is a turning point, then
 * it will be stable an do not be changed when the array
 * will be sorted. If an array is sorted, then no changing
 * point will exists, because if such a point exists, then
 * this array will be not sorted.
 * So to construct an algorithm that sorts all the elements
 * of an array we have identify its turning points. In the
 * algorithm that follows we use the term "pivot" as an
 * alternative to the turning point.
 */
function quick_sort(array, ascending_order) {
    let sorted_array = [...array],
        sorted_indices = array.map((e, i) => i)
    return { array: sorted_array, indices: sorted_indices }
}
function bubble_sort(array, ascending_order) {
    let sorted_array = [...array], condition
    i, j, sorted_indices = array.map((e, i) => i),
        n = array.length, temp
    if (typeof ascending_order === 'undefined') ascending_order = true
    for (i = 0; i < n; i++) {
        for (j = 0; j < n - 1; j++) {
            if (ascending_order) condition = sorted_array[j + 1] > sorted_array[j]
            else condition = sorted_array[j + 1] < sorted_array[j]
            if (condition) {
                temp = sorted_array[j]
                sorted_array[j] = sorted_array[j + 1]
                sorted_array[j + 1] = temp
                temp = sorted_indices[j]
                sorted_indices[j] = sorted_indices[j + 1]
                sorted_indices[j + 1] = temp
            }
        }
    }
    return { array: sorted_array, indices: sorted_indices }
}
/**
 * 
 * @param {array} array
 * @param {"merge sort" | "quick sort" | "bubble sort"} method
 * @param {boolean} ascending_order
 * @returns {array} sorted_array
 * @description this function is an utility
 * method for the Statistics library that
 * sorts the array with the merge sort,
 * quick sort algorithms. If the user does not
 * select the method then by default the function
 * selects the 'merge sort' method.
 */
function SortArray(array, method, ascending_order = true) {
    if (method === 'quick sort') sorted_array = quick_sort(array)
    else if (method === 'bubble sort') sorted_array = bubble_sort(array)
    else sorted_array = merge_sort(array)
    return sorted_array
}

module.exports = {
    SortArray,
    PutInSortedArray,
    merge_sort,
    MergeSort: merge_sort,
    Merge_sort: merge_sort,
    quick_sort,
    QuickSort: quick_sort,
    Quick_sort: quick_sort,
}