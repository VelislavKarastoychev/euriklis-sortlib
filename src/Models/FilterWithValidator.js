'use strict';
import validator from '@euriklis/validator';
/**
 * 
 * @param {Array.<any>} array 
 * @param {function(validator, number)} callback
 * @returns {{array: Array, indices: Array.<number>}}
 * @description this function localize all array elements
 * which satisfy the callback validator condition.
 * @example
 * const array = [{id: 1}, {id: 2, {id: 3}, {id: 4}, {id: 5}];
 * const filter = SortLib.filter_with_validator(array, (el, iter) => {
 *    return el.interface2({id: id => id.is_lesser_than(4)});
 * });
 */
 function filterWithValidator(array, callback) {
    let arr_v, v;
    const n = array.length, output = { array: [], indices: [] };
    for (let i = 0; i < n >> 2; i++) {
        v = i << 2;
        arr_v = new validator(array[v]);
        new validator(callback(arr_v, v).answer).is_same(true)
            .on(true, () => {
                output.array.push(array[v]);
                output.indices.push(v);
            });
        v = (i << 2) + 1;
        arr_v = new validator(array[v]);
        new validator(callback(arr_v, v).answer).is_same(true)
            .on(true, () => {
                output.array.push(array[v]);
                output.indices.push(v);
            });
        v = (i << 2) + 2;
        arr_v = new validator(array[v]);
        new validator(callback(arr_v, v).answer).is_same(true)
            .on(true, () => {
                output.array.push(array[v]);
                output.indices.push(v);
            });
        v = (i << 2) + 3;
        arr_v = new validator(array[v]);
        new validator(callback(arr_v, v).answer).is_same(true)
            .on(true, () => {
                output.array.push(array[v]);
                output.indices.push(v);
            });
    }
    if (n % 4 >= 1) {
        arr_v = new validator(array[n - 1]);
        new validator(callback(arr_v, n - 1).answer).is_same(true)
            .on(true, () => {
                output.array.push(array[n - 1]);
                output.indices.push(n - 1);
            });
    }
    if (n % 4 >= 2) {
        arr_v = new validator(array[n - 2]);
        new validator(callback(arr_v, n - 2).answer).is_same(true)
            .on(true, () => {
                output.array.push(array[n - 2]);
                output.indices.push(n - 2);
            });
    }
    if (n % 4 >= 3) {
        arr_v = new validator(array[n - 3]);
        new validator(callback(arr_v, n - 3).answer).is_same(true)
            .on(true, () => {
                output.array.push(array[n - 3]);
                output.indices.push(n - 3);
            });
    }
    return output;
}
export default filterWithValidator;