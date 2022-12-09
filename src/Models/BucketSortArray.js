import insertion_sort from './InsertionSortArray.js';
'use strict';
/**
 * 
 * @param {Array.<number>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {Array.<number>}
 * @description this utility function implements
 * the bucket sort algorithm. Note that this
 * algorithm is not fast sorting algorithm and
 * has worst complexity of O(n^2) and average
 * time complexity of O(n + n^2 / k + k), where
 * the k is the count of the buckets.
 *  
 */
 function bucket_sort(array, buckets, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    let sorted_array = [], i, j, temp, min,
        temp_array = [], n, max
    for (i = 0; i < buckets; i++) {
        temp_array.push([])
    }
    // find the biggest element of the array.
    max = array[0]
    n = array.length
    for (i = 0; i < n; i++) if (array[i] > max) max = array[i]
    // find the min element:
    min = array[0]
    for (i = 0; i < n; i++) if (array[i] < min) min = array[i]
    // push the arrays into the right sub-array of the temp_array
    for (i = 0; i < n; i++) {
        j = (((array[i] - min) / (max - min)) * (buckets - 1)) | 0
        temp_array[j].push(array[i])
    }
    // sort all the subarrays of the temp and concatenate then to
    // the sorted_array
    for (j = mode ? 0 : buckets - 1; mode ? j < buckets : j >= 0; mode ? j++ : j--) {
        temp = insertion_sort(temp_array[j], mode)
        sorted_array.push(...temp)
    }
    return sorted_array;
}
export default bucket_sort;