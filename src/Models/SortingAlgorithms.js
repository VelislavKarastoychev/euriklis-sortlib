'use strict'
const validator = require('@euriklis/validator');
const errors = require('../Errors');

/**
 * 
 * @param {Array} array 
 * @param {number} element 
 * @param {boolean} ascending_order
 * @returns {Array} sorted_array
 * @description - this is an utility function
 * for the statistics library of the
 * euriklis package. The function uses the
 * binary searching to detect the correct
 * position of the new element and then puts
 * it to the array. Finally all the elements are
 * shifted because of the new size of the array.
 * The array is copied for more security. 
 */
function addElementInSortedArray(array, element, ascending_order) {
    let expanded_array = [], first, last, middle, condition,
        element_is_number = new validator(element).is_number(),
        element_is_string = new validator(element).is_string(), item_is_number = (item) => {
            return new validator(item).is_number();
        },
        item_is_string = (item) => {
            return new validator(item).is_string();
        };
    if (typeof ascending_order === 'undefined') ascending_order = true // "increase"
    if (ascending_order === "decrease") ascending_order = false
    first = 0, last = array.length - 1
    while (true) {
        middle = (first + last) >> 1
        item_is_string(array[middle])
            .and().bind(element_is_string)
            .on(true, () => {
                condition = ascending_order ?
                    array[middle].toLowerCase() < element.toLowerCase()
                    : array[middle].toLowerCase() > element.toLowerCase();
            });
        item_is_number(array[middle]).and().bind(element_is_number)
            .on(true, () => {
                condition = ascending_order ? array[middle] < element : array[middle] > element;
            })
        item_is_number(array[middle]).and().bind(element_is_string)
            .or().bind(item_is_string(array[middle]).and().bind(element_is_number))
            .on(true, () => {
                condition = ascending_order ?
                    array[middle].toString().toLowerCase() < element.toString().toLowerCase()
                    : array[middle].toString().toLowerCase() > element.toString().toLowerCase();
            });
        if (first === last && last === middle) break
        if (condition) first = middle + 1
        else last = middle
    }
    // in this phase we have located the right
    // position  of the new element which is in the
    // middle point. To put the element we make the
    // assign of the elements of the array with the
    // new element added in the position middle. 
    for (first = 0; first <= array.length; first++) {
        if (first < middle) expanded_array[first] = array[first];
        else if (first === middle) expanded_array[first] = element;
        else expanded_array[first] = array[first - 1];
    }
    return expanded_array
}

/**
 * 
 * @param {Array.<object>} array 
 * @param {Array.<string> | string} property 
 * @param {object} element
 * @returns {Array.<object>}
 * @description this utility function adds a
 * string or a number element in it correct
 * place in an object array by property ordering.
 * We use the so called bisection method to locate the
 * correct place of the method.
 * Note that the property may be a string array as well as
 * a string type. When the property is string, then the function
 * searches for key of the object with this name, and if any of the
 * objects contains a non string or a non number value then the
 * function throws an error message for incorrect property of the
 * method.
 * If the property is an array of strings, then the function checks all the
 * levels of these properties and if the final value is not string or number,
 * then the same message is thrown.
 * If any of the elements of the array parameter is not an object, then an
 * error message for incorrect array parameter will be thrown.
 * The element parameter is checked for type accuracy before be inserted to the function.
 * 
 */
function addElementInSortedObjectArrayByProperty(array, property, element, mode) {
    const n = array.length;
    let arr_el_i, el_p, condition, end, expanded_array = [], middle, p, start;
    start = 0, end = n - 1, middle;
    if (typeof mode === 'undefined') mode = true;
    while (1) {
        middle = (start + end) >> 1;
        arr_el_i = array[middle];
        el_p = Object.assign({}, element);
        new validator(arr_el_i).not().is_object()
            .on(true, () => {
                errors.IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty()
            });
        new validator(property).is_string().on(true, () => property = [property]);
        for (p = 0; p < property.length; p++) {
            new validator(arr_el_i[property[p]]).is_object()
                .and().bind(
                    new validator(el_p[property[p]]).is_object()
                )
                .and().bind(
                    new validator(p).is_lesser_than(property.length - 1)
                ).on(true, () => {
                    arr_el_i = arr_el_i[property[p]];
                    el_p = el_p[property[p]];
                })
                .on(false, () => {
                    if (p < property.length - 1) {
                        errors.IncorrectPropertyParameterInAddElementInSortedObjectArrayByProperty()
                    }
                })
            new validator(p).is_same(property.length - 1)
                .and().bind(
                    new validator(arr_el_i[property[p]]).is_string().or().is_number()
                ).and().bind(
                    new validator(el_p[property[p]]).is_string().or().is_number()
                )
                .on(true, () => {
                    arr_el_i = arr_el_i[property[p]];
                    el_p = el_p[property[p]];
                })
                .on(false, () => {
                    if (p === property.length) {
                        errors.IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty();
                    }
                });
        }
        condition = mode ? arr_el_i < el_p : arr_el_i > el_p;
        if (start === end && middle === end) break;
        if (condition) start = middle + 1;
        else end = middle;
    }
    // in this phase we have located the position
    // of the element, which is the middle. The other
    // elements after the middle will be putted after the new element
    for (start = 0; start <= n; start++) {
        if (start < middle) expanded_array[start] = array[start];
        else if (start === middle) expanded_array[start] = element;
        else expanded_array[start] = array[start - 1];
    }
    return expanded_array;
}

/**
 * 
 * @method bubble_sort
 * @param {Array} array 
 * @param {boolean | 'decrease' | 'increase'} ascending_order
 * @description this utility function function
 * implements the bubble sort algorithm for the
 * sorting of an array.  
 */
function bubble_sort(array, ascending_order) {
    let sorted_array = [...array], condition,
        i, j, sorted_indices = array.map((e, i) => i),
        n = array.length, temp
    if (typeof ascending_order === 'undefined') ascending_order = true
    if (ascending_order === 'decrease') ascending_order = false
    for (i = 0; i < n; i++) {
        for (j = 0; j < n - 1; j++) {
            if (ascending_order) condition = sorted_array[j + 1] > sorted_array[j]
            else condition = sorted_array[j + 1] < sorted_array[j]
            if (!condition) {
                temp = sorted_array[j]
                sorted_array[j] = sorted_array[j + 1]
                sorted_array[j + 1] = temp
                temp = sorted_indices[j]
                sorted_indices[j] = sorted_indices[j + 1]
                sorted_indices[j + 1] = temp
            }
        }
    }
    return { array: sorted_array, indices: sorted_indices }
}

/**
 * 
 * @param {Array.<number>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array : Array.<number>, indices: Array.<number>}}
 * @description this utility function implements
 * the bucket sort algorithm. Note that this
 * algorithm is not fast sorting algorithm and
 * has worst complexity of O(n^2) and average
 * time complexity of O(n + n^2 / k + k), where
 * the k is the count of the buckets.
 *  
 */
function bucket_sort(array, buckets, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    let sorted_array = [], i, j, temp, min, indices = [],
        temp_array = [], temp_indices = [], n, max
    for (i = 0; i < buckets; i++) {
        temp_array.push([])
        temp_indices.push([])
    }
    // find the biggest element of the array.
    max = array[0]
    n = array.length
    for (i = 0; i < n; i++) if (array[i] > max) max = array[i]
    // find the min element:
    min = array[0]
    for (i = 0; i < n; i++) if (array[i] < min) min = array[i]
    // push the arrays into the right sub-array of the temp_array
    for (i = 0; i < n; i++) {
        j = (((array[i] - min) / (max - min)) * (buckets - 1)) | 0
        temp_array[j].push(array[i])
        temp_indices[j].push(i)
    }
    // sort all the subarrays of the temp and concatenate then to
    // the sorted_array
    for (j = mode ? 0 : buckets - 1; mode ? j < buckets : j >= 0; mode ? j++ : j--) {
        temp = insertion_sort(temp_array[j], mode)
        sorted_array.push(...temp.array)
        indices.push(...temp.indices.map(el => {
            return temp_indices[j][el]
        }))
    }
    return { array: sorted_array, indices }
}

