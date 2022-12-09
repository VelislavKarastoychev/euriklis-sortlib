'use strict';
/**
 * 
 * @param {Array.<number | string>} array 
 * @param {number | string} element 
 * @param {boolean | 'increase' | 'decrease' } mode
 * @returns {Array.<number | string>} 
 * @description this utility function is used in the static
 * method add_element_in_sorted_array of the SortLib package.
 * The function assumes by default that the array is increasingly
 * ordered and so the mode is true.
 */
function AddElementInSortedArray(array, element, mode = true) {
    const extended_array = [], n = array.length;
    let i, j, first = 0, middle, last = array.length - 1, condition;
    if (mode === 'increase') mode = true;
    if (mode === 'decrease') mode = false;
    if (typeof mode === 'undefined') mode = true;
    else if (mode !== false) mode = true;
    if (mode === true) {
        if (element <= array[first]) {
            extended_array[0] = element;
            for (i = 0; i < n >> 2; i++) {
                j = i << 2;
                extended_array[j + 1] = array[j];
                extended_array[j + 2] = array[j + 1];
                extended_array[j + 3] = array[j + 2];
                extended_array[j + 4] = array[j + 3];
            }
            if (n % 4 >= 3) extended_array[n - 2] = array[n - 3];
            if (n % 4 >= 2) extended_array[n - 1] = array[n - 2];
            if (n % 4 >= 1) extended_array[n] = array[n - 1];
        }
        else if (element >= array[last]) {
            for (i = 0; i < n >> 2; i++) {
                j = i << 2;
                extended_array[j] = array[j];
                extended_array[j + 1] = array[j + 1];
                extended_array[j + 2] = array[j + 2];
                extended_array[j + 3] = array[j + 3];
            }
            if (n % 4 >= 3) extended_array[n - 3] = array[n - 3];
            if (n % 4 >= 2) extended_array[n - 2] = array[n - 2];
            if (n % 4 >= 1) extended_array[n - 1] = array[n - 1];
            extended_array[n] = element;
        }
        else {
            while (1) {
                middle = (first + last) >> 1; // truncate (first + last) / 2
                if (first === middle) break;
                if (array[middle] > element) {
                    last = middle;
                } else first = middle;
            }
            for (i = 0; i < (middle + 1) >> 2; i++) {
                j = i << 2;
                extended_array[j] = array[j];
                extended_array[j + 1] = array[j + 1];
                extended_array[j + 2] = array[j + 2];
                extended_array[j + 3] = array[j + 3];
            }
            if ((middle + 1) % 4 >= 3) extended_array[middle - 2] = array[middle - 2];
            if ((middle + 1) % 4 >= 2) extended_array[middle - 1] = array[middle - 1];
            if ((middle + 1) % 4 >= 1) extended_array[middle] = array[middle];
            extended_array[middle + 1] = element;
            for (i = 0; i < (n - middle - 1) >> 2; i++) {
                j = i << 2;
                extended_array[j + middle + 2] = array[j + middle + 1];
                extended_array[j + middle + 3] = array[j + middle + 2];
                extended_array[j + middle + 4] = array[j + middle + 3];
                extended_array[j + middle + 5] = array[j + middle + 4];
            }
            if ((n - middle - 1) % 4 >= 3) {
                j = n - 3;
                extended_array[j + 1] = array[j];
            }
            if ((n - middle - 1) % 4 >= 2) {
                j = n - 2;
                extended_array[j + 1] = array[j];
            }
            if ((n - middle - 1) % 4 >= 1) {
                j = n - 1;
                extended_array[j + 1] = array[j]
            }
        }
    } else {
        if (element >= array[first]) {
            extended_array[0] = element;
            for (i = 0; i < n >> 2; i++) {
                j = i << 2;
                extended_array[j + 1] = array[j];
                extended_array[j + 2] = array[j + 1];
                extended_array[j + 3] = array[j + 2];
                extended_array[j + 4] = array[j + 3];
            }
            if (n % 4 >= 3) extended_array[n - 2] = array[n - 3];
            if (n % 4 >= 2) extended_array[n - 1] = array[n - 2];
            if (n % 4 >= 1) extended_array[n] = array[n - 1];
        }
        else if (element <= array[last]) {
            for (i = 0; i < n >> 2; i++) {
                j = i << 2;
                extended_array[j] = array[j];
                extended_array[j + 1] = array[j + 1];
                extended_array[j + 2] = array[j + 2];
                extended_array[j + 3] = array[j + 3];
            }
            if (n % 4 >= 3) extended_array[n - 3] = array[n - 3];
            if (n % 4 >= 2) extended_array[n - 2] = array[n - 2];
            if (n % 4 >= 1) extended_array[n - 1] = array[n - 1];
            extended_array[n] = element;
        }
        else {
            while (1) {
                middle = (first + last) >> 1; // truncate (first + last) / 2
                if (first === middle) break;
                if (array[middle] < element) {
                    last = middle;
                } else first = middle;
            }
            for (i = 0; i < (middle + 1) >> 2; i++) {
                j = i << 2;
                extended_array[j] = array[j];
                extended_array[j + 1] = array[j + 1];
                extended_array[j + 2] = array[j + 2];
                extended_array[j + 3] = array[j + 3];
            }
            if ((middle + 1) % 4 >= 3) extended_array[middle - 2] = array[middle - 2];
            if ((middle + 1) % 4 >= 2) extended_array[middle - 1] = array[middle - 1];
            if ((middle + 1) % 4 >= 1) extended_array[middle] = array[middle];
            extended_array[middle + 1] = element;
            for (i = 0; i < (n - middle - 1) >> 2; i++) {
                j = i << 2;
                extended_array[j + middle + 2] = array[j + middle + 1];
                extended_array[j + middle + 3] = array[j + middle + 2];
                extended_array[j + middle + 4] = array[j + middle + 3];
                extended_array[j + middle + 5] = array[j + middle + 4];
            }
            if ((n - middle - 1) % 4 >= 3) {
                j = n - 3;
                extended_array[j + 1] = array[j];
            }
            if ((n - middle - 1) % 4 >= 2) {
                j = n - 2;
                extended_array[j + 1] = array[j];
            }
            if ((n - middle - 1) % 4 >= 1) {
                j = n - 1;
                extended_array[j + 1] = array[j]
            }
        }
    }
    return extended_array;
}
export default AddElementInSortedArray;