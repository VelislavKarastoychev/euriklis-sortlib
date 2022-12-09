'use strict';
/**
 * 
 * @param {Array.<number | string>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array : Array.<number | string>, indices : Array.<number>}} 
 * @description this is an utility function that implements the
 * selection sort algorithm.
 */
 function selection_sort(array, mode) {
    if (mode === 'decrease') mode = false
    if (typeof mode === 'undefined') mode = true
    const n = array.length
    let i, j, m, condition, temp,
        sorted_array = [],
        sorted_indices = []
    for (i = 0;i < n >> 2;i++) {
        j = i << 2;
        sorted_array[j] = array[j];
        sorted_indices[j] = j;
        sorted_array[j + 1] = array[j + 1];
        sorted_indices[j + 1] = j + 1;
        sorted_array[j + 2] = array[j + 2];
        sorted_indices[j + 2] = j + 2;
        sorted_array[j + 3] = array[j + 3];
        sorted_indices[j + 3] = j + 3;
    }
    if (n % 4 >= 3) {
        sorted_array[n - 3] = array[n - 3];
        sorted_indices[n - 3] = n - 3;
    }
    if (n % 4 >= 2) {
        sorted_array[n - 2] = array[n - 2];
        sorted_indices[n - 2] = n - 2;
    } 
    if (n % 4 >= 1) {
        sorted_array[n - 1] = array[n - 1];
        sorted_indices[n - 1] = n - 1;
    }
    for (i = 0; i < n - 1; i++) {
        m = i
        for (j = i + 1; j < n; j++) {
            condition = mode ? sorted_array[j] < sorted_array[m] : sorted_array[j] > sorted_array[m]
            if (condition) m = j
        }
        if (m !== i) {
            temp = sorted_array[m]
            sorted_array[m] = sorted_array[i]
            sorted_array[i] = temp
            temp = sorted_indices[m]
            sorted_indices[m] = sorted_indices[i]
            sorted_indices[i] = temp
        }
    }
    return { array: sorted_array, indices: sorted_indices }
}
export default selection_sort;