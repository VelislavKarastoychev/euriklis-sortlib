'use strict';
import { AreObjectsEqual } from '../Conditions/index.js';
import get_item_value from './GetItemValue.js';
/** 
 * @param {Array.<object>} array
 * @param {string | Array.<string>} property
 * @param {object} element
 * @param {boolean } mode
 * @returns {{array: Array.<object>, indices: Array.<number>}}
 * @description this function returns an array which does
 * not consists the element parameter. If this parameter does 
 * not exists in the underlined array, then the same array will 
 * be returned as output, but if the element exists in the array
 * it will be removed. The difference with the remove_element_form_sorted_array
 * is that in this method we assume that the array is relatively sorted, i.e.,
 * the array is sorted by some object property.  
 */
function RemoveElementFromSortedObjectArray(array, property, element, mode) {
    const n = array.length, m = property.length;
    let i, j, start = 0, end = n - 1, middle, arr_el,
        el_p, condition,
        updatedArray = [], indices = [];
    el_p = get_item_value(element, property);
    while (true) {
        middle = (start + end) >> 1;
        arr_el = get_item_value(array[middle], property);
        condition = mode ? arr_el > el_p : arr_el < el_p;
        if (start === middle) {
            if (arr_el !== el_p) ++middle;
            else break;
        }
        if (middle === end) break;
        if (condition) end = middle;
        else start = middle;
    }
    if (AreObjectsEqual(array[middle], element)) {
        for (i = 0; i < (n - 1) >> 2; i++) {
            j = i << 2;
            (j < middle) ? (
                updatedArray[j] = array[j],
                indices[j] = j
            ) : (
                updatedArray[j] = array[j + 1],
                indices[j] = j + 1
            )
            ++j;
            (j < middle) ? (
                updatedArray[j] = array[j],
                indices[j] = j
            ) : (
                updatedArray[j] = array[j + 1],
                indices[j] = j + 1
            )
            ++j;
            (j < middle) ? (
                updatedArray[j] = array[j],
                indices[j] = j
            ) : (
                updatedArray[j] = array[j + 1],
                indices[j] = j + 1
            )
            ++j;
            (j < middle) ? (
                updatedArray[j] = array[j],
                indices[j] = j
            ) : (
                updatedArray[j] = array[j + 1],
                indices[j] = j + 1
            )
        }
        if ((n - 1) % 4 >= 1) {
            j = n - 2;
            (j < middle) ? (
                updatedArray[j] = array[j],
                indices[j] = j
            ) : (
                updatedArray[j] = array[j + 1],
                indices[j] = j + 1
            )
        }
        if ((n - 1) % 4 >= 2) {
            j = n - 3;
            (j < middle) ? (
                updatedArray[j] = array[j],
                indices[j] = j
            ) : (
                updatedArray[j] = array[j + 1],
                indices[j] = j + 1
            )
        }
        if ((n - 1) % 4 >= 3) {
            j = n - 4;
            (j < middle) ? (
                updatedArray[j] = array[j],
                indices[j] = j
            ) : (
                updatedArray[j] = array[j + 1],
                indices[j] = j + 1
            )
        }
    } else {
        for (i = 0; i < n >> 2; i++) {
            j = i << 2;
            indices[j] = j;
            ++j;
            indices[j] = j;
            ++j;
            indices[j] = j;
            ++j;
            indices[j] = j;
        }
        if (n % 4 >= 3) indices[n - 3] = n - 3;
        if (n % 4 >= 2) indices[n - 2] = n - 2;
        if (n % 4 >= 1) indices[n - 1] = n - 1;
        return { array, indices };
    }
    return { array: updatedArray, indices };
}
export default RemoveElementFromSortedObjectArray;