/**
 * 
 * @param {Array.<number | string>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array : Array.<number | string>, indices : Array.<number>}}
 * @description this utility function implements
 * the cocktail sorting algorithm that is a variant
 * of the bubble sort algorithm. Note that this algorithm
 * is not fast (has complexity proportional to O(n^2)).
 */
function cocktail_sort(array, mode) {
    let n = array.length, sorted_array = [...array],
        indices = Array.from({ length: n }).map((e, i) => e = i)
    let i, start, end, condition, temp, swapped = true

    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    start = 0
    end = n - 1
    while (swapped) {
        swapped = false
        for (i = start; i < end; i++) {
            condition = mode ? sorted_array[i] > sorted_array[i + 1] : sorted_array[i] < sorted_array[i + 1]
            if (condition) {
                temp = sorted_array[i]
                sorted_array[i] = sorted_array[i + 1]
                sorted_array[i + 1] = temp
                temp = indices[i]
                indices[i] = indices[i + 1]
                indices[i + 1] = temp
                swapped = true
            }
        }
        if (!swapped) break
        swapped = false
        --end
        for (i = end - 1; i > start - 1; i--) {
            condition = mode ? sorted_array[i] > sorted_array[i + 1] : sorted_array[i] < sorted_array[i + 1]
            if (condition) {
                temp = sorted_array[i]
                sorted_array[i] = sorted_array[i + 1]
                sorted_array[i + 1] = temp
                temp = indices[i]
                indices[i] = indices[i + 1]
                indices[i + 1] = temp
                swapped = true
            }
        }
        ++start
    }
    return { array: sorted_array, indices }
}

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

/**
 * @param {Array.<string | number>} array
 * @param {number} count
 * @returns {{array : Array.<string | number>, indices : Array.<number>}}
 * @description this function finds out the first best n elements of
 * an unsorted array. To make this the function uses the heap sort
 * algorithm and stop when the count of n elements is reached. 
 */
