'use strict';
/**
 * 
 * @param {Array.<number | string | {}>} array 
 * @param {function (number, number, Array):boolean} callback
 * @returns { {array: Array.<number | string | {}>, indices: Array.<number>}} 
 */
const Filter = (array, callback) => {
    const n = array.length, filtered_array = [], indices = [];
    let i, j, l = 0;
    for (i = 0; i < n >> 2; i++) {
        j = i << 2;
        if (callback(array[j], j, array)) {
            filtered_array[l] = array[j];
            indices[l] = j;
            ++l;
        }
        ++j;
        if (callback(array[j], j, array)) {
            filtered_array[l] = array[j];
            indices[l] = j;
            ++l;
        }
        ++j;
        if (callback(array[j], j, array)) {
            filtered_array[l] = array[j];
            indices[l] = j;
            ++l;
        }
        ++j;
        if (callback(array[j], j, array)) {
            filtered_array[l] = array[j];
            indices[l] = j;
            ++l;
        }
    }
    if ((n % 4 >= 3)) {
        j = n - 3;
        if (callback(array[j], j, array)) {
            filtered_array[l] = array[j];
            indices[l] = j;
            ++l;
        }
    }
    if ((n % 4 >= 2)) {
        j = n - 2;
        if (callback(array[j], j, array)) {
            filtered_array[l] = array[j];
            indices[l] = j;
            ++l;
        }
    }
    if ((n % 4 >= 1)) {
        j = n - 1;
        if (callback(array[j], j, array)) {
            filtered_array[l] = array[j];
            indices[l] = j;
            ++l;
        }
    }
    return { array: filtered_array, indices };
}
export default Filter;
