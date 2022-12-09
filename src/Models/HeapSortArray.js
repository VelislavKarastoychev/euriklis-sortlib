'use strict';
/**
 * 
 * @param {Array} array 
 * @param {boolean | 'decrease' | 'increase'} mode
 * @description this utility function implements the
 * Heap sort algorithm. The function uses the two
 * sub-functions shift_down and heap_shift_down... 
 */
 function heap_sort(array, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    const n = array.length
    let i, j, k, m, t, sorted_array = [], condition
    i = 0
    while (i < (n >> 2)) {
        sorted_array[i << 2] = array[i << 2]
        sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
        sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
        sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        ++i
    }
    if (n % 4 >= 1) {
        sorted_array[n - 1] = array[n - 1]
    }
    if (n % 4 >= 2) {
        sorted_array[n - 2] = array[n - 2]
    }
    if (n % 4 >= 3) {
        sorted_array[n - 3] = array[n - 3]
    }
    // transform the array into heap...
    k = (n - 2) >> 1
    while (k >= 0) {
        // shift down
        j = k
        while ((j << 1) + 1 <= n - 1) {
            m = j
            condition = mode ? sorted_array[m] < sorted_array[(j << 1) + 1] : sorted_array[m] > sorted_array[(j << 1) + 1]
            if (condition) m = (j << 1) + 1
            condition = mode ? sorted_array[m] < sorted_array[(j + 1) << 1] : sorted_array[m] > sorted_array[(j + 1) << 1]
            if ((j + 1) << 1 <= n - 1 && condition) m = (j + 1) << 1
            if (m === j) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[j]
                sorted_array[j] = t
                j = m
            }
        }
        --k
    }
    // sort the array with the heap sort...
    k = n - 1
    while (k > 0) {
        // swap the k and the 0 elements
        t = sorted_array[0]
        sorted_array[0] = sorted_array[k]
        sorted_array[k] = t
        --k
        // shift down the subarray sorted_array[0:k]
        i = 0
        while ((i << 1) + 1 <= k) {
            m = i
            condition = mode ? sorted_array[m] < sorted_array[(i << 1) + 1] : sorted_array[m] > sorted_array[(i << 1) + 1]
            if (condition) m = (i << 1) + 1
            condition = mode ? sorted_array[m] < sorted_array[(i + 1) << 1] : sorted_array[m] > sorted_array[(i + 1) << 1]
            if (((i + 1) << 1) <= k && condition) m = (i + 1) << 1
            if (i === m) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[i]
                sorted_array[i] = t
                i = m
            }
        }
    }
    return sorted_array;
}
export default heap_sort;