function find_best_elements(array, count) {
    const n = array.length
    let i, j, k, m, t, sorted_array = [],
        sorted_indices = [], detected_items = [],
        detected_indices = [], condition
    i = 0
    if (count === 0) return { array: [], indices: [] }
    if (count === n) return heap_sort(array, true)
    while (i < (n >> 2)) {
        sorted_array[i << 2] = array[i << 2]
        sorted_indices[i << 2] = i << 2
        sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
        sorted_indices[(i << 2) + 1] = (i << 2) + 1
        sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
        sorted_indices[(i << 2) + 2] = (i << 2) + 2
        sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        sorted_indices[(i << 2) + 3] = (i << 2) + 3
        ++i
    }
    if (n % 4 >= 1) {
        sorted_array[n - 1] = array[n - 1]
        sorted_indices[n - 1] = n - 1
    }
    if (n % 4 >= 2) {
        sorted_array[n - 2] = array[n - 2]
        sorted_indices[n - 2] = n - 2
    }
    if (n % 4 >= 3) {
        sorted_array[n - 3] = array[n - 3]
        sorted_indices[n - 3] = n - 3
    }
    // transform the array into heap...
    k = (n - 2) >> 1
    while (k >= 0) {
        // shift down
        j = k
        while ((j << 1) + 1 <= n - 1) {
            m = j
            condition = sorted_array[m] < sorted_array[(j << 1) + 1]
            if (condition) m = (j << 1) + 1
            condition = sorted_array[m] < sorted_array[(j + 1) << 1]
            if ((j + 1) << 1 <= n - 1 && condition) m = (j + 1) << 1
            if (m === j) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[j]
                sorted_array[j] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[j]
                sorted_indices[j] = t
                j = m
            }
        }
        --k
    }
    // sort the array with the heap sort...
    k = n - 1
    while (k > n - count - 1) {
        // swap the k and the 0 elements
        t = sorted_array[0]
        sorted_array[0] = sorted_array[k]
        sorted_array[k] = t
        detected_items[n - k - 1] = t
        t = sorted_indices[0]
        sorted_indices[0] = sorted_indices[k]
        sorted_indices[k] = t
        detected_indices[n - k - 1] = t
        --k
        // shift down the subarray sorted_array[0:k]
        i = 0
        while ((i << 1) + 1 <= k) {
            m = i
            condition = sorted_array[m] < sorted_array[(i << 1) + 1]
            if (condition) m = (i << 1) + 1
            condition = sorted_array[m] < sorted_array[(i + 1) << 1]
            if (((i + 1) << 1) <= k && condition) m = (i + 1) << 1
            if (i === m) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[i]
                sorted_array[i] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[i]
                sorted_indices[i] = t
                i = m
            }
        }
    }

    return { array: detected_items, indices: detected_indices }
}


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
function find_best_for_object_array_by_property(array, property, count) {
    const n = array.length
    let i, j, k, sorted_array = [],
        sorted_indices = [], item, temp,
        temp_array = [], temp_indices = []
    // copy the array values in the temporary array.
    for (i = 0; i < n >> 2; i++) {
        // if the array elements are not
        // objects throw error.
        new validator(array[i << 2]).not().is_object()
            .or().bind(new validator(array[(i << 2) + 1]).not().is_object())
            .or().bind(new validator(array[(i << 2) + 2]).not().is_object())
            .or().bind(new validator(array[(i << 2) + 3]).not().is_object())
            .on(true, () => errors.IncorrectArrayParameterInFindBestInObjectArray())
        k = 0
        while (k <= 3) {
            item = array[(i << 2) + k]
            if (typeof property === 'string') temp = item[property]
            else {
                // the property is a string array
                for (j = 0; j < property.length; j++) {
                    new validator(j).is_lesser_than(property.length - 1)
                        .and().bind(new validator(item).not().is_object())
                        .on(true, () => {
                            errors.IncorrectPropertyParameterInFindBestInObjectArray()
                        })
                    item = item[property[j]]
                }
                temp = item
            }
            new validator(temp).is_string().and().is_number()
                .on(false, () => {
                    temp_array.push(temp)
                    temp_indices.push((i << 2) + k)
                })
            ++k
        }
    }
    if (n % 4 >= 1) {
        item = array[n - 1]
        new validator(item).not().is_object()
            .on(true, () => errors.IncorrectArrayParameterInFindBestInObjectArray())
        if (typeof property === 'string') temp = item[property]
        else {
            for (j = 0; j < property.length; j++) {
                new validator(j).is_lesser_than(property.length - 1)
                    .and().bind(new validator(item).not().is_object())
                    .on(true, () => {
                        errors.IncorrectPropertyParameterInFindBestInObjectArray()
                    })
                item = item[property[j]]
            }
            temp = item
        }
        new validator(temp).not().is_number().and()
            .not().is_string()
            .on(false, () => {
                temp_array.push(temp)
                temp_indices.push(n - 1)
            })
    }
    if (n % 4 >= 2) {
        item = array[n - 2]
        new validator(item).not().is_object()
            .on(true, () => errors.IncorrectArrayParameterInFindBestInObjectArray())
        if (typeof property === 'string') {
            temp = item[property]
        } else {
            for (j = 0; j < property.length; j++) {
                new validator(j).is_lesser_than(property.length - 1)
                    .and().bind(new validator(item).not().is_object())
                    .on(true, () => {
                        errors.IncorrectPropertyParameterInFindBestInObjectArray()
                    }).on(false, () => {
                        item = item[property[j]]
                    })
            }
            temp = item
        }
        new validator(temp).is_string().or().is_number()
            .on(true, () => {
                temp_array.push(temp)
                temp_indices.push(n - 2)
            }).on(false, () => {
                errors.IncorrectArrayParameterInFindBestInObjectArray()
            })
    }
    if (n % 4 >= 3) {
        item = array[n - 3]
        new validator(item).not().is_object()
            .on(true, () => errors.IncorrectArrayParameterInFindBestInObjectArray())
        if (typeof property === 'string') temp = item[property]
        else {
            for (j = 0; j < property.length; j++) {
                new validator(j).is_lesser_than(property.length)
                    .and().bind(new validator(item).not().is_object())
                    .on(true, () => {
                        errors.IncorrectPropertyParameterInFindBestInObjectArray()
                    })
                item = item[property[j]]
            }
            temp = item
        }
        new validator(temp).is_string().or().is_number()
            .on(true, () => {
                temp_array.push(temp)
                temp_indices.push(n - 3)
            }).on(false, () => errors.IncorrectArrayParameterInFindBestInObjectArray())
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
    let start = 0, end = n - 1, middle, condition, output = { array: [], indices: [] };
    if (typeof mode === 'undefined') {
        if (array[0] > array[n - 1]) mode = false; // decrease
        else mode = true;
    }
    // find the initial index of the
    // array which is possible to
    // satisfy the condition of the equality.
    while (true) {
        middle = (start + end) >> 1;
        if (start === end && end == middle) break;
        condition = mode ? array[middle] >= element : array[middle] <= element;
        if (condition) end = middle;
        else start = middle + 1;
    }
    // in this phase we have the index middle
    // which is the index that is the first element
    // for which is fulfilled that is at least equal
    // or bigger than the element. If the array[middle]
    // is not equal to the element, then return empty
    // array and indices, an array with the value -1.
    new validator(array[middle])
        .not().is_same(element).on(true, () => {
            output.indices[0] = -1;
        }).on(false, () => {
            let index = 0
            while (new validator(array[middle]).is_same(element).answer) {
                output.array[index] = array[middle];
                output.indices[index] = middle;
                ++index;
                ++middle;
                if (middle === n) break;
            }
        })
    return output;
}

/**
 * 
 * @param {Array.<object>} array 
 * @param {Array.<string>} property 
 * @param {object} element 
 * @param {boolean | 'increase' | 'decrease'} mode 
 * @returns {{array: Array.<object>, indices: Array.<number>}}
 */
function findElementsInSortedObjectArray(array, property, element, mode) {
    const output = { array: [], indices: [] }, n = array.length;
    let arr_el, condition, start = 0, end = n - 1, middle, p, m, el_p, i = 0;
    if (typeof mode === 'undefined') mode = true;
    if (typeof property === 'string') property = [property];
    m = property.length;
    // define the el_p once:
    el_p = Object.assign({}, element);
    for (p = 0; p < m; p++) {
        new validator(p).is_lesser_than(m - 1)
            .and().bind(
                new validator(el_p[property[p]]).is_object()
            ).on(true, () => el_p = el_p[property[p]])
            .on(false, () => {
                if (p < (m - 1)) {
                    errors.IncorrectPropertyParameterInFindElementsInSortedObjectArray();
                }
            });
        new validator(p).is_same(m - 1)
            .and().bind(
                new validator(el_p[property[p]]).is_string().or().is_number()
            ).on(true, () => el_p = el_p[property[p]])
            .on(false, () => {
                if (p === (m - 1)) {
                    errors.IncorrectPropertyParameterInFindElementsInSortedObjectArray();
                }
            });
    }
    while (true) {
        middle = (start + end) >> 1;
        arr_el = array[middle];
        for (p = 0; p < m; p++) {
            new validator(p).is_lesser_than(m - 1)
                .and().bind(
                    new validator(arr_el[property[p]]).is_object()
                ).on(true, () => {
                    arr_el = arr_el[property[p]];
                }).on(false, () => {
                    if (p !== (m - 1)) {
                        errors.IncorrectArrayInFindElementsInSortedObjectArray();
                    }
                });
            new validator(p).is_same(m - 1)
                .and().bind(
                    new validator(arr_el[property[p]]).is_string().or().is_number()
                ).on(true, () => {
                    arr_el = arr_el[property[p]];
                }).on(false, () => {
                    if (p === (m - 1)) {
                        errors.IncorrectArrayInFindElementsInSortedObjectArray();
                    }
                });
        }
        if (start === end && middle === end) break;
        condition = mode ? arr_el >= el_p : arr_el <= el_p;
        if (condition) end = middle;
        else start = middle + 1;
    }
    // in this phase we have find the element which is
    // at least equal to the el_p.
    // if no elements which are equals to the el_p,
    // then return empty array and indices with the only
    // element the -1.
    if (new validator(arr_el).not().is_same(el_p).answer) {
        output.indices = [-1];
        return output;
    }
    while (new validator(el_p).is_same(arr_el).answer) {
        output.array[i] = array[middle];
        output.indices[i] = middle;
        ++middle;
        ++i;
        if (middle === n) break;
        // update the arr_el variables:
        arr_el = array[middle];
        for (p = 0; p < m; p++) {
            new validator(p).is_lesser_than(m - 1)
                .and().bind(
                    new validator(arr_el[property[p]]).is_object()
                ).on(true, () => {
                    arr_el = arr_el[property[p]];
                }).on(false, () => {
                    if (p !== m - 1) {
                        errors.IncorrectPropertyParameterInFindElementsInSortedObjectArray();
                    }
                });
            new validator(p).is_same(m - 1)
                .and().bind(
                    new validator(arr_el[property[p]]).is_string().or().is_number()
                ).on(true, () => arr_el = arr_el[property[p]])
                .on(false, () => {
                    if (p === m - 1) {
                        errors.IncorrectArrayInFindElementsInSortedObjectArray();
                    }
                });
        }
    }
    return output;
}

/**
 * 
 * @param {Array.<number | string>} array 
 * @param {number} count - an integer number
 * @returns {{array : Array.<number | string>, indices : Array.<number>}}
 * @description this algorithm finds out the first count worts elements
 * of an array which is contained from number or string elements. The
 * method uses the heap sort algorithm and fast copy of the arrays.
 *   
 */
function find_worst_elements(array, count) {
    const n = array.length
    let i, j, k, m, t, sorted_array = [],
        sorted_indices = [], condition, detected_items = [],
        detected_indices = []
    i = 0
    while (i < (n >> 2)) {
        sorted_array[i << 2] = array[i << 2]
        sorted_indices[i << 2] = i << 2
        sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
        sorted_indices[(i << 2) + 1] = (i << 2) + 1
        sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
        sorted_indices[(i << 2) + 2] = (i << 2) + 2
        sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        sorted_indices[(i << 2) + 3] = (i << 2) + 3
        ++i
    }
    if (n % 4 >= 1) {
        sorted_array[n - 1] = array[n - 1]
        sorted_indices[n - 1] = n - 1
    }
    if (n % 4 >= 2) {
        sorted_array[n - 2] = array[n - 2]
        sorted_indices[n - 2] = n - 2
    }
    if (n % 4 >= 3) {
        sorted_array[n - 3] = array[n - 3]
        sorted_indices[n - 3] = n - 3
    }
    // transform the array into heap...
    k = (n - 2) >> 1
    while (k >= 0) {
        // shift down
        j = k
        while ((j << 1) + 1 <= n - 1) {
            m = j
            condition = sorted_array[m] > sorted_array[(j << 1) + 1]
            if (condition) m = (j << 1) + 1
            condition = sorted_array[m] > sorted_array[(j + 1) << 1]
            if ((j + 1) << 1 <= n - 1 && condition) m = (j + 1) << 1
            if (m === j) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[j]
                sorted_array[j] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[j]
                sorted_indices[j] = t
                j = m
            }
        }
        --k
    }
    // sort the array with the heap sort...
    k = n - 1
    while (k > n - count - 1) {
        // swap the k and the 0 elements
        t = sorted_array[0]
        sorted_array[0] = sorted_array[k]
        sorted_array[k] = t
        detected_items[n - k - 1] = t
        t = sorted_indices[0]
        sorted_indices[0] = sorted_indices[k]
        sorted_indices[k] = t
        detected_indices[n - k - 1] = t
        --k
        // shift down the subarray sorted_array[0:k]
        i = 0
        while ((i << 1) + 1 <= k) {
            m = i
            condition = sorted_array[m] > sorted_array[(i << 1) + 1]
            if (condition) m = (i << 1) + 1
            condition = sorted_array[m] > sorted_array[(i + 1) << 1]
            if (((i + 1) << 1) <= k && condition) m = (i + 1) << 1
            if (i === m) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[i]
                sorted_array[i] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[i]
                sorted_indices[i] = t
                i = m
            }
        }
    }
    return { array: detected_items, indices: detected_indices }
}

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
function find_worst_for_object_array_by_property(array, property, count) {
    let i, item, j, k, n, sorted_array = [],
        sorted_indices = [], temp, temp_array = [],
        temp_indices = []
    n = array.length
    for (i = 0; i < n >> 2; i++) {
        new validator(array[i << 2]).not().is_object()
            .or().bind(
                new validator(array[(i << 2) + 1]).not().is_object()
            )
            .or().bind(
                new validator(array[(i << 2) + 2]).not().is_object()
            )
            .or().bind(
                new validator(array[(i << 2) + 3]).not().is_object()
            )
            .on(true, () => errors.IncorrectArrayParameterInFindWorstInObjectArray())
        k = 0
        while (k <= 3) {
            item = array[(i << 2) + k]
            if (typeof property === 'string') temp = item[property]
            else {
                for (j = 0; j < property.length; j++) {
                    new validator(j).is_lesser_than(property.length - 1)
                        .and().bind(new validator(item).not().is_object())
                        .on(true, () => {
                            errors.IncorrectPropertyParameterInFindWorstInObjectArray()
                        })
                    item = item[property[j]]
                }
                temp = item
            }
            new validator(temp).is_string().or().is_number()
                .on(true, () => {
                    temp_array.push(temp)
                    temp_indices.push((i << 2) + k)
                })
            ++k
        }
    }
    if (n % 4 >= 1) {
        item = array[n - 1]
        new validator(item).not().is_object()
            .on(true, () => {
                errors.IncorrectArrayParameterInFindWorstInObjectArray()
            })
        if (typeof property === 'string') temp = item[property]
        else {
            for (j = 0; j < property.length; j++) {
                new validator(j).is_lesser_than(property.length - 1)
                    .and().bind(new validator(item).not().is_object())
                    .on(true, () => {
                        errors.IncorrectPropertyParameterInFindWorstInObjectArray()
                    })
                item = item[property[j]]
            }
            temp = item
        }
        new validator(temp).is_string().or().is_number()
            .on(true, () => {
                temp_array.push(temp)
                temp_indices.push(n - 1)
            })
    }
    if (n % 4 >= 2) {
        item = array[n - 2]
        new validator(item).not().is_object()
            .on(true, () => {
                errors.IncorrectArrayParameterInFindWorstInObjectArray()
            })
        if (typeof property === 'string') temp = item[property]
        else {
            for (j = 0; j < property.length; j++) {
                new validator(j).is_lesser_than(property.length - 1)
                    .and().bind(new validator(item).not().is_object())
                    .on(true, () => {
                        errors.IncorrectPropertyParameterInFindWorstInObjectArray()
                    })
                item = item[property[j]]
            }
            temp = item
        }
        new validator(item).is_string().or().is_number()
            .on(true, () => {
                temp_array.push(temp)
                temp_indices.push(n - 2)
            })
    }
    if (n % 4 >= 3) {
        item = array[n - 3]
        new validator(item).not().is_object()
            .on(true, () => {
                errors.IncorrectArrayParameterInFindWorstInObjectArray()
            })
        if (typeof property === 'string') temp = item[property]
        else {
            for (j = 0; j < property.length; j++) {
                new validator(j).is_lesser_than(property.length - 1)
                    .and().bind(new validator(item).not().is_object())
                    .on(true, () => {
                        errors.IncorrectPropertyParameterInFindWorstInObjectArray()
                    })
                item = item[property[j]]
            }
            temp = item
        }
        new validator(temp).is_string().or().is_number()
            .on(true, () => {
                temp_array.push(temp)
                temp_indices.push(n - 3)
            })
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

/**
 * 
 * @param {number} n 
 * @param {number} seed
 * @returns {Array.<number>}
 * @description this function creates a
 * random array that has the same elements
 * for given n. We use the John Burkardt routine
 * written in Fortran for the usage of the
 * algorithm 451 (M.Box complex optimization method).
 * We only utilize the code in such a manner that the
 * array creating to be more efficient by using
 * of bitwise operations. 
 */
function generate_random_array(n, seed, callback) {
    let i, k, rand = []
    for (i = 0; i < n >> 2; i++) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[i << 2] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[i << 2] = callback(rand[i << 2], i << 2)
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[(i << 2) + 1] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[(i << 2) + 1] = callback(rand[(i << 2) + 1], (i << 2) + 1)
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[(i << 2) + 2] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[(i << 2) + 2] = callback(rand[(i << 2) + 2], (i << 2) + 2)
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[(i << 2) + 3] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[(i << 2) + 3] = callback(rand[(i << 2) + 3], (i << 2) + 3)
    }
    if (n % 4 >= 1) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[n - 1] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[n - 1] = callback(rand[n - 1], n - 1)
    }
    if (n % 4 >= 2) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[n - 2] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[n - 2] = callback(rand[n - 2], n - 2)
    }
    if (n % 4 >= 3) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[n - 3] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[n - 3] = callback(rand[n - 3], n - 3)
    }
    return rand
}
/**
 * 
 * @param {number} n 
 * @param {number} k 
 * @param {number} seed 
 * @param {function(element, index)} callback
 * @returns {Array.<string>}
 * @description this function creates an array of n random strings
 * with width of the symbols equals to the k. If the seed is not 
 * defined, then the variable will be set to the default value
 * for the random_array_function, namely to the 123456. Finally, 
 * if the callback function is used the output of the function
 * will be an array with arbitrary (set from the user) output.
 */
