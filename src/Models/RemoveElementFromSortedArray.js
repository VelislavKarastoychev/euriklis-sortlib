'use strict';
/**
 * 
 * @param {Array.<string | number>} array 
 * @param {string | number} element
 * @param {boolean | 'increase' | 'decrease'} [mode]
 * @returns {{array: Array.<number | string>, indices: Array.<number>}}
 * @description this function returns an updated array
 * from the initial array parameter, which does not contains
 * the element parameter in it. If the element however does not
 * exists in the array, then the initial array will be returned
 * as output without any changes. The array is assumed to be sorted.
 * Note that this element returns only the first element which is
 * equals to the element. The method uses the bisection method.
 */
function RemoveElementFromSortedArray(array, element, mode) {
    const n = array.length, updatedArray = [], indices = [];
    let i, j, start = 0, end = n - 1, middle, condition;
    while (true) {
        middle = (start + end) >> 1;
        condition = mode ? array[middle] > element : array[middle] < element;
        if (start === middle) {
            if (array[middle] !== element) ++middle;
            else break;
        }
        if (end === middle) break;
        if (condition) end = middle;
        else start = middle;
    }
    // in this phase we have located the index of the element that
    // is at least equal to the element.
    if (array[middle] === element) {
        // for all elements of the array form 0 to middle
        // make copy of the array, and then continue without the
        // element array[middle].
        for (i = 0; i < (n - 1) >> 2; i++) {
            j = i << 2;
            (j < middle) ? (updatedArray[j] = array[j], indices[j] = j) : (updatedArray[j] = array[j + 1], indices[j] = j + 1);
            ++j;
            (j < middle) ? (updatedArray[j] = array[j], indices[j] = j) : (updatedArray[j] = array[j + 1], indices[j] = j + 1);
            ++j;
            (j < middle) ? (updatedArray[j] = array[j], indices[j] = j) : (updatedArray[j] = array[j + 1], indices[j] = j + 1);
            ++j;
            (j < middle) ? (updatedArray[j] = array[j], indices[j] = j) : (updatedArray[j] = array[j + 1], indices[j] = j + 1);
        }
        if ((n - 1) % 4 >= 1) {
            j = n - 2;
            (j < middle) ? (updatedArray[j] = array[j], indices[j] = j) : (updatedArray[j] = array[j + 1], indices[j] = j + 1);
        }
        if ((n - 1) % 4 >= 2) {
            j = n - 3;
            (j < middle) ? (updatedArray[j] = array[j], indices[j] = j) : (updatedArray[j] = array[j + 1], indices[j] = j + 1);
        }
        if ((n - 1) % 4 >= 3) {
            j = n - 4;
            (j < middle) ? (updatedArray[j] = array[j], indices[j] = j) : (updatedArray[j] = array[j + 1], indices[j] = j + 1);
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
export default RemoveElementFromSortedArray;