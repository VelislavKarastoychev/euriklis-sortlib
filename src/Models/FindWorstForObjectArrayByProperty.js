'use strict';
import get_item_value from './GetItemValue.js';
import find_worst_elements from './FindWorstElements.js';
/**
 * 
 * @param {Array.<object>} array 
 * @param {string | Array.<string>} property 
 * @param {number} count - an integer number
 * @returns {{array : Array.<object>, indices : Array.<number>}}
 * @description this utility function is used for the static
 * method find_worst_for_object_array_by_property and computes
 * the first worst count elements form an array each element
 * of which is an object by given property(es) of the object.
 * If the property is string array and the value of the array
 * is not object for each property of the property, except the
 * last level of the property array, then an error message will
 * be thrown. Also if every element of the array is not object
 * an error message will be thrown. If the last level property value
 * is not string or number value, then this element will be omitted
 * from the function and then output array will be all the elements that
 * contains the corresponding property. 
 */
 function FindWorstForObjectArrayByProperty(array, property, count) {
    let i, item, j, k, n, sorted_array = [],
        sorted_indices = [], temp, temp_array = [],
        temp_indices = []
    n = array.length
    for (i = 0; i < n >> 2; i++) {
        temp_array[i << 2] = get_item_value(array[i << 2], property);
        temp_indices[i << 2] = i << 2;
        temp_array[(i << 2) + 1] = get_item_value(array[(i << 2) + 1], property);
        temp_indices[(i << 2) + 1] = (i << 2) + 1;
        temp_array[(i << 2) + 2] = get_item_value(array[(i << 2) + 2], property);
        temp_indices[(i << 2) + 2] = (i << 2) + 2;
        temp_array[(i << 2) + 3] = get_item_value(array[(i << 2) + 3], property);
        temp_indices[(i << 2) + 3] = (i << 2) + 3;
    }
    if (n % 4 >= 1) {
        i = n - 1;
        temp_array[i] = get_item_value(array[i], property);
        temp_indices[i] = i;
    }
    if (n % 4 >= 2) {
        i = n - 2;
        temp_array[i] = get_item_value(array[i], property);
        temp_indices[i] = i;
    }
    if (n % 4 >= 3) {
        i = n - 3;
        temp_array[i] = get_item_value(array[i], property);
        temp_indices[i] = i;
    }
    // find the worst elements of the temp_array...
    temp = find_worst_elements(temp_array, count)
    // copy the elements into the sorted_array
    n = temp.indices.length
    for (i = 0; i < n >> 2; i++) {
        k = i << 2
        j = temp.indices[k]
        sorted_indices[k] = temp_indices[j]
        sorted_array[k] = array[sorted_indices[k]]
        ++k
        j = temp.indices[k]
        sorted_indices[k] = temp_indices[j]
        sorted_array[k] = array[sorted_indices[k]]
        ++k
        j = temp.indices[k]
        sorted_indices[k] = temp_indices[j]
        sorted_array[k] = array[sorted_indices[k]]
        ++k
        j = temp.indices[k]
        sorted_indices[k] = temp_indices[j]
        sorted_array[k] = array[sorted_indices[k]]
    }
    if (n % 4 >= 1) {
        j = temp.indices[n - 1]
        sorted_indices[n - 1] = temp_indices[j]
        sorted_array[n - 1] = array[sorted_indices[n - 1]]
    }
    if (n % 4 >= 2) {
        j = temp.indices[n - 2]
        sorted_indices[n - 2] = temp_indices[j]
        sorted_array[n - 2] = array[sorted_indices[n - 2]]
    }
    if (n % 4 >= 3) {
        j = temp.indices[n - 3]
        sorted_indices[n - 3] = temp_indices[j]
        sorted_array[n - 3] = array[sorted_indices[n - 3]]
    }
    return { array: sorted_array, indices: sorted_indices }
}
export default FindWorstForObjectArrayByProperty;