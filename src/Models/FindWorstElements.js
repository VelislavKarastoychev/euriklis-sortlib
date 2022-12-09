'use strict';
/**
 * 
 * @param {Array.<number | string>} array 
 * @param {number} count - an integer number
 * @returns {{array : Array.<number | string>, indices : Array.<number>}}
 * @description this algorithm finds out the first count worts elements
 * of an array which is contained from number or string elements. The
 * method uses the heap sort algorithm and fast copy of the arrays.
 *   
 */
 function FindWorstElements(array, count) {
    const n = array.length
    let i, j, k, m, t, sorted_array = [],
        sorted_indices = [], condition, detected_items = [],
        detected_indices = []
    i = 0
    while (i < (n >> 2)) {
        sorted_array[i << 2] = array[i << 2]
        sorted_indices[i << 2] = i << 2
        sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
        sorted_indices[(i << 2) + 1] = (i << 2) + 1
        sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
        sorted_indices[(i << 2) + 2] = (i << 2) + 2
        sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        sorted_indices[(i << 2) + 3] = (i << 2) + 3
        ++i
    }
    if (n % 4 >= 1) {
        sorted_array[n - 1] = array[n - 1]
        sorted_indices[n - 1] = n - 1
    }
    if (n % 4 >= 2) {
        sorted_array[n - 2] = array[n - 2]
        sorted_indices[n - 2] = n - 2
    }
    if (n % 4 >= 3) {
        sorted_array[n - 3] = array[n - 3]
        sorted_indices[n - 3] = n - 3
    }
    // transform the array into heap...
    k = (n - 2) >> 1
    while (k >= 0) {
        // shift down
        j = k
        while ((j << 1) + 1 <= n - 1) {
            m = j
            condition = sorted_array[m] > sorted_array[(j << 1) + 1]
            if (condition) m = (j << 1) + 1
            condition = sorted_array[m] > sorted_array[(j + 1) << 1]
            if ((j + 1) << 1 <= n - 1 && condition) m = (j + 1) << 1
            if (m === j) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[j]
                sorted_array[j] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[j]
                sorted_indices[j] = t
                j = m
            }
        }
        --k
    }
    // sort the array with the heap sort...
    k = n - 1
    while (k > n - count - 1) {
        // swap the k and the 0 elements
        t = sorted_array[0]
        sorted_array[0] = sorted_array[k]
        sorted_array[k] = t
        detected_items[n - k - 1] = t
        t = sorted_indices[0]
        sorted_indices[0] = sorted_indices[k]
        sorted_indices[k] = t
        detected_indices[n - k - 1] = t
        --k
        // shift down the subarray sorted_array[0:k]
        i = 0
        while ((i << 1) + 1 <= k) {
            m = i
            condition = sorted_array[m] > sorted_array[(i << 1) + 1]
            if (condition) m = (i << 1) + 1
            condition = sorted_array[m] > sorted_array[(i + 1) << 1]
            if (((i + 1) << 1) <= k && condition) m = (i + 1) << 1
            if (i === m) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[i]
                sorted_array[i] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[i]
                sorted_indices[i] = t
                i = m
            }
        }
    }
    return { array: detected_items, indices: detected_indices }
}
export default FindWorstElements;