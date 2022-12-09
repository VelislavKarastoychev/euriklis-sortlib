'use strict';
/**
 * 
 * @param {Array} array 
 * @param {boolean} mode
 * @returns {{array : Array.<number | string>, indices : Array.<number | string>}} 
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
function mergeSort(array, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    const n = array.length
    let condition, i, j, k, l, p, s, t, w, v, x,
        sorted_array = [], sorted_indices = [],
        copied_array = [], copied_indices = []
    // copy the array
    for (i = 0; i < n >> 2; i++) {
        copied_array[i << 2] = array[i << 2]
        copied_indices[i << 2] = i << 2
        copied_array[(i << 2) + 1] = array[(i << 2) + 1]
        copied_indices[(i << 2) + 1] = (i << 2) + 1
        copied_array[(i << 2) + 2] = array[(i << 2) + 2]
        copied_indices[(i << 2) + 2] = (i << 2) + 2
        copied_array[(i << 2) + 3] = array[(i << 2) + 3]
        copied_indices[(i << 2) + 3] = (i << 2) + 3
    }
    if (n % 4 >= 1) {
        copied_array[n - 1] = array[n - 1]
        copied_indices[n - 1] = n - 1
    }
    if (n % 4 >= 2) {
        copied_array[n - 2] = array[n - 2]
        copied_indices[n - 2] = n - 2
    }
    if (n % 4 >= 3) {
        copied_array[n - 3] = array[n - 3]
        copied_indices[n - 3] = n - 3
    }
    k = 1
    while (k < n) {
        p = (((n / k) >> 0) + ((n % k) ? 1 : 0))
        for (s = 0; s < p >> 1; s++) {
            w = (s << 1) * k
            v = ((s << 1) + 1) * k
            t = ((s + 1) << 1) * k >= n ? n : ((s + 1) << 1) * k
            i = w
            j = v
            l = w
            while (i < v && j < t) {
                condition = mode ? copied_array[i] < copied_array[j] : copied_array[i] > copied_array[j]
                if (condition) {
                    sorted_array[l] = copied_array[i]
                    sorted_indices[l] = copied_indices[i]
                    ++i
                }
                else {
                    sorted_array[l] = copied_array[j]
                    sorted_indices[l] = copied_indices[j]
                    ++j
                }
                ++l
            }
            if (i >= v) {
                for (x = j; x < t; x++) {
                    sorted_array[l + x - j] = copied_array[x]
                    sorted_indices[l + x - j] = copied_indices[x]
                }
            }
            if (j >= t) {
                for (x = i; x < v; x++) {
                    sorted_array[l + x - i] = copied_array[x]
                    sorted_indices[l + x - i] = copied_indices[x]
                }
            }
        }
        if (k === 1 && (n & 1)) {
            sorted_array[n - 1] = copied_array[n - 1]
            sorted_indices[n - 1] = copied_indices[n - 1]
        }
        // copy the sort_indices into the copied indices...
        for (i = 0; i < n >> 2; i++) {
            copied_array[i << 2] = sorted_array[i << 2]
            copied_indices[i << 2] = sorted_indices[i << 2]
            copied_array[(i << 2) + 1] = sorted_array[(i << 2) + 1]
            copied_indices[(i << 2) + 1] = sorted_indices[(i << 2) + 1]
            copied_array[(i << 2) + 2] = sorted_array[(i << 2) + 2]
            copied_indices[(i << 2) + 2] = sorted_indices[(i << 2) + 2]
            copied_array[(i << 2) + 3] = sorted_array[(i << 2) + 3]
            copied_indices[(i << 2) + 3] = sorted_indices[(i << 2) + 3]
        }
        if (n % 4 >= 1) {
            copied_array[n - 1] = sorted_array[n - 1]
            copied_indices[n - 1] = sorted_indices[n - 1]
        }
        if (n % 4 >= 2) {
            copied_array[n - 2] = sorted_array[n - 2]
            copied_indices[n - 2] = sorted_indices[n - 2]
        }
        if (n % 4 >= 3) {
            copied_array[n - 3] = sorted_array[n - 3]
            copied_indices[n - 3] = sorted_indices[n - 3]
        }
        k <<= 1
    }
    return { array: sorted_array, indices: sorted_indices }
}
export default mergeSort;