function generate_random_string_array(n, k, seed, callback) {
    const alphabet = 'ABCDEFGHIJKLMNOPQSTUVWXWZabcdefghijklmnopqrstuvwxyz0123456789';
    const symbols = alphabet.length;
    const random_symbols_generator = generate_random_array(n * k, seed);
    let i, j, random_string_array = [];
    for (i = 0; i < n >> 2; i++) {
        random_string_array[i << 2] = '';
        for (j = 0; j < k; j++) {
            random_string_array[i << 2] += alphabet.charAt((symbols * random_symbols_generator[(i << 2) * k + j]) << 0);
        }
        if (typeof callback === 'function') {
            random_string_array[i << 2] = callback(random_string_array[i << 2], i << 2);
        }
        random_string_array[(i << 2) + 1] = '';
        for (j = 0; j < k; j++) {
            random_string_array[(i << 2) + 1] += alphabet.charAt((symbols * random_symbols_generator[((i << 2) + 1) * k + j]) << 0);
        }
        if (typeof callback === 'function') {
            random_string_array[(i << 2) + 1] = callback(random_string_array[(i << 2) + 1], (i << 2) + 1);
        }
        random_string_array[(i << 2) + 2] = '';
        for (j = 0; j < k; j++) {
            random_string_array[(i << 2) + 2] += alphabet.charAt((symbols * random_symbols_generator[((i << 2) + 2) * k + j]) << 0);
        }
        if (typeof callback == 'function') {
            random_string_array[(i << 2) + 2] = callback(random_string_array[(i << 2) + 2], (i << 2) + 2);
        }
        random_string_array[(i << 2) + 3] = '';
        for (j = 0; j < k; j++) {
            random_string_array[(i << 2) + 3] += alphabet.charAt((symbols * random_symbols_generator[((i << 2) + 3) * k + j]) << 0);
        }
        if (typeof callback == 'function') {
            random_string_array[(i << 2) + 3] = callback(random_string_array[(i << 2) + 3], (i << 2) + 3);
        }
    }
    if (n % 4 >= 1) {
        random_string_array[n - 1] = '';
        for (j = 0; j < k; j++) {
            random_string_array[n - 1] += alphabet.charAt((symbols * random_symbols_generator[(n - 1) * k + j]) << 0);
        }
        if (typeof callback === 'function') {
            random_string_array[n - 1] = callback(random_string_array[n - 1], n - 1);
        }
    }
    if (n % 4 >= 2) {
        random_string_array[n - 2] = '';
        for (j = 0; j < k; j++) {
            random_string_array[n - 2] += alphabet.charAt((symbols * random_symbols_generator[(n - 2) * k + j]) << 0);
        }
        if (typeof callback === 'function') {
            random_string_array[n - 2] = callback(random_string_array[n - 2], n - 2);
        }
    }
    if (n % 4 >= 3) {
        random_string_array[n - 3] = '';
        for (j = 0; j < k; j++) {
            random_string_array[n - 1] += alphabet.charAt((symbols * random_symbols_generator[(n - 3) * k + j]) << 0);
        }
        if (typeof callback === 'function') {
            random_string_array[n - 3] = callback(random_string_array[n - 3], n - 3);
        }
    }
    return random_string_array;
}

