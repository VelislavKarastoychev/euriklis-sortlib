'use strict';
import get_item_value from './GetItemValue.js';
import {
    QuickSort,
    MergeSort,
    HeapSort,
    BucketSort
} from './index.js'
/**
 * 
 * @param {Array.<object>} array 
 * @param {string | Array.<string>} property 
 * @param {boolean | 'decrease' | 'increase'} mode 
 * @param {'quick sort' | 'merge sort' | 'heap sort' | 'bucket sort'} algorithm
 * @returns {{array : Array.<object>, indices : Array.<number>}}
 * @description this utility function sorts an array of
 * objects by given property of the object and algorithm.
 * All the properties of the object that have to be sorted
 * are needed to be numbers or strings. If this condition is not 
 * satisfied, then an error message will be thrown. Only the
 * fast algorithms can be used for sorting.If the property is an
 * array then the algorithm gets the values that are in the last
 * depth of the properties array. So if these properties are not
 * defined, then they will be omitted.
 * @example
 * let obj_array = [
 *     { attributes : { id : 13 } },
 *     { attributes : { id : 1} },
 *     { attributes : { id : 7} },
 *     { attributes : { value : 1.245324} },
 *     { attributes : { id : 2} },
 *     { attributes : { id : 4} }
 * ]
 * let output = SortLib.sort_object_array_by_property(array).array
 * let result = [
 *     { attributes : { id : 1 } },
 *     { attributes : { id : 2 } },
 *     { attributes : { id : 4 } },
 *     { attributes : { id : 7} },
 *     { attributes : { id : 13 } }
 * ]
 * let is_same = new validator(output).is_same(result).answer
 * console.log(is_same) // true (the forth element is omitted)
*/
function SortObjectArrayByProperty(array, property, mode, algorithm) {
    let i, j, k, sorted_array = [],
        sorted_indices = [], temp_array = [],
        temp_indices = [], temp;
    // copy the property values into the temp array
    const n = array.length;
    for (i = 0; i < (n >> 2); i++) {
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
    // sort the temp array element with the algorithm. 
    if (algorithm === 'quick sort') temp = QuickSort(temp_array, mode)
    if (algorithm === 'merge sort') temp = MergeSort(temp_array, mode)
    if (algorithm === 'heap sort') temp = HeapSort(temp_array, mode)
    if (algorithm === 'bucket sort') temp = BucketSort(temp_array, temp_array.length >> 1, mode)
    // put in the sorted indices the elements of the temp_indices
    // which correspond to the temp.indices
    for (i = 0; i < temp.indices.length >> 2; i++) {
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
    k = temp.indices.length
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
export default SortObjectArrayByProperty;