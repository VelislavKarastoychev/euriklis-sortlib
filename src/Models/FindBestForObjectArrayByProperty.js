'use strict';
import find_best_elements from './FindBestElements.js';
import get_item_value from './GetItemValue.js'
/**
 * 
 * @param {Array.<Object>} array 
 * @param {string | Array.<string>} property
 * @param {number} count - has to be integer
 * @return {{array : Array.<Object>, indices : Array.<number>}}
 * @description this function is used in the static method
 * find_best_for_object_array_by_property to extract the first
 * count element that have the hightest values. The property is the
 * key value of the object or the keys that are nested into the object.
 * If some element has undefined value for the last level of the object,
 * then this element will be omitted, otherwise an error message will be
 * thrown. 
 */
function FindBestForObjectArrayByProperty(array, property, count) {
    const n = array.length
    let i, j, k, sorted_array = [],
        sorted_indices = [], item, temp,
        temp_array = [], temp_indices = []
    // copy the array values in the temporary array.
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
    // get the first best elements
    temp = find_best_elements(temp_array, count)
    // copy the result into the sorted_array and the
    // sorted indices...
    k = temp.indices.length
    for (i = 0; i < k >> 2; i++) {
        j = temp.indices[i << 2]
        sorted_indices[i << 2] = temp_indices[j]
        sorted_array[i << 2] = array[sorted_indices[i << 2]]
        j = temp.indices[(i << 2) + 1]
        sorted_indices[(i << 2) + 1] = temp_indices[j]
        sorted_array[(i << 2) + 1] = array[sorted_indices[(i << 2) + 1]]
        j = temp.indices[(i << 2) + 2]
        sorted_indices[(i << 2) + 2] = temp_indices[j]
        sorted_array[(i << 2) + 2] = array[sorted_indices[(i << 2) + 2]]
        j = temp.indices[(i << 2) + 3]
        sorted_indices[(i << 2) + 3] = temp_indices[j]
        sorted_array[(i << 2) + 3] = array[sorted_indices[(i << 2) + 3]]
    }
    if (k % 4 >= 1) {
        j = temp.indices[k - 1]
        sorted_indices[k - 1] = temp_indices[j]
        sorted_array[k - 1] = array[sorted_indices[k - 1]]
    }
    if (k % 4 >= 2) {
        j = temp.indices[k - 2]
        sorted_indices[k - 2] = temp_indices[j]
        sorted_array[k - 2] = array[sorted_indices[k - 2]]
    }
    if (k % 4 >= 3) {
        j = temp.indices[k - 3]
        sorted_indices[k - 3] = temp_indices[j]
        sorted_array[k - 3] = array[sorted_indices[k - 3]]
    }
    return { array: sorted_array, indices: sorted_indices }
}
export default FindBestForObjectArrayByProperty;