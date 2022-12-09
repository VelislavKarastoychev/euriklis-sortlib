'use strict';
/**
 * 
 * @param {Array.<number | string>} array 
 * @param {number | string} element
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array: Array.<number | string>, indices: Array.<number>}}
 * @description this is an utility function which implements the
 * binary searching algorithm for sorted array. Note that
 * in this function we assume that the array is already sorted
 * and do not make checking of the sorting condition.
 */
function findElementsInSortedArray(array, element, mode) {
    const n = array.length;
    let first = 0, last = n - 1, middle,
        found = false, output = { array: [], indices: [] }, condition;
    while (1) {
        middle = (first + last) >> 1;
        if (array[middle] === element) found = true;
        if (middle === last) break;
        if (first === middle) {
            if (!found) ++middle;
            else break;
        }
        condition = mode ? element < array[middle] : element > array[middle];
        if (condition) last = middle;
        else first = middle;
    }
    if (found) {
        while (true) {
            output.array.push(array[middle]);
            output.indices.push(middle);
            ++middle;
            if (array[middle] !== element) break;
        }
    } else output.indices.push(-1)
    return output;
}
export default findElementsInSortedArray;