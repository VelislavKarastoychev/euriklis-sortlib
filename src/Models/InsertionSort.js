'use strict';
/**
 * 
 * @param {Array.<number | string>} array 
 * @param {boolean} ascending_order 
 * @returns {array: Array.<number | string>, indices: Array.<number>}
 */
function InsertionSort(array, ascending_order) {
    if (typeof ascending_order === 'undefined') ascending_order = true
    if (ascending_order === 'decrease') ascending_order = false
    const n = array.length
    let i, j, sorted_array = [], p, k, condition, sorted_indices = [];
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        sorted_array[j] = array[j];
        sorted_indices[j] = j;
        ++j;
        sorted_array[j] = array[j];
        sorted_indices[j] = j;
        ++j;
        sorted_array[j] = array[j];
        sorted_indices[j] = j;
        ++j;
        sorted_array[j] = array[j];
        sorted_indices[j] = j;
    }
    if (n % 4 >= 1) {
        j = n - 1;
        sorted_array[j] = array[j];
        sorted_indices[j] = j;
    }
    if (n % 4 >= 2) {
        j = n - 2;
        sorted_array[j] = array[j];
        sorted_indices[j] = j;
    }
    if (n % 4 >= 3) {
        j = n - 3;
        sorted_array[j] = array[j];
        sorted_indices[j] = j;
    }
    for (i = 1; i < n; i++) {
        p = sorted_array[i];
        k = sorted_indices[i];
        j = i - 1;
        while (1) {
            condition = ascending_order ? sorted_array[j] <= p : sorted_array[j] >= p;
            if (j < 0 || condition) break;
            sorted_array[j + 1] = sorted_array[j];
            sorted_indices[j + 1] = sorted_indices[j];
            --j;
        }
        sorted_array[j + 1] = p;
        sorted_indices[j + 1] = k;
    }
    return { array: sorted_array, indices: sorted_indices };
}
export default InsertionSort