/**
 * 
 * @param {Array} array 
 * @param {boolean | 'decrease' | 'increase'} mode
 * @description this utility function implements the
 * Heap sort algorithm. The function uses the two
 * sub-functions shift_down and heap_shift_down... 
 */
function heap_sort(array, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    const n = array.length
    let i, j, k, m, t, sorted_array = [], sorted_indices = [], condition
    i = 0
    while (i < (n >> 2)) {
        sorted_array[i << 2] = array[i << 2]
        sorted_indices[i << 2] = i << 2
        sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
        sorted_indices[(i << 2) + 1] = (i << 2) + 1
        sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
        sorted_indices[(i << 2) + 2] = (i << 2) + 2
        sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        sorted_indices[(i << 2) + 3] = (i << 2) + 3
        ++i
    }
    if (n % 4 >= 1) {
        sorted_array[n - 1] = array[n - 1]
        sorted_indices[n - 1] = n - 1
    }
    if (n % 4 >= 2) {
        sorted_array[n - 2] = array[n - 2]
        sorted_indices[n - 2] = n - 2
    }
    if (n % 4 >= 3) {
        sorted_array[n - 3] = array[n - 3]
        sorted_indices[n - 3] = n - 3
    }
    // transform the array into heap...
    k = (n - 2) >> 1
    while (k >= 0) {
        // shift down
        j = k
        while ((j << 1) + 1 <= n - 1) {
            m = j
            condition = mode ? sorted_array[m] < sorted_array[(j << 1) + 1] : sorted_array[m] > sorted_array[(j << 1) + 1]
            if (condition) m = (j << 1) + 1
            condition = mode ? sorted_array[m] < sorted_array[(j + 1) << 1] : sorted_array[m] > sorted_array[(j + 1) << 1]
            if ((j + 1) << 1 <= n - 1 && condition) m = (j + 1) << 1
            if (m === j) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[j]
                sorted_array[j] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[j]
                sorted_indices[j] = t
                j = m
            }
        }
        --k
    }
    // sort the array with the heap sort...
    k = n - 1
    while (k > 0) {
        // swap the k and the 0 elements
        t = sorted_array[0]
        sorted_array[0] = sorted_array[k]
        sorted_array[k] = t
        t = sorted_indices[0]
        sorted_indices[0] = sorted_indices[k]
        sorted_indices[k] = t
        --k
        // shift down the subarray sorted_array[0:k]
        i = 0
        while ((i << 1) + 1 <= k) {
            m = i
            condition = mode ? sorted_array[m] < sorted_array[(i << 1) + 1] : sorted_array[m] > sorted_array[(i << 1) + 1]
            if (condition) m = (i << 1) + 1
            condition = mode ? sorted_array[m] < sorted_array[(i + 1) << 1] : sorted_array[m] > sorted_array[(i + 1) << 1]
            if (((i + 1) << 1) <= k && condition) m = (i + 1) << 1
            if (i === m) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[i]
                sorted_array[i] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[i]
                sorted_indices[i] = t
                i = m
            }
        }
    }
    return { array: sorted_array, indices: sorted_indices }
}

function insertion_sort(array, ascending_order) {
    if (typeof ascending_order === 'undefined') ascending_order = true
    if (ascending_order === 'decrease') ascending_order = false
    const n = array.length
    let i, j, sorted_array = [...array], p, k, condition,
        sorted_indices = sorted_array.map((e, i) => e = i)
    for (i = 1; i < n; i++) {
        p = sorted_array[i]
        k = sorted_indices[i]
        j = i - 1
        while (1) {
            condition = ascending_order ? sorted_array[j] <= p : sorted_array[j] >= p
            if (j < 0 || condition) break
            sorted_array[j + 1] = sorted_array[j]
            sorted_indices[j + 1] = sorted_indices[j]
            --j
        }
        sorted_array[j + 1] = p
        sorted_indices[j + 1] = k
    }
    return { array: sorted_array, indices: sorted_indices }
}

/**
 * 
 * @param {Array} array 
 * @param {boolean} mode
 * @returns {{array : Array, indices : Array}} 
 * @description this is an utility function for the
 * statistics library of the euriklis package. The
 * function implements the merge sort algorithm. We
 * have done some improvements for the more efficient
 * functionality of the algorithm. First we do not use
 * recursion in the algorithm, second we do not use
 * additional arrays to keep the items of the initial
 * array that have to be merged. Third we implement the
 * sorting algorithm directly into the function without
 * calling any additional function. These three things
 * improve the speed and the time efficiency of the algorithm
 * more than two times according to our metrics.
 */
