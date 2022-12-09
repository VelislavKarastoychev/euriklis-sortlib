'use strict';
/**
 * 
 * @param {Array.<number | string>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array : Array.<number | string>, indices : Array.<number>}}
 * @description this utility function implements
 * the cocktail sorting algorithm that is a variant
 * of the bubble sort algorithm. Note that this algorithm
 * is not fast (has complexity proportional to O(n^2)).
 */
function cocktail_sort(array, mode) {
    let n = array.length, sorted_array = [],
        sorted_indices = []
    let i, j, start, end, condition, temp, swapped = true
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    for (i = 0; i < n >> 2; i++) {
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
    start = 0
    end = n - 1
    while (swapped) {
        swapped = false
        for (i = start; i < end; i++) {
            condition = mode ? sorted_array[i] > sorted_array[i + 1] : sorted_array[i] < sorted_array[i + 1]
            if (condition) {
                temp = sorted_array[i]
                sorted_array[i] = sorted_array[i + 1]
                sorted_array[i + 1] = temp
                temp = sorted_indices[i]
                sorted_indices[i] = sorted_indices[i + 1]
                sorted_indices[i + 1] = temp
                swapped = true
            }
        }
        if (!swapped) break
        swapped = false
        --end
        for (i = end - 1; i > start - 1; i--) {
            condition = mode ? sorted_array[i] > sorted_array[i + 1] : sorted_array[i] < sorted_array[i + 1]
            if (condition) {
                temp = sorted_array[i]
                sorted_array[i] = sorted_array[i + 1]
                sorted_array[i + 1] = temp
                temp = sorted_indices[i]
                sorted_indices[i] = sorted_indices[i + 1]
                sorted_indices[i + 1] = temp
                swapped = true
            }
        }
        ++start
    }
    return { array: sorted_array, indices: sorted_indices }
}
export default cocktail_sort;