'use strict';
import get_item_value from './GetItemValue.js';
/**
 * 
 * @param {Array.<{}>} array 
 * @param {Array.<string>} property 
 * @param {{}} element
 * @param {'increase' | 'decrease' | boolean} mode 
 * @returns {Array.<{}>}
 */
const AddElementInSortedObjectArrayByProperty = (array, property, element, mode) => {
    const n = array.length, extended_array = [];
    let first = 0, last = n - 1, middle, i, j;
    let is_for_beginning = mode ? get_item_value(array[0], property) >= get_item_value(element, property)
        : get_item_value(array[0], property) <= get_item_value(element, property);
    let is_for_end = mode ? get_item_value(array[n - 1], property) <= get_item_value(element, property)
        : get_item_value(array[n - 1], property) >= get_item_value(element, property);
    const condition = (item) => mode ? get_item_value(item, property) > get_item_value(element, property)
        : get_item_value(item, property) < get_item_value(element, property);
    if (is_for_beginning) {
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
    } else if (is_for_end) {
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
    } else {
        while (1) {
            middle = (first + last) >> 1;
            if (first === middle) break;
            if (condition(array[middle])) last = middle;
            else first = middle;
        }
        // copy all elements from 0 to the middle
        for (i = 0; i < ((middle + 1) >> 2); i++) {
            j = i << 2;
            extended_array[j] = array[j];
            extended_array[j + 1] = array[j + 1];
            extended_array[j + 2] = array[j + 2];
            extended_array[j + 3] = array[j + 3];
        }
        if ((middle + 1) % 4 >= 3) extended_array[middle - 2] = array[middle - 2];
        if ((middle + 1) % 4 >= 2) extended_array[middle - 1] = array[middle - 1];
        if ((middle + 1) % 4 >= 1) extended_array[middle] = array[middle];
        // add the new element
        extended_array[middle + 1] = element;
        // add the rest of the array from middle + 1 to the end.
        for (i = 0; i < (n - middle - 1) >> 2; i++) {
            j = i << 2;
            extended_array[middle + 2 + j] = array[middle + 1 +j];
            extended_array[middle + 3 + j] = array[middle + 2 + j];
            extended_array[middle + 4 + j] = array[middle + 3 + j];
            extended_array[middle + 5 + j] = array[middle + 4 + j];
        }
        if ((n - middle - 1) % 4 >= 3) extended_array[n - 2] = array[n - 3];
        if ((n - middle - 1) % 4 >= 2) extended_array[n - 1] = array[n - 2];
        if ((n - middle - 1) % 4 >= 1) extended_array[n] = array[n - 1];
    }
    return extended_array;
}
export default AddElementInSortedObjectArrayByProperty;