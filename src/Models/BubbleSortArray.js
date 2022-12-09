'use strict';
/**
 * 
 * @method bubble_sort
 * @param {Array} array 
 * @param {boolean | 'decrease' | 'increase'} ascending_order
 * @returns {Array.<number | string>}
 * @description this utility function function
 * implements the bubble sort algorithm for the
 * sorting of an array.  
 */
function bubble_sort(array, ascending_order) {
    let sorted_array = [], condition,
        i, j, n = array.length, temp
    if (typeof ascending_order === 'undefined') ascending_order = true
    if (ascending_order === 'decrease') ascending_order = false
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        sorted_array[j] = array[j];
        sorted_array[j + 1] = array[j + 1];
        sorted_array[j + 2] = array[j + 2];
        sorted_array[j + 3] = array[j + 3];
    }
    if (n % 4 >= 3) {
        sorted_array[n - 3] = array[n - 3];
    }
    if (n % 4 >= 2) {
        sorted_array[n - 2] = array[n - 2];
    }
    if (n % 4 >= 1) {
        sorted_array[n - 1] = array[n - 1];
    }
    for (i = 0; i < n; i++) {
        for (j = 0; j < n - 1; j++) {
            if (ascending_order) condition = sorted_array[j + 1] > sorted_array[j]
            else condition = sorted_array[j + 1] < sorted_array[j]
            if (!condition) {
                temp = sorted_array[j]
                sorted_array[j] = sorted_array[j + 1]
                sorted_array[j + 1] = temp
            }
        }
    }
    return sorted_array
}
export default bubble_sort;