function mergeSort(array, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    const n = array.length
    let condition, i, j, k, l, p, s, t, w, v, x,
        sorted_array = [], sorted_indices = [],
        copied_array = [], copied_indices = []
    // copy the array
    for (i = 0; i < n >> 2; i++) {
        copied_array[i << 2] = array[i << 2]
        copied_indices[i << 2] = i << 2
        copied_array[(i << 2) + 1] = array[(i << 2) + 1]
        copied_indices[(i << 2) + 1] = (i << 2) + 1
        copied_array[(i << 2) + 2] = array[(i << 2) + 2]
        copied_indices[(i << 2) + 2] = (i << 2) + 2
        copied_array[(i << 2) + 3] = array[(i << 2) + 3]
        copied_indices[(i << 2) + 3] = (i << 2) + 3
    }
    if (n % 4 >= 1) {
        copied_array[n - 1] = array[n - 1]
        copied_indices[n - 1] = n - 1
    }
    if (n % 4 >= 2) {
        copied_array[n - 2] = array[n - 2]
        copied_indices[n - 2] = n - 2
    }
    if (n % 4 >= 3) {
        copied_array[n - 3] = array[n - 3]
        copied_indices[n - 3] = n - 3
    }
    k = 1
    while (k < n) {
        p = (((n / k) >> 0) + ((n % k) ? 1 : 0))
        for (s = 0; s < p >> 1; s++) {
            w = (s << 1) * k
            v = ((s << 1) + 1) * k
            t = ((s + 1) << 1) * k >= n ? n : ((s + 1) << 1) * k
            i = w
            j = v
            l = w
            while (i < v && j < t) {
                condition = mode ? copied_array[i] < copied_array[j] : copied_array[i] > copied_array[j]
                if (condition) {
                    sorted_array[l] = copied_array[i]
                    sorted_indices[l] = copied_indices[i]
                    ++i
                }
                else {
                    sorted_array[l] = copied_array[j]
                    sorted_indices[l] = copied_indices[j]
                    ++j
                }
                ++l
            }
            if (i >= v) {
                for (x = j; x < t; x++) {
                    sorted_array[l + x - j] = copied_array[x]
                    sorted_indices[l + x - j] = copied_indices[x]
                }
            }
            if (j >= t) {
                for (x = i; x < v; x++) {
                    sorted_array[l + x - i] = copied_array[x]
                    sorted_indices[l + x - i] = copied_indices[x]
                }
            }
        }
        if (k === 1 && (n & 1)) {
            sorted_array[n - 1] = copied_array[n - 1]
            sorted_indices[n - 1] = copied_indices[n - 1]
        }
        // copy the sort_indices into the copied indices...
        for (i = 0; i < n >> 2; i++) {
            copied_array[i << 2] = sorted_array[i << 2]
            copied_indices[i << 2] = sorted_indices[i << 2]
            copied_array[(i << 2) + 1] = sorted_array[(i << 2) + 1]
            copied_indices[(i << 2) + 1] = sorted_indices[(i << 2) + 1]
            copied_array[(i << 2) + 2] = sorted_array[(i << 2) + 2]
            copied_indices[(i << 2) + 2] = sorted_indices[(i << 2) + 2]
            copied_array[(i << 2) + 3] = sorted_array[(i << 2) + 3]
            copied_indices[(i << 2) + 3] = sorted_indices[(i << 2) + 3]
        }
        if (n % 4 >= 1) {
            copied_array[n - 1] = sorted_array[n - 1]
            copied_indices[n - 1] = sorted_indices[n - 1]
        }
        if (n % 4 >= 2) {
            copied_array[n - 2] = sorted_array[n - 2]
            copied_indices[n - 2] = sorted_indices[n - 2]
        }
        if (n % 4 >= 3) {
            copied_array[n - 3] = sorted_array[n - 3]
            copied_indices[n - 3] = sorted_indices[n - 3]
        }
        k <<= 1
    }
    return { array: sorted_array, indices: sorted_indices }
}

/**
 * 
 * @param {Array} array
 * @param {boolean} ascending_order
 * @returns {Array} sorted_array
 * @description this function is an utility
 * function for the statistics library of the
 * euriklis package. This function sorts the 
 * elements of an unordered array of numbers.
 * Definition: Rigid (static) point of an arbitrary 
 * array is a point which preserve its position when
 * the array is sorted. 
 * Definition: Turning point of an array is a point that
 * is rigid point and all the elements before this point 
 * are smaller than this point and all the elements after
 * it are higher than this point.
 * Proposition: An array is sorted if every element is turning
 * point. So if a point is a turning point, then
 * it will be stable an do not be changed when the array
 * will be sorted. If an array is sorted, then no changing
 * point will exists, because if such a point exists, then
 * this array will be not sorted.
 * So to construct an algorithm that sorts all the elements
 * of an array we have identify its turning points. In the
 * algorithm that follows we use the term "pivot" as an
 * alternative to the turning point.
 * The algorithm can be described with the following steps:
 * 1. Initialize the sorted_array to copied array,
 * mode to true by default and to false if is set to decrease.
 * Set also the n to the length of the array. Create the tail
 * queue and set it to [0, n - 1] initially.
 * 2. Loop forever
 * 3. If tail is empty, break the loop 2.
 * 4. [first, last] = tail.pop() // get the last elements of the tail.
 * 5. i = first, j = last, p = sorted_array[first]
 * 6. loop forever:
 * 7. If i === j go to step 12, otherwise 
 * If mode is true and  sorted_array[j] < p then condition = true
 * else condition = false
 * 8. If mode is false and sorted_array[j] > p then condition = true
 * otherwise the condition = false.
 * 9. If condition is true, then decrease the j with unit
 * and go to the step 7, otherwise swap the elements
 * sorted_array[i] with sorted_array[j] and go to step 10.
 * 10. if i < j increase the i with unit. Else go to step 12.
 * 11. If sorted_array[j] (this is the p or the pivot element)
 * is bigger or equal than the sorted_array[i] then
 * go to the step 10, otherwise swap the elements
 * sorted_array[i] with the sorted_array[j] and go to the step 7.
 * 12. In this step i has to be equal to j, so
 * we have to put the two sequences into the tail element.
 * if j - first > 1 then tail.push([first, j - 1])
 * if last - j > 1 then tail.push([j + 1, last])
 * break loop 6.
 * 
 */
function quickSort(array, mode) {
    let i, j, p, sorted_array = [], temp,
        tail = [], condition, first, last, sorted_indices = []
    const n = array.length
    for (i = 0; i < n >> 2; i++) {
        sorted_array[i << 2] = array[i << 2]
        sorted_indices[i << 2] = i << 2
        sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
        sorted_indices[(i << 2) + 1] = (i << 2) + 1
        sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
        sorted_indices[(i << 2) + 2] = (i << 2) + 2
        sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        sorted_indices[(i << 2) + 3] = (i << 2) + 3
    }
    if (n % 4 >= 1) {
        sorted_array[n - 1] = array[n - 1]
        sorted_indices[n - 1] = n - 1
    }
    if (n % 4 >= 2) {
        sorted_array[n - 2] = array[n - 2]
        sorted_indices[n - 2] = n - 2
    }
    if (n % 4 >= 3) {
        sorted_array[n - 3] = array[n - 3]
        sorted_indices[n - 3] = n - 3
    }
    if (mode === 'decrease') mode = false
    if (typeof mode === 'undefined') mode = true
    tail.push([0, n - 1])
    while (1) {
        if (!tail.length) break
        [first, last] = tail.pop()
        i = first
        j = last
        p = sorted_array[first]
        while (1) {
            if (i === j || i >= j) break
            condition = mode ? p > sorted_array[j] : p < sorted_array[j]
            if (condition) {
                temp = sorted_array[i]
                sorted_array[i] = sorted_array[j]
                sorted_array[j] = temp
                temp = sorted_indices[i]
                sorted_indices[i] = sorted_indices[j]
                sorted_indices[j] = temp
                while (1) {
                    if (i === j || i >= j) break
                    ++i // note that p = sorted_array[j]
                    condition = mode ? sorted_array[i] > p : sorted_array[i] < p
                    if (condition) {
                        temp = sorted_array[i]
                        sorted_array[i] = sorted_array[j]
                        sorted_array[j] = temp
                        temp = sorted_indices[i]
                        sorted_indices[i] = sorted_indices[j]
                        sorted_indices[j] = temp
                        break
                    } else continue
                }
            } else --j
        }
        if (j - first > 1) tail.push([first, j - 1])
        if (last - j > 1) tail.push([j + 1, last])
    }
    return { array: sorted_array, indices: sorted_indices }
}
/**
 * 
 * @param {Array.<string | number>} array 
 * @param {string | number} element
 * @param {boolean | 'increase' | 'decrease'} [mode]
 * @returns {Array.<number | string>}
 * @description this function returns an updated array
 * from the initial array parameter, which does not contains
 * the element parameter in it. If the element however does not
 * exists in the array, then the initial array will be returned
 * as output without any changes. The array is assumed to be sorted.
 * Note that this element returns only the first element which is
 * equals to the element. The method uses the bisection method.
 */
function removeElementFromSortedArray(array, element, mode) {
    const n = array.length, updatedArray = [];
    if (typeof mode === 'undefined') mode = true;
    if (mode === 'decrease') mode = false;
    const undefined_element = new validator(element).is_undefined().and().not().is_number()
        .and().not().is_string().answer;
    if (undefined_element) return array;
    let i, j, start = 0, end = n - 1, middle, condition;
    while (true) {
        middle = (start + end) >> 1;
        condition = mode ? array[middle] >= element : array[middle] <= element;
        if (start === end && middle === end) break;
        if (condition) end = middle;
        else start = middle + 1;
    }
    // in this phase we have located the index of the element that
    // is at least equal to the element.
    if (new validator(array[middle]).is_same(element).answer) {
        // for all elements of the array form 0 to middle
        // make copy of the array, and then continue without the
        // element array[middle].
        for (i = 0; i < (n - 1) >> 2; i++) {
            j = i << 2;
            if (j < middle) updatedArray[j] = array[j];
            if (j >= middle) updatedArray[j] = array[j + 1];
            ++j;
            if (j < middle) updatedArray[j] = array[j];
            if (j >= middle) updatedArray[j] = array[j + 1];
            ++j;
            if (j < middle) updatedArray[j] = array[j];
            if (j >= middle) updatedArray[j] = array[j + 1];
            ++j;
            if (j < middle) updatedArray[j] = array[j];
            if (j >= middle) updatedArray[j] = array[j + 1];
        }
        if ((n - 1) % 4 >= 1) {
            if ((n - 2) >= middle) updatedArray[n - 2] = array[n - 1];
            if ((n - 2) < middle) updatedArray[n - 2] = array[n - 2]; // this is not possible
        }
        if ((n - 1) % 4 >= 2) {
            if ((n - 3) >= middle) updatedArray[n - 3] = array[n - 2];
            if ((n - 3) < middle) updatedArray[n - 3] = array[n - 3];
        }
        if ((n - 1) % 4 >= 3) {
            if ((n - 4) >= middle) updatedArray[n - 4] = array[n - 3];
            if ((n - 4) < middle) updatedArray[n - 4] = array[n - 4];
        }
    } else return array;
    return updatedArray;
}

/**
 * 
 * @param {Array.<object>} array
 * @param {string | Array.<string>} property
 * @param {object} element
 * @param {boolean | 'increase' | 'decrease'} [mode]
 * @returns {Array.<object>}
 * @description this function returns an array which does
 * not consists the element parameter. If this parameter does 
 * not exists in the underlined array, then the same array will 
 * be returned as output, but if the element exists in the array
 * it will be removed. The difference with the remove_element_form_sorted_array
 * is that in this method we assume that the array is relatively sorted, i.e.,
 * the array is sorted by some object property.  
 */
function removeElementFromSortedObjectArray(array, property, element, mode) {
    if (typeof mode === 'undefined') mode = true;
    if (mode === 'decrease') mode = false;
    if (new validator(element).is_undefined().or().not().is_object().answer) return array;
    new validator(property).is_string().on(true, () => property = [property]);
    const n = array.length, m = property.length;
    let i, j, start = 0, end = n - 1, middle, arr_el,
        el_p = Object.assign({}, element), condition,
        updatedArray = [];
    for (i = 0; i < m; i++) {
        new validator(el_p[property[i]]).is_object()
            .and().bind(new validator(i).is_lesser_than(m - 1))
            .on(true, () => el_p = el_p[property[i]])
            .on(false, () => {
                if (i !== m - 1) errors.IncorrectPropertyParameterInRemoveElementFromSortedObjectArray();
            });
        new validator(el_p[property[i]]).is_string().or().is_number()
            .and().bind(
                new validator(i).is_same(m - 1)
            ).on(true, () => el_p = el_p[property[i]])
            .on(false, () => {
                if (i === m - 1) errors.IncorrectPropertyParameterInRemoveElementFromSortedObjectArray();
            });
    }
    while (true) {
        middle = (start + end) >> 1;
        arr_el = array[middle];
        for (i = 0; i < m; i++) {
            new validator(arr_el[property[i]])
                .is_object().and().bind(
                    new validator(i).is_lesser_than(m - 1)
                ).on(true, () => {
                    arr_el = arr_el[property[i]];
                }).on(false, () => {
                    if (i < m - 1) errors.IncorrectArrayInRemoveElementFromSortedObjectArray();
                });
            new validator(i).is_same(m - 1)
                .and().bind(
                    new validator(arr_el[property[i]]).is_string().or().is_number()
                ).on(true, () => {
                    arr_el = arr_el[property[i]];
                }).on(false, () => {
                    if (i === m - 1) errors.IncorrectArrayInRemoveElementFromSortedObjectArray();
                });
        }
        condition = mode ? arr_el >= el_p : arr_el <= el_p;
        if (start === end && middle === end) break;
        if (condition) end = middle;
        else start = middle + 1;
    }
    if (new validator(array[middle]).is_same(element).answer) {
        for (i = 0; i < (n - 1) >> 2; i++) {
            j = i << 2;
            if (j < middle) updatedArray[j] = array[j];
            if (j >= middle) updatedArray[j] = array[j + 1];
            ++j;
            if (j < middle) updatedArray[j] = array[j];
            if (j >= middle) updatedArray[j] = array[j + 1];
            ++j;
            if (j < middle) updatedArray[j] = array[j];
            if (j >= middle) updatedArray[j] = array[j + 1];
            ++j;
            if (j < middle) updatedArray[j] = array[j];
            if (j >= middle) updatedArray[j] = array[j + 1];
        }
        if ((n - 1) % 4 >= 1) {
            if ((n - 2) >= middle) updatedArray[n - 2] = array[n - 1];
            if ((n - 2) < middle) updatedArray[n - 2] = array[n - 2];
        }
        if ((n - 1) % 4 >= 2) {
            if ((n - 3) >= middle) updatedArray[n - 3] = array[n - 2];
            if ((n - 3) < middle) updatedArray[n - 3] = array[n - 3];
        }
        if ((n - 1) % 4 >= 3) {
            if ((n - 4) >= middle) updatedArray[n - 4] = array[n - 3];
            if ((n - 4) < middle) updatedArray[n - 4] = array[n - 4];
        }
    } else return array;
    return updatedArray;
}
/**
 * 
 * @param {Array.<number | string>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array : Array.<number | string>, indices : Array.<number>}} 
 * @description this is an utility function that implements the
 * selection sort algorithm.
 */
function selection_sort(array, mode) {
    if (mode === 'decrease') mode = false
    if (typeof mode === 'undefined') mode = true
    const n = array.length
    let i, j, m, condition, temp,
        sorted_array = [...array],
        sorted_indices = sorted_array.map((e, i) => e = i)
    for (i = 0; i < n - 1; i++) {
        m = i
        for (j = i + 1; j < n; j++) {
            condition = mode ? sorted_array[j] < sorted_array[m] : sorted_array[j] > sorted_array[m]
            if (condition) m = j
        }
        if (m !== i) {
            temp = sorted_array[m]
            sorted_array[m] = sorted_array[i]
            sorted_array[i] = temp
            temp = sorted_indices[m]
            sorted_indices[m] = sorted_indices[i]
            sorted_indices[i] = temp
        }
    }
    return { array: sorted_array, indices: sorted_indices }
}


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
function sort_object_array_by_property(array, property, mode, algorithm) {
    let i, item, j, k, sorted_array = [],
        sorted_indices = [], temp_array = [],
        temp_indices = [], temp
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    if (typeof algorithm === 'undefined') algorithm = 'quick sort'
    if (typeof algorithm !== 'string') algorithm = 'quick sort'
    // copy the property values into the temp array
    const n = array.length
    for (i = 0; i < n >> 2; i++) {
        new validator(array[i << 2]).not().is_object()
            .or().bind(
                new validator(array[(i << 2) + 1]).not().is_object()
            )
            .or().bind(
                new validator(array[(i << 2) + 2]).not().is_object()
            )
            .or().bind(
                new validator(array[(i << 2) + 3]).not().is_object()
            ).on(true, () =>
                errors.IncorrectArrayParameterInSortObjectArray()
            )
        k = 0
        while (k <= 3) {
            item = array[(i << 2) + k]
            if (typeof property === 'string') property = [property]
            for (j = 0; j < property.length; j++) {
                new validator(j).is_lesser_than(property.length - 1)
                    .and().bind(
                        new validator(item).not().is_object()
                    ).on(true, () => {
                        errors.IncorrectPropertyInSortObjectArray()
                    })
                item = item[property[j]]
            }
            temp = item
            new validator(temp).is_string().or().is_number()
                .on(true, () => {
                    temp = item
                    temp_array.push(temp)
                    temp_indices.push((i << 2) + k)
                })
            ++k
        }
    }
    if (n % 4 >= 1) {
        item = array[n - 1]
        new validator(item).not().is_object()
            .on(true, () => errors.IncorrectArrayParameterInSortObjectArray())
        if (typeof property === 'string') {
            property = [property]
        }
        for (j = 0; j < property.length; j++) {
            new validator(j).is_lesser_than(property.length - 1)
                .and().bind(
                    new validator(item).not().is_object()
                ).on(true, () => errors.IncorrectArrayParameterInSortObjectArray())
            item = item[property[j]]
        }
        new validator(item).is_number().or().is_string()
            .on(true, () => {
                temp = item
                temp_array.push(temp)
                temp_indices.push(n - 1)
            })
    }
    if (n % 4 >= 2) {
        item = array[n - 2]
        new validator(item).not().is_object()
            .on(true, () => errors.IncorrectArrayParameterInSortObjectArray())
        if (typeof property === 'string') property = [property]

        for (j = 0; j < property.length; j++) {
            new validator(j).is_lesser_than(property.length - 1)
                .and().bind(
                    new validator(item).not().is_object()
                ).on(true, () => errors.IncorrectArrayParameterInSortObjectArray())
            item = item[property[j]]
        }
        new validator(item).is_number().or().is_string()
            .on(true, () => {
                temp = item
                temp_array.push(temp)
                temp_indices.push(n - 2)
            })
    }
    if (n % 4 >= 3) {
        item = array[n - 3]
        new validator(item).not().is_object()
            .on(true, () => errors.IncorrectArrayParameterInSortObjectArray())
        if (typeof property === 'string') {
            property = [property]
        }
        for (j = 0; j < property.length; j++) {
            new validator(j).is_lesser_than(property.length - 1)
                .and().bind(
                    new validator(item).not().is_object()
                ).on(true, () => errors.IncorrectArrayParameterInSortObjectArray())
            item = item[property[j]]
        }
        new validator(item).is_number().or().is_string()
            .on(true, () => {
                temp = item
                temp_array.push(temp)
                temp_indices.push(n - 3)
            })
    }
    // sort the temp array element with the algorithm. 
    if (algorithm === 'quick sort') temp = quickSort(temp_array, mode)
    if (algorithm === 'merge sort') temp = mergeSort(temp_array, mode)
    if (algorithm === 'heap sort') temp = heap_sort(temp_array, mode)
    if (algorithm === 'bucket sort') temp = bucket_sort(temp_array, temp_array.length >> 1, mode)
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

/**
 * 
 * @param {array} array
 * @param {"merge sort" | "quick sort" | "bubble sort"} method
 * @param {boolean} ascending_order
 * @returns {array} sorted_array
 * @description this function is an utility
 * method for the Statistics library that
 * sorts the array with the merge sort,
 * quick sort algorithms. If the user does not
 * select the method then by default the function
 * selects the 'merge sort' method.
 */
function SortArray(array, method, ascending_order = true) {
    if (method === 'quick sort') sorted_array = quickSort(array, ascending_order)
    else if (method === 'bubble sort') sorted_array = bubble_sort(array, ascending_order)
    else if (method === 'heap sort') sorted_array = heap_sort(array, ascending_order)
    else if (method === 'insertion sort') sorted_array = insertion_sort(array, ascending_order)
    else sorted_array = merge_sort(array, ascending_order)
    return sorted_array
}

const sorting_algorithms = {
    addElementInSortedArray,
    addElementInSortedObjectArrayByProperty,
    bubble_sort,
    BubbleSort: bubble_sort,
    Bubble_sort: bubble_sort,
    bucket_sort,
    bucketSort: bucket_sort,
    BucketSort: bucket_sort,
    cocktail_sort,
    CocktailSort: cocktail_sort,
    cocktailSort: cocktail_sort,
    filterWithValidator,
    find_best_elements: find_best_elements,
    findBestElements: find_best_elements,
    FindBestElements: find_best_elements,
    find_best_for_object_array_by_property,
    findElementsInSortedArray,
    findElementsInSortedObjectArray,
    find_worst_elements: find_worst_elements,
    findWorstElements: find_worst_elements,
    FindWorstElements: find_worst_elements,
    find_worst_for_object_array_by_property,
    generate_random_array: generate_random_array,
    GenerateRandomArray: generate_random_array,
    Generate_random_array: generate_random_array,
    generate_random_string_array,
    heap_sort,
    heapSort: heap_sort,
    HeapSort: heap_sort,
    insertion_sort,
    insertionSort: insertion_sort,
    InsertionSort: insertion_sort,
    merge_sort: mergeSort,
    MergeSort: mergeSort,
    Merge_sort: mergeSort,
    quick_sort: quickSort,
    QuickSort: quickSort,
    Quick_sort: quickSort,
    remove_element_form_sorted_array: removeElementFromSortedArray,
    remove_element_from_sorted_object_array: removeElementFromSortedObjectArray,
    selection_sort,
    selectionSort: selection_sort,
    SelectionSort: selection_sort,
    SortArray,
    sort_object_array_by_property: sort_object_array_by_property,
}
module.exports = sorting_algorithms;