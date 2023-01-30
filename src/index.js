'use strict';
import {
    IsArray,
    IsBoolean,
    IsCorrectElement,
    IsCorrectlyDefinedIndices,
    IsCorrectObjectArray,
    IsEmpty,
    IsFunction,
    IsInteger,
    IsNumber,
    IsNumberArray,
    IsObject,
    IsSameWithAny,
    IsSortingAlgorithm,
    IsSortMode,
    IsStatus,
    IsString,
    IsStringArray,
    IsStringOrNumberArray,
    IsUndefined,
} from './Conditions/index.js';
import * as errors from './Errors/index.js';
import * as infos from './Infos/index.js';
import * as models from './Models/index.js';
const package_file = { version: '4.1.1', author: 'Velislav S. Karastoychev' };
import validator from '@euriklis/validator';
import * as warnings from './Warnings/index.js';
class SortLib {
    #algorithm = 'merge sort';
    #array = [];
    #indices = [];
    #sort_mode = 'increase';
    #status = 'unsorted';
    #warnings = false;
    /**
     * 
     * @param {{
     * array : Array.<number | string>, 
     * algorithm : "merge sort" | "quick sort" | "insertion sort" | "bubble sort" | "heap sort", 
     * "sort mode" : "increase" | "decrease" | true | false, 
     * status : "sorted" | "unsorted", indices : Array}} options
     * @returns {SortLib}
     * @description The constructor of the SortLib instance.
     * The user has to pss an object with properties array, indices,
     * algorithm and sort mode to use the sorting algorithms of this library. 
     */
    constructor(options) {
        if (IsObject(options)) {
            if (IsUndefined(options.array)) {
                if (this.show_warnings) warnings.UndefinedArrayInSortLibConstructor();
            } else this.array = options.array;
            this.algorithm = options.algorithm;
            this.sort_mode = options['sort mode'];
            this.status = 'unsorted';
            this.status = options.status;
            this.indices = options.indices;
        }
    }
    get show_warnings() {
        return this.#warnings;
    }
    set show_warnings(warnings) {
        if (IsBoolean(warnings)) this.#warnings = warnings;
    }
    static version = package_file.version;
    static author = package_file.author;
    /**
     * @method addElementInSortedArray
     * @param {Array<number | string>} array 
     * @param {number} element
     * @returns {SortLib}
     * @description this method implements the
     * bisection algorithm for inserting of element in
     * an ordered (sorted) array. We assume that the
     * array which uses the user is of number or string type.
     * The array is not SortLib instance. The method returns
     * the result of inserting of the element in an SortLib
     * instance.
     */
    static addElementInSortedArray(array, element, ascending_order) {
        if (!IsStringOrNumberArray(array) && !IsEmpty(array)) {
            errors.IncorrectArrayInAddElementInSortedArray();
        }
        return new SortLib({ array: array, 'sort mode': ascending_order, status: 'sorted' }).add(element);
    }
    /**
     * 
     * @method add_element_in_sorted_array
     * @param {Array.<number | string>} array 
     * @param {number | string} element
     * @param {boolean | 'increase' | 'decrease' } ascending_order
     * @return {SortLib}
     * @description this method is copy of the addElementInSortedArray
     * static method. 
     */
    static add_element_in_sorted_array(array, element, ascending_order = true) {
        return SortLib.addElementInSortedArray(array, element, ascending_order);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {number | string} element 
     * @param {boolean | "increase" | "decrease"} ascending_order 
     * @returns {Promise<SortLib, Error>}
     */
    static async add_element_in_sorted_array_async(array, element, ascending_order = true) {
        const dt1 = performance.now();
        if (!IsStringOrNumberArray(array) && !IsEmpty(array)) {
            errors.IncorrectArrayInAddElementInSortedArray();
        }
        const result = new SortLib({ array: array, 'sort mode': ascending_order, status: 'sorted' }).add(element);
        const dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result
    }
    /**
     * 
     * @param {Array.<object>} array 
     * @param {Array.<string> | string} property 
     * @param {object} element
     * @param {boolean | 'increase' | 'decrease'} [mode]
     * @returns {Array.<object>}
     * @description this method is an analogue of the
     * add_element_in_sorted_array static method for
     * number and string array. The method gets three
     * parameters which are namely the array, the
     * property and the element that have to be added.
     * The property may be both string array or string
     * and represents the keys of the object which have to
     * be observed from the sorted array. The array is sorted
     * only for the observed property.  
     */
    static add_element_in_sorted_object_array_by_property(array, property, element, mode, test_array = false) {
        if (!IsObject(element)) {
            errors.IncorrectElementInAddElementInSortedObjectArrayByProperty();
        }
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInAddElementInSortedObjectArrayByProperty();
        }
        if (!IsCorrectElement(element, property)) {
            errors.IncorrectElementInAddElementInSortedObjectArrayByProperty();
        }
        if (test_array) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty();
            }
        }
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else mode = true;
        }
        if (IsEmpty(array)) return [element];
        return models.AddElementInSortedObjectArrayByProperty(array, property, element, mode);
    }
    /**
     * 
     * @param {Array.<{}>} array 
     * @param {string | Array.<string>} property 
     * @param {{}} element 
     * @param {boolean | 'increase' | 'decrease'} mode 
     * @param {boolean} test_array 
     * @returns {Promise<{array: Array.<{}>, time_execution: number}>}
     * @description this method applies the bisection algorithm to
     * an array of object elements asynchronously and return the
     * as result the extended array and the time execution of the
     * algorithm.
     */
    static async add_element_in_sorted_object_array_by_property_async(array, property, element, mode, test_array = false) {
        let dt1 = performance.now(), dt2, result;
        if (!IsObject(element)) {
            errors.IncorrectElementInAddElementInSortedObjectArrayByProperty();
        }
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInAddElementInSortedObjectArrayByProperty();
        }
        if (!IsCorrectElement(element, property)) {
            errors.IncorrectElementInAddElementInSortedObjectArrayByProperty();
        }
        if (test_array) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayParameterInAddElementInSortedObjectArrayByProperty();
            }
        }
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else mode = true;
        }
        if (IsEmpty(array)) result = [element];
        result = { array: models.AddElementInSortedObjectArrayByProperty(array, property, element, mode), time_execution: 0.001 * (dt2 - dt1) };
        dt2 = performance.now();
        result.time_execution = 0.001 * [dt2 - dt1];
        return result;
    }
    /**
     * 
     * @param {Array.<number | string | {}>} array 
     * @param {function(number, number, Array):boolean} callback 
     * @returns {{array: Array.<number | string | {}>,indices: Array.<number>}}
     */
    static filter(array, callback) {
        if (!IsArray(array)) {
            errors.IncorrectArrayParameterInFilter();
        }
        if (!IsFunction(callback)) {
            errors.IncorrectCallbackParameterInFilter();
        }
        return models.Filter(array, callback);
    }
    /**
     * 
     * @param {Array.<{} | string | number>} array 
     * @param {function(number, number, Array)} callback 
     * @returns {Promise<{array: Array, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method applies the filter method in an
     * asynchronous mode.
     */
    static async filter_async(array, callback) {
        let dt1 = performance.now(), dt2, result;
        if (!IsArray(array)) {
            errors.IncorrectArrayParameterInFilter();
        }
        if (!IsFunction(callback)) {
            errors.IncorrectCallbackParameterInFilter();
        }
        result = models.Filter(array, callback);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<any>} array 
     * @param {function(validator, number)} callback
     * @returns {{array: Array, indices: Array.<number>}}
     * @description this function localize all array elements
     * which satisfy the callback validator condition. This method
     * may perform searching in non sorted array efficiently.
     * @example
     * const array = [{id: 1}, {id: 2, {id: 3}, {id: 4}, {id: 5}];
     * const filter = SortLib.filter_with_validator(array, (el, iter) => {
     *    return el.interface2({id: id => id.is_lesser_than(4)});
     * });
     */
    static filter_with_validator(array, callback) {
        if (!IsArray(array)) {
            errors.IncorrectArrayInFilterWithValidator();
        }
        if (!IsFunction(callback)) {
            errors.IncorrectArgumentOfCallbackInFilterWithValidator();
        }
        return models.FilterWithValidator(array, callback);
    }
    /**
     * 
     * @param {Array.<{} | string | number>} array 
     * @param {function(validator, number)} callback 
     * @returns {Promise.<{array: Array.<{} | string | number>, indices: Array.<number>, time_execution: number}>}
     * @description this method is the asynchronous version
     * corresponded to the filter_with_validator() method.
     */
    static async filter_with_validator_async(array, callback) {
        let result, dt1 = performance.now(), dt2;
        if (!IsArray(array)) {
            errors.IncorrectArrayInFilterWithValidator();
        }
        if (!IsFunction(callback)) {
            errors.IncorrectArgumentOfCallbackInFilterWithValidator();
        }
        result = models.FilterWithValidator(array, callback);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }

    /**
     *
     * @method find_elements_in_sorted_array
     * @param {Array.<number | string>} array 
     * @param {number | string} element
     * @param {boolean | 'increase' | 'decrease' } mode
     * @returns {{array : Array.<number | string>, index : Array.<number>}}
     * @description this function uses the bisection method to
     * locate (find) an element in an ordered array which is
     * definitely string or number array. The method assumes that
     * the array is already sorted and does not checks if the array
     * parameter is ordered. Also the method checks if the mode of
     * ascendence of the array is increasing or decreasing.
     * Note that this method does not tests the array for orderliness.
     * So be watchful for that if the array is sorted or not, because
     * this method works correct only if the array is sorted.
     * @example
     * SortLib.find_element_in_sorted_array(array, 59); 
     */
    static find_elements_in_sorted_array(array, element, mode) {
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else mode = true;
        }
        if (!IsNumber(element) && !IsString(element)) {
            errors.IncorrectElementInFindElementInSortedArray()
        }
        if (!IsStringOrNumberArray(array) && !IsEmpty(array)) {
            errors.IncorrectArrayParameterInFindElementInSortedArray()
        }
        if (array.length === 0) return { array: [], indices: [-1] };
        return models.FindElementsInSortedArray(array, element, mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {number | string} element 
     * @param {boolean | 'increase' | 'decrease'} mode 
     * @returns {Promise<{array: Array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method executes the bisection algorithm to detect an
     * element in sorted array and then searches if this element exists many times
     * in the array asynchronously. The output is like the conventional method
     * find_elements_in_sorted_array but has an additional property called
     * time_execution which returns the time spent for the detection of all elements.
     */
    static async find_elements_in_sorted_array_async(array, element, mode) {
        let result, dt2, dt1 = performance.now();
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else mode = true;
        }
        if (!IsNumber(element) && !IsString(element)) {
            errors.IncorrectElementInFindElementInSortedArray()
        }
        if (!IsStringOrNumberArray(array) && !IsEmpty(array)) {
            errors.IncorrectArrayParameterInFindElementInSortedArray()
        }
        if (array.length === 0) return { array: [], indices: [-1] };
        result = models.FindElementsInSortedArray(array, element, mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }

    /**
     * 
     * @param {Array.<object>} array 
     * @param {Array.<string>} property 
     * @param {object} element 
     * @param {boolean | 'increase' | 'decrease'} [mode]
     * @returns {{array : Array.<object>, indices : Array.<number>}}
     * @description this method finds all the object elements that
     * are equals to the object type element parameter.
     */
    static find_elements_in_sorted_object_array_by_property(array, property, element, mode) {
        if (!IsArray(array)) {
            errors.IncorrectArrayInFindElementsInSortedObjectArray()
        };
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInFindElementsInSortedObjectArray();
        };
        if (!IsCorrectElement(element, property)) {
            errors.IncorrectElementParameterInFindElementsInSortedObjectArray();
        }
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else mode = true;
        }
        // when the array is empty, set the output to be empty.
        if (array.length === 0) return { array: [], indices: [-1] };
        return models.FindElementsInSortedObjectArrayByProperty(array, property, element, mode);
    }
    /**
     * 
     * @param {Array.<{}>} array 
     * @param {string | Array.<string>} property 
     * @param {{}} element 
     * @param {boolean | 'increase' | 'decrease'} mode 
     * @returns {Promise<{array: Array.<{}>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the
     * find_elements_in_sorted_object_array_by_property method of the
     * SortLib package. The method returns a property "time_execution"
     * which does not exists in the conventional synchronous method,
     * which computes the time spent for the detection of the elements.
     * The method applies the bisection algorithm to detect the elements.
     */
    static async find_elements_in_sorted_object_array_by_property_async(array, property, element, mode) {
        let result, dt2, dt1 = performance.now();
        if (!IsArray(array)) {
            errors.IncorrectArrayInFindElementsInSortedObjectArray()
        };
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInFindElementsInSortedObjectArray();
        };
        if (!IsCorrectElement(element, property)) {
            errors.IncorrectElementParameterInFindElementsInSortedObjectArray();
        }
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else mode = true;
        }
        // when the array is empty, set the output to be empty.
        if (array.length === 0) result = { array: [], indices: [-1] };
        result = models.FindElementsInSortedObjectArrayByProperty(array, property, element, mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }

    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {number | string} element
     * @param {boolean | 'increase' | 'decrease'} mode
     * @returns {{array: Array.<number | string>, indices: Array.<number>}}
     * @description this method removes/deletes an element from
     * an array if this element really exists in the array. If the
     * element is not present in this array, then the method returns
     * the same array (and indices) as in the input of the function.The method
     * returns the indices without the index of the removed element. 
     */
    static remove_element_from_sorted_array(array, element, mode = true) {
        /*if (!conditions.IsNumberArray(array) && !conditions.IsStringArray(array)) {
            errors.IncorrectArrayInRemoveElementFromSortedArray();
        }*/
        if (!IsNumber(element) && !IsString(element)) {
            errors.IncorrectElementParameterInRemoveElementFromSortedArray();
        }
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else mode = true;
        }
        if (array.length === 0) return { array: [], indices: [-1] };
        return models.RemoveElementFormSortedArray(array, element, mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {number | string} element 
     * @param {boolean | 'increase' | 'decrease'} mode 
     * @returns {Promise<{array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the 
     * static method remove_element_from_sorted_array(). The method
     * returns the standard output object with array and indices properties
     * and in addition returns an property time_execution with the computed
     * time spent for the detection and deletion of the element.
     */
    static async remove_element_from_sorted_array_async(array, element, mode = true) {
        let result, dt2, dt1 = performance.now();
        /*if (!conditions.IsNumberArray(array) && !conditions.IsStringArray(array)) {
            errors.IncorrectArrayInRemoveElementFromSortedArray();
        }*/
        if (!IsNumber(element) && !IsString(element)) {
            errors.IncorrectElementParameterInRemoveElementFromSortedArray();
        }
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else mode = true;
        }
        if (array.length === 0) result = { array: [], indices: [-1] };
        result = models.RemoveElementFormSortedArray(array, element, mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }

    /**
     * 
     * @param {Array.<object>} array 
     * @param {string | Array} property 
     * @param {object} element 
     * @param {boolean | 'increase' | 'decrease'} mode
     * @param {boolean} test
     * @returns {{array: Array.<object>, indices : Array.<number>}}
     * @description this method removes/deletes a given element
     * from sorted by property array from object arrays. 
     */
    static remove_element_from_sorted_object_array_by_property(array, property, element, mode, test = false) {
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInRemoveElementFromSortedObjectArray();
        }
        if (test) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayInRemoveElementFromSortedObjectArray();
            }
        }
        if (!IsObject(element)) {
            errors.IncorrectElementParameterInRemoveElementFromSortedObjectArray();
        }
        if (!IsCorrectElement(element, property)) {
            errors.IncorrectElementParameterInRemoveElementFromSortedObjectArray();
        }
        // (re)define the mode
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else {
                errors.IncorrectModeParameterInRemoveElementFromSortedObjectArray();
            }
        }
        if (array.length === 0) return { array: [], indices: [] };
        return models.RemoveElementFromSortedObjectArray(array, property, element, mode);
    }
    /**
     * 
     * @param {Array.<{}>} array 
     * @param {string | Array.<string>} property 
     * @param {{}} element 
     * @param {boolean | 'increase' | 'decrease'} mode 
     * @param {boolean} test 
     * @returns {{array : Array.<object>, indices : Array.<number>, time_execution: number}}
     * @description this method is the corresponded asynchronous version of the
     * static method remove_element_from_sorted_object_array_by_property(). The method
     * returns also an additional property named "time_execution" which computes
     * the time spent for the detection and deletion of the underlined element.
     *  
     */
    static async remove_element_from_sorted_object_array_by_property_async(array, property, element, mode, test = false) {
        let result, dt2, dt1 = performance.now();
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInRemoveElementFromSortedObjectArray();
        }
        if (test) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayInRemoveElementFromSortedObjectArray();
            }
        }
        if (!IsObject(element)) {
            errors.IncorrectElementParameterInRemoveElementFromSortedObjectArray();
        }
        if (!IsCorrectElement(element, property)) {
            errors.IncorrectElementParameterInRemoveElementFromSortedObjectArray();
        }
        // (re)define the mode
        if (!IsBoolean(mode)) {
            if (mode === 'increase') mode = true;
            else if (mode === 'decrease') mode = false;
            else {
                errors.IncorrectModeParameterInRemoveElementFromSortedObjectArray();
            }
        }
        if (array.length === 0) result = { array: [], indices: [] };
        result = models.RemoveElementFromSortedObjectArray(array, property, element, mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }

    /**
     * @method merge_sort
     * @param {Array.<number | string>} array 
     * @param {'increase' | 'decrease' | boolean} sort_mode
     * @returns {{array : Array.<number | string>, indices : Array.<number>}}  
     * @description this static method implements the merge sort
     * algorithm that is invented from Jon von Neumann in 1945
     */
    static merge_sort(array, sort_mode) {
        return models.MergeSort(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method applies the merge sort algorithm asynchronously
     * to the underlined array parameter and returns a Promise with the properties
     * array - the sorted array, indices the indices of the sorted array and
     * time_execution - the time spent for the sorting of the array.
     */
    static async merge_sort_async(array, sort_mode) {
        let result, dt2, dt1 = performance.now();
        result = models.MergeSort(array, sort_mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | "increase" | "decrease"} sort_mode 
     * @returns {Array.<number | string>}
     * @description this method applies the merge sort algorithm
     * to sort an array and returns only the array without the
     * corresponded indices of the array.
     */
    static merge_sort_array(array, sort_mode) {
        return models.MergeSortArray(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, time_execution: number}>}
     * @description this method implements the merge sort algorithm for array
     * in its asynchronous version. In addition the method returns
     * the time needed for the execution of the algorithm.
     */
    static async merge_sort_array_async(__array__, sort_mode) {
        let array, time_execution, dt2, dt1 = performance.now();
        array = models.MergeSortArray(__array__, sort_mode);
        dt2 = performance.now();
        time_execution = 0.001 * (dt2 - dt1);
        return { array, time_execution };
    }
    /**
     * 
     * @method insertion_sort
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode
     * @returns {{array: Array.<number | string>, indices: Array.<number>}}
     * @description This static method implements
     * the insertion sort algorithm. If the sort_mode is
     * true or has the value "increase", then the method
     * sorts the elements of the array into ascending order
     * otherwise if the sorted_mode is false or has the value 
     * "decrease", then the elements of the array are sorted in
     * descending order.
     */
    static insertion_sort(array, sort_mode) {
        return models.InsertionSort(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the
     * insertion_sort() static method.
     */
    static async insertion_sort_async(array, sort_mode) {
        let result, dt2, dt1 = performance.now();
        result = models.InsertionSort(array, sort_mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Array.<number | string>}
     */
    static insertion_sort_array(array, sort_mode) {
        return models.InsertionSortArray(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} __array__ 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the insertion_sort_array()
     * static method. The method also returns the time needed for the execution
     * of the algorithm.
     */
    static async insertion_sort_array_async(__array__, sort_mode) {
        let array, time_execution, dt2, dt1 = performance.now();
        array = models.InsertionSortArray(__array__, sort_mode);
        dt2 = performance.now();
        time_execution = 0.001 * (dt2 - dt1);
        return { array, time_execution };
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode
     * @returns {{array : Array.<number | string> , indices : Array.<number>}}
     * @description this method implements the selection sort algorithms. If the
     * sort_mode has the value 'increase' or is true, then the algorithm
     * sorts the elements of the array in ascending order, otherwise if the
     * sort_mode is 'decrease' or is false, then the algorithm sorts the
     * elements of the array in descending order. Note that this algorithm is
     * not fast sorting algorithm. 
     */
    static selection_sort(array, sort_mode) {
        return models.SelectionSort(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, indices :Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the selection_sort()
     * static method of the SortLib package. The method also returns the
     * time needed for the execution of the algorithm.
     */
    static async selection_sort_async(array, sort_mode) {
        let result, dt2, dt1 = performance.now();
        result = models.SelectionSort(array, sort_mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Array.<number | string>}
     * @description this method applies the selection sort algorithm
     * to the array parameter and returns only the sorted array.
     */
    static selection_sort_array(array, sort_mode) {
        return models.SelectionSortArray(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} __array__ 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the selection_sort_array()
     * method of the SortLib package.
     */
    static async selection_sort_array_async(__array__, sort_mode) {
        let array, time_execution, dt2, dt1 = performance.now();
        array = models.SelectionSortArray(__array__, sort_mode);
        dt2 = performance.now();
        time_execution = 0.001 * (dt2 - dt1);
        return { array, time_execution };
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode
     * @returns {{array: Array.<number | string>, indices : Array.<number>}}
     * @description This static method implements the
     * quick sort algorithm that was created form
     * Tony Hoare in 1959 and published in 1961. 
     */
    static quick_sort(array, sort_mode) {
        return models.QuickSort(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the
     * quick_sort() static method of the SortLib package. The method
     * returns additionally the time needed for the execution of the
     * algorithm.
     */
    static async quick_sort_async(array, sort_mode) {
        let result, dt2, dt1 = performance.now();
        result = models.QuickSort(array, sort_mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {array.<number>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Array.<number | string>}
     */
    static quick_sort_array(array, sort_mode) {
        return models.QuickSortArray(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} __array__ 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the
     * quick_sort_array() static method of the SortLib package.The
     * method returns an additional property named time_execution,
     * which obtains the time needed for the array sorting with this
     * algorithm.
     */
    static async quick_sort_array_async(__array__, sort_mode) {
        let array, time_execution, dt2, dt1 = performance.now();
        array = models.QuickSortArray(__array__, sort_mode);
        dt2 = performance.now();
        time_execution = 0.001 * (dt2 - dt1);
        return { array, time_execution };
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode
     * @returns {{array : Array.<number | string>, indices : Array.<number>}}
     * @description This static algorithm implements the trivial
     * bubble sort algorithm. 
     */
    static bubble_sort(array, sort_mode) {
        return models.BubbleSort(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the bubble_sort()
     * static method of the SortLib package. The method provides an additional
     * property, named "time_execution" which obtains the time spent for the
     * execution of the bubble sort algorithm on the array.
     */
    static bubble_sort_async(array, sort_mode) {
        let result, dt2, dt1 = performance.now();
        result = models.BubbleSort(array, sort_mode);
        dt2 = performance.now()
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Array.<number | string>}
     * @description this method applies the bubble sort
     * algorithm on the array parameter and returns only
     * the sorted array.
     */
    static bubble_sort_array(array, sort_mode) {
        return models.BubbleSortArray(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} __array__ 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the bubble_sort_array()
     * static method of the SortLib package.
     */
    static async bubble_sort_array_async(__array__, sort_mode) {
        let array, time_execution, dt2, dt1 = performance.now();
        array = models.BubbleSortArray(__array__, sort_mode);
        dt2 = performance.now();
        time_execution = 0.001 * (dt2 - dt1);
        return { array, time_execution };
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode
     * @returns {{array: Array.<number | string>, indices : Array.<number>}}
     * @description THis static method implements the heap sort
     * algorithm invented by J.W.J. Williams in 1964.
     */
    static heap_sort(array, sort_mode) {
        return models.HeapSort(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the 
     * heap_sort() static method of the SortLib package. The method returns an
     * additional property named "time_execution" which computes the time, spent
     * for the execution of the algorithm.
     */
    static async heap_sort_async(array, sort_mode) {
        let result, dt2, dt1 = performance.now();
        result = models.HeapSort(array, sort_mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Array.<number | string>}
     * @description this method applies the heap sort
     * algorithm on the array parameter and returns only
     * the sorted array without the indices.
     */
    static heap_sort_array(array, sort_mode) {
        return models.HeapSortArray(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} __array__ 
     * @param {boolean} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the
     * heap_sort_array() static method of the SortLib package.The method
     * returns an additional property, named "time_execution" which
     * obtains the time spent for the execution of the algorithm.
     */
    static async heap_sort_array_async(__array__, sort_mode) {
        let array, time_execution, dt2, dt1 = performance.now();
        array = models.HeapSortArray(__array__, sort_mode);
        dt2 = performance.now();
        time_execution = 0.001 * (dt2 - dt1);
        return { array, time_execution };
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode
     * @returns {{array : Array.<number | string>, indices : Array.<number>}}
     * @description This method implements the cocktail sort
     * algorithm which is an improvement and variation of the
     * bubble sort algorithm. Note that the algorithm is not fast, i.e.
     * has complexity proportional to O(n^2).
     */
    static cocktail_sort(array, sort_mode) {
        return models.CocktailSort(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, indices: Array.<number>, time_extension: number}, Error>}
     * @description this method is the asynchronous version of the
     * cocktail sort algorithm. The method returns an additional
     * property named time_execution, which computes the time spent
     * for the sorting of the array with this algorithm.
     */
    static async cocktail_sort_async(array, sort_mode) {
        let result, dt2, dt1 = performance.now();
        result = models.CocktailSort(array, sort_mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Array.<number | string>}
     * @description this method applies the cocktail sort
     * algorithm to the array parameter and returns only
     * the sorted array without the indices.
     */
    static cocktail_sort_array(array, sort_mode) {
        return models.CocktailSortArray(array, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} __array__ 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the cocktail_sort_array()
     * static method. The method returns an additional property named time_execution which
     * obtains the time spent for sorting of the array with this algorithm.
     */
    static async cocktail_sort_array_async(__array__, sort_mode) {
        let array, time_execution, dt2, dt1 = performance.now();
        array = models.CocktailSortArray(__array__, sort_mode);
        dt2 = performance.now();
        time_execution = 0.001 * (dt2 - dt1);
        return { array, time_execution };
    }
    /**
     * 
     * @param {Array.<number>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode
     * @param {number} buckets
     * @returns {{array : Array.<number>, indices : Array.<number>}}
     * @description this static method implements 
     * the bucket sort algorithm. 
     */
    static bucket_sort(array, buckets, sort_mode) {
        if (!IsNumberArray(array)) errors.IncorrectArrayParameterInBucketSort();
        if (!IsInteger(buckets)) buckets = array.length >> 1;
        if (buckets <= 0 || buckets >= array.length) buckets = array.length - 1;
        return models.BucketSort(array, buckets, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {number} buckets
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the
     * bucket_sort() static method. The method returns also an additional
     * property which is named time_execution and obtains the time spent for the
     * sorting of the array with this algorithm. 
     */
    static async bucket_sort_async(array, buckets, sort_mode) {
        let result, dt2, dt1 = performance.now();
        if (!IsNumberArray(array)) errors.IncorrectArrayParameterInBucketSort();
        if (!IsInteger(buckets)) buckets = array.length >> 1;
        if (buckets <= 0 || buckets >= array.length) buckets = array.length - 1;
        result = models.BucketSort(array, buckets, sort_mode);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {number} buckets 
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Array.<number | string>}
     * @description this method applies the bucket sort algorithm
     * on the array argument and returns only the sorted array
     * without the indices.
     */
    static bucket_sort_array(array, buckets, sort_mode) {
        if (!IsNumberArray(array)) errors.IncorrectArrayParameterInBucketSort();
        if (!IsInteger(buckets)) buckets = array.length >> 1;
        if (buckets <= 0 || buckets >= array.length) buckets = array.length - 1;
        return models.BucketSortArray(array, buckets, sort_mode);
    }
    /**
     * 
     * @param {Array.<number | string>} __array__ 
     * @param {number} buckets
     * @param {boolean | 'increase' | 'decrease'} sort_mode 
     * @returns {Promise<{array: Array.<number | string>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the
     * bucket_sort_array() algorithm of the SortLib package. Note that
     * this method returns an additional property, which is named
     * time_execution and obtains the time spent for the sorting of the
     * array of this algorithm. 
     */
    static async bucket_sort_array_async(__array__, buckets, sort_mode) {
        let array, time_execution, dt2, dt1 = performance.now();
        if (!IsNumberArray(__array__)) errors.IncorrectArrayParameterInBucketSort();
        if (!IsInteger(buckets)) buckets = __array__.length >> 1;
        if (buckets <= 0 || buckets >= __array__.length) buckets = __array__.length - 1;
        array = models.BucketSortArray(__array__, buckets, sort_mode);
        dt2 = performance.now();
        time_execution = 0.001 * (dt2 - dt1);
        return { array, time_execution };
    }
    /**
     * 
     * @param {number} n 
     * @param {number} seed
     * @param {function(number, number)} callback
     * @returns {Array.<number | {}>}
     * @description this is an utility static method,
     * that creates/generates an array with elements
     * that are randomly distributed between 0 and 1.
     * We use as core idea for this method the routine
     * of John Burkardt used into the Fortran algorithm 451,
     * or namely the Complex box optimization of M. Box.
     * (This fortran routine is translated in javascript 
     * from the author of the package, 
     * see https://github.com/VelislavKarastoychev/boxOptimizationjs).
     * If the seed parameter is not defined, then it will be set 
     * by default to 123456. If the n parameter is not defined correctly,then
     * it will be a fatal error.
     * If callback function is executed, then the method returns an
     * array of elements that was produced from random numbers.
     * @example
     * // create random array of numbers in the open interval (0, 1)
     * const arr = SortLib.generate_random_array(100)
     * // generate a random array with different seed
     * const arr = SortLib.generate_random_array(100, 32394373)
     * // generate a random array from integers between 0 and 100:
     * const arr = SortLib.generate_random_array(100, null, el => (el * 100) << 0)
     **/
    static generate_random_array(n, seed = 123456, callback) {
        if (!IsInteger(seed)) seed = 123456;
        if (!IsInteger(n)) errors.IncorrectParameterInGRA();
        if (!IsFunction(callback)) callback = null;
        return models.GenerateRandomArray(n, seed, callback);
    }
    /**
     * 
     * @param {number} n 
     * @param {number} seed 
     * @param {function(number, number)} callback 
     * @returns {Promise<Array.<number>, Error>}
     * @description this method is the asynchronous version
     * of the generate random array method of the SortLib package.
     */
    static async generate_random_array_async(n, seed = 12345, callback) {
        if (!IsInteger(seed)) seed = 123456;
        if (!IsInteger(n)) errors.IncorrectParameterInGRA();
        if (!IsFunction(callback)) callback = null;
        return models.GenerateRandomArray(n, seed, callback);
    }
    /**
     * 
     * @param {number} length 
     * @param {number} word_size 
     * @param {number} seed 
     * @param {function(number, number)} callback
     * @returns {Array.<string>} - this is the output when the
     * callback function is not used.
     * @description this method is used to generate an array of random
     * strings. If the user wants to transform the random string with
     * some procedure, a callback function has to be used. The callback
     * function has to be a function with two parameters that represents
     * the element (the current intermediate output) and the index of the
     * element of the array.
     * @example
     * // create an array of 100 random strings that begin with
     * // the description random string, then show the number of
     * // the random string and then follows the random string.  
     * const rand_strings_list = SortLib.generate_random_string_array(100, 5, (el, ind) => {
     *    return el = `random element № ${ind + 1} : ${el}`
     * });
     */
    static generate_random_string_array(length, word_size, seed, callback) {
        if (!IsInteger(length)) errors.IncorrectLengthInGRSA();
        if (!IsInteger(word_size)) errors.IncorrectWordSizeInGRSA();
        if (!IsInteger(seed)) seed = 123456;
        return models.GenerateRandomStringArray(length, word_size, seed, callback);
    }
    /**
     * 
     * @param {number} length 
     * @param {number} word_size 
     * @param {number} seed 
     * @param {function(number, number)} callback 
     * @returns {Promise<Array.<string>, Error>}
     * @description this method is the asynchronous version of the
     * generate_random_string_array() static method of the SortLib package.
     */
    static async generate_random_string_array_async(length, word_size, seed, callback) {
        if (!IsInteger(length)) errors.IncorrectLengthInGRSA();
        if (!IsInteger(word_size)) errors.IncorrectWordSizeInGRSA();
        if (!IsInteger(seed)) seed = 123456;
        return models.GenerateRandomStringArray(length, word_size, seed, callback);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {number} n
     * @returns {{array : Array.<number | string>, indices : Array.<number>}}
     * @param {boolean} show_warnings
     * @description this method finds out the p best elements of an array of
     * number or string elements. The p has to be either integer which is
     * bigger than 0 or a real number into the open interval (0, 1). If the
     * p is omitted or incorrectly declared, then a warning message will be
     * shown and the p will be assume to be equals to the length of the array.
     * In this case the speed (time efficiency) of the algorithm will be the same
     * as the complexity of the heap sort algorithm. 
     */
    static find_best_elements(array, n, show_warnings = false) {
        if (!IsStringOrNumberArray(array)) {
            errors.IncorrectArrayParameterInFindBestElements();
        }
        if (IsUndefined(n)) n = array.length
        if (!IsNumber(n)) {
            if (show_warnings) {
                warnings.IncorrectCountParameterInFindBestElements()
            }
        }
        if (IsNumber(n)) {
            if (!(n >= 1) || !(n <= array.length)) {
                if (show_warnings) {
                    warnings.IncorrectCountParameterInFindBestElements()
                }
            }
        }
        if (IsNumber(n) && !IsInteger(n)) {
            if (n > 0 && n < 1) n = ((array.length * n) >> 0);
            if (n === 0) n = 1;
            if (n > array.length) n = array.length;
        }
        return models.FindBestElements(array, n);
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {number} n 
     * @param {boolean} show_warnings 
     * @returns {Promise<{array: Array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the
     * find_best_elements() static method of the SortLib package.
     * Note that this method returns an additional property named time_execution,
     * which obtains the time spent for the finding of the biggest elements.
     */
    static async find_best_elements_async(array, n, show_warnings = false) {
        let result, dt2, dt1 = performance.now();
        if (!IsStringOrNumberArray(array)) {
            errors.IncorrectArrayParameterInFindBestElements();
        }
        if (IsUndefined(n)) n = array.length
        if (!IsNumber(n)) {
            if (show_warnings) {
                warnings.IncorrectCountParameterInFindBestElements()
            }
        }
        if (IsNumber(n)) {
            if (!(n >= 1) || !(n <= array.length)) {
                if (show_warnings) {
                    warnings.IncorrectCountParameterInFindBestElements()
                }
            }
        }
        if (IsNumber(n) && !IsInteger(n)) {
            if (n > 0 && n < 1) n = ((array.length * n) >> 0);
            if (n === 0) n = 1;
            if (n > array.length) n = array.length;
        }
        result = models.FindBestElements(array, n);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {number} n
     * @returns {{array : Array.<number | string>, indices : Array.<number>}}
     * @param {boolean} show_warnings
     * @description this method returns the worst (smallest) n elements
     * of an string or number array. If the array is not correctly defined,
     * then the method will throw an error. If the n is not integer
     * from 1 to the array.length or is not a real number from 0 to 1,
     * the method throws a warning message and assumes that n is equals to
     * the array.length.
     */
    static find_worst_elements(array, n, show_warnings = false) {
        if (!IsStringOrNumberArray(array)) {
            errors.IncorrectArrayParameterInFindWorstElements();
        }
        if (IsNumber(n)) {
            if (!IsInteger(n) && !(n >= 0 && n <= 1) || n >= array.length) {
                if (show_warnings) warnings.IncorrectCountParameterInFindWortsElements();
                if (n >= 0 && n < 1) n = n * array.length << 0;
                if (!IsInteger(n)) n = n << 0;
                if (n > array.length) n = array.length;
            }
        } else n = array.length;
        return models.FindWorstElements(array, n);
    }
    /**
     * 
     * @param {Array.<number | stirng>} array 
     * @param {number} n 
     * @param {boolean} show_warnings 
     * @returns {Promise.<{array: Array.<number | string>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the find_worst_elements
     * static method of the SortLib package. Note that this method returns an additional
     * property named time_execution which estimates the time spent for the execution of the
     * algorithm.
     */
    static async find_worst_elements_async(array, n, show_warnings = false) {
        let result, dt2, dt1 = performance.now();
        if (!IsStringOrNumberArray(array)) {
            errors.IncorrectArrayParameterInFindWorstElements();
        }
        if (IsNumber(n)) {
            if (!IsInteger(n) && !(n >= 0 && n <= 1) || n >= array.length) {
                if (show_warnings) warnings.IncorrectCountParameterInFindWortsElements();
                if (n >= 0 && n < 1) n = n * array.length << 0;
                if (!IsInteger(n)) n = n << 0;
                if (n > array.length) n = array.length;
            }
        } else n = array.length;
        result = models.FindWorstElements(array, n);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<object>} array 
     * @param {string | Array.<string>} property 
     * @param {boolean | 'increase' | 'decrease'} mode 
     * @param {'quick sort' | 'merge sort' | 'heap sort' | 'bucket sort'} algorithm
     * @param {boolean} show_warnings
     * @param {boolean} test
     * @returns {{array : Array.<object>, indices : Array.<number>}}
     * @description this method sorts an array of object elements by given property or
     * by given set of properties. If the array is not constructed form object elements,
     * then an error message for incorrect array declaration will be thrown. Also if
     * the property parameter (the second argument of the method) is not string or array
     * of strings, then an error message for incorrect property parameter will be thrown.
     * Finally if the mode and algorithm are not defined, then the method will set them automatically to 
     * "increase"/ true and "quick sort". If the property is array of properties, then if the
     * array of objects does not cover all the levels of properties except of the last level, an
     * error message for incorrect array declaration will be thrown. If the last level property is
     * not defined or is not of number or string type for any item, then this item will be omitted.
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
    static sort_object_array_by_property(array, property, mode, algorithm, show_warnings = false, test = false) {
        const allowedAlgorithms = ['merge sort', 'quick sort', 'heap sort', 'bucket sort'];
        const mode_types = [true, false, 'decrease', 'increase'];
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyInSortObjectArray();
        }
        if (test) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayParameterInSortObjectArray();
            }
        }
        if (IsUndefined(mode) || !IsSameWithAny(mode, mode_types)) {
            if (show_warnings) warnings.IncorrectOrUndefinedModeParameterInSortObjectArray();
            mode = true;
        }
        if (IsUndefined(algorithm) || !IsSameWithAny(algorithm, allowedAlgorithms)) {
            if (show_warnings) warnings.IncorrectOrUndefinedAlgorithmParameterInSortObjectArray();
            algorithm = 'quick sort';
        }
        return models.SortObjectArrayByProperty(array, property, mode, algorithm);
    }
    /**
     * 
     * @param {Array.<{}>} array 
     * @param {string | Array.<string>} property 
     * @param {boolean | 'increase' | 'decrease'} mode 
     * @param {'quick sort' | 'merge sort' | 'heap sort' | 'bucket sort'} algorithm 
     * @param {boolean} show_warnings 
     * @param {boolean} test
     * @returns {Promise<{array: Array.<{}>, indices: Array.<number>, time_execution: number}>}
     * @description this method is the asynchronous version of the method
     * sort_object_array_by_property(). The method returns an additional property named
     * time_execution that computes the time spent for the sorting of the array.
     */
    static async sort_object_array_by_property_async(array, property, mode, algorithm, show_warnings = false, test = false) {
        let result, dt2, dt1 = performance.now();
        const allowedAlgorithms = ['merge sort', 'quick sort', 'heap sort', 'bucket sort'];
        const mode_types = [true, false, 'decrease', 'increase'];
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyInSortObjectArray();
        }
        if (test) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayParameterInSortObjectArray();
            }
        }
        if (IsUndefined(mode) || !IsSameWithAny(mode, mode_types)) {
            if (show_warnings) warnings.IncorrectOrUndefinedModeParameterInSortObjectArray();
            mode = true;
        }
        if (IsUndefined(algorithm) || !IsSameWithAny(algorithm, allowedAlgorithms)) {
            if (show_warnings) warnings.IncorrectOrUndefinedAlgorithmParameterInSortObjectArray();
            algorithm = 'quick sort';
        }
        result = models.SortObjectArrayByProperty(array, property, mode, algorithm);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<object>} array 
     * @param {Array.<string>} property
     * @param {number} n
     * @returns {{array : Array.<object>, indices : Array.<number>}}
     * @description this method finds the first n best (biggest) elements
     * of an array of object elements by comparison the property values of
     * every element of the array. If the array item does not contains any 
     * property (into the last level), then the method will omit this element.
     * If the array parameter is not object array, an error message will be thrown.
     * If the property is not a string or string array, also an error message will be thrown.
     * If the n parameter is integer then the first n elements will be returned.
     * If the n parameter is a floating point number, then the first 100 * n% best elements
     * will be returned.
     */
    static find_best_for_object_array_by_property(array, property, n, test = false) {
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInFindBestInObjectArray();
        }
        if (test) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayParameterInFindBestInObjectArray()
            }
        }
        if (IsNumber(n)) {
            if (IsInteger(n)) {
                if (n <= 0 || n > array.length) n = array.length;
            } else if (n > 0 && n < 1) {
                n = n * array.length << 0;
            } else n = array.length
        } else n = array.length;
        if (n === array.length) return models.SortObjectArrayByProperty(array, property, false, 'quick sort');
        else return models.FindBestForObjectArrayByProperty(array, property, n);
    }
    /**
     * 
     * @param {Array} array 
     * @param {string | Array.<string>} property 
     * @param {number} n 
     * @param {boolean} test 
     * @returns {Promise<{array: Array.<{}>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is the asynchronous version of the
     * find_best_for_object_array_by_property() method. The method returns also a property
     * time_execution which obtains the time spent for the sorting of the array elements.
     */
    static async find_best_for_object_array_by_property_async(array, property, n, test = false) {
        let result, dt2, dt1 = performance.now();
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInFindBestInObjectArray();
        }
        if (test) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayParameterInFindBestInObjectArray()
            }
        }
        if (IsNumber(n)) {
            if (IsInteger(n)) {
                if (n <= 0 || n > array.length) n = array.length;
            } else if (n > 0 && n < 1) {
                n = n * array.length << 0;
            } else n = array.length
        } else n = array.length;
        if (n === array.length) result = models.SortObjectArrayByProperty(array, property, false, 'quick sort');
        else result = models.FindBestForObjectArrayByProperty(array, property, n);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    /**
     * 
     * @param {Array.<object>} array
     * @param {string | Array.<string>} 
     * @param {number} n
     * @param {boolean} test
     * @returns {{array : Array.<object>, indices : Array.<number>}}
     * @description this method finds out the n most worst elements of an
     * array, each element of which is an object by given property or set of
     * properties. If the array is not contained from object elements then the
     * method throws an error for incorrect array parameter. If the property is
     * not string or string array then the method throws the corresponding error
     * message.Finally if some level of the property array is not object, then the
     * method throws error for incorrect property parameter. 
     */
    static find_worst_for_object_array_by_property(array, property, n, test = false) {
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInFindWorstInObjectArray()
        }
        if (test) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayParameterInFindWorstInObjectArray()
            }
        }
        if (IsNumber(n)) {
            if (IsInteger(n)) {
                if (n <= 0 || n > array.length) n = array.length;
            } else if (n > 0 && n < 1) n = n * array.length << 0;
            else n = array.length;
        } else n = array.length;
        if (n === array.length) return models.SortObjectArrayByProperty(array, property, true, 'quick sort');
        else return models.FindWorstForObjectArrayByProperty(array, property, n);
    }
    /**
     * 
     * @param {Array<{}>} array 
     * @param {string | Array.<string>} property 
     * @param {number} n 
     * @param {boolean} test 
     * @returns {Promise<{array: Array.<{}>, indices: Array.<number>, time_execution: number}, Error>}
     * @description this method is asynchronous version of the 
     * find_worst_for_object_array_by_property() static method.
     */
    static async find_worst_for_object_array_by_property_async(array, property, n, test = false) {
        let result, dt2, dt1 = performance.now();
        if (IsString(property)) property = [property];
        if (!IsStringArray(property)) {
            errors.IncorrectPropertyParameterInFindWorstInObjectArray()
        }
        if (test) {
            if (!IsCorrectObjectArray(array, property)) {
                errors.IncorrectArrayParameterInFindWorstInObjectArray()
            }
        }
        if (IsNumber(n)) {
            if (IsInteger(n)) {
                if (n <= 0 || n > array.length) n = array.length;
            } else if (n > 0 && n < 1) n = n * array.length << 0;
            else n = array.length;
        } else n = array.length;
        if (n === array.length) result = models.SortObjectArrayByProperty(array, property, true, 'quick sort');
        else result = models.FindWorstForObjectArrayByProperty(array, property, n);
        dt2 = performance.now();
        result.time_execution = 0.001 * (dt2 - dt1);
        return result;
    }
    get algorithm() {
        return this.#algorithm;
    }
    /**
     * @param {"quick sort" | "merge sort" | "heap sort" | "bucket sort" | "cocktail sort" | "insertion sort" | "selection sort" | "bubble sort"} algorithm
     * @description this method set the algorithm that
     * the current SortLib instance will use to sort
     * the items of the array. 
     */
    set algorithm(algorithm) {
        if (IsSortingAlgorithm(algorithm)) {
            this.#algorithm = algorithm;
        } else {
            this.#algorithm = 'merge sort';
            if (this.show_warnings) {
                warnings.IncorrectAlgorithmDeclaration();
                infos.AutomaticallySetToDefault({ algorithm: 'merge sort' });
            }
        };
    }
    get size() {
        return this.#array.length;
    }
    get array() {
        return this.#array;
    }
    /**
     * @param {Array.<number | string>} array
     * @description this method set the array property
     * of the current SortLib instance.
     */
    set array(array) {
        if (!IsStringOrNumberArray(array) && !IsEmpty(array)) {
            errors.IncorrectArrayInSetterArray();
        }
        this.#array = array;
        this.#indices = models.GenerateInitialIndices(this.size);
    }
    get indices() {
        return this.#indices;
    }
    /**
     * @param {Array.<number | string>} indices
     * @description This method set the indices
     * property of the current SortLib instance.
     */
    set indices(indices) {
        if (IsCorrectlyDefinedIndices(indices, this.size)) {
            this.#indices = indices;
        } else if (IsUndefined(indices)) {
            this.#indices = models.GenerateInitialIndices(this.size);
        } else {
            errors.IncorrectIndicesParameterInSetter()
        }
    }
    /**
     * @param {{index : number, item  : number | string}} options
     * @description This method set the item of some index. 
     */
    set index(options) {
        if (!IsObject(options)) errors.IncorrectArgumentInIndexSetter()
        if (IsInteger(options.index)
            && IsNumber(options.item)) {
            if (options.index >= 0 && options.index < this.size) {
                this.#array[options.index] = options.item;
            } else errors.IncorrectArgumentInIndexSetter()
        } else errors.IncorrectArgumentInIndexSetter()
    }
    get status() {
        return this.#status;
    }
    /**
     * @param {"sorted" | "unsorted"} status
     * @description This method set the status
     * property of the current SortLib instance.
     */
    set status(status) {
        if (!IsStatus(status)) {
            errors.IncorrectStatusInSetter();
        };
        this.#status = status;
    }
    /**
     * @param {"increase" | "decrease" | boolean } sort_mode
     * @description This method set the order of sorting of the
     * array property. The possible values are "increase" if we
     * want to sort the array in ascending order, "decrease" in
     * the case that we want to sort the array in descending order.
     * The same values can be expressed with boolean values i.e.
     * true for the "increase" case and false for the "decrease"
     * case. The choice is saved in the property sort_mode of the
     * current SortLib instance. 
     */
    set ['sort mode'](sort_mode) {
        return this.sort_mode = sort_mode;
    }
    get ['sort mode']() {
        return this.#sort_mode;
    }
    get sort_mode() {
        return this.#sort_mode;
    }
    /**
     * @param {"increase" | "decrease" | boolean} sortMode
     * @description This method set the order of sorting of the
     * array property. The possible values are "increase" if we
     * want to sort the array in ascending order, "decrease" in
     * the case that we want to sort the array in descending order.
     * The same values can be expressed with boolean values i.e.
     * true for the "increase" case and false for the "decrease"
     * case. The choice is saved in the property sort_mode of the
     * current SortLib instance. 
     */
    set sort_mode(sortMode) {
        if (IsSortMode(sortMode)) {
            this.#sort_mode = sortMode;
        } else {
            if (this.show_warnings) {
                warnings.IncorrectSortModeDeclaration();
                infos.AutomaticallySetToDefault({ 'sort mode': 'increase' });
            }
            this.#sort_mode = 'increase';
        };
    }
    /**
     * 
     * @param {number | string} element 
     * @returns { SortLib}
     * @description this method uses the bisection method
     * to add an element in sorted array.
     */
    add(element) {
        if (!IsNumber(element) && !IsString(element)) {
            errors.IncorrectElementInAddElementInSortedArray()
        }
        if (this.#status === 'unsorted') this.sort()
        this.#array = models.AddElementInSortedArray(this.#array, element, this.#sort_mode);
        this.#indices = models.GenerateInitialIndices(this.size);
        return this;
    }
    /**
     * 
     * @param {number | string} element
     * @returns { SortLib} 
     * @description this method 
     * sorts the array if its status is not sorted,
     * deletes/removes the first item of the array 
     * which is equals to the element parameter and 
     * finally generates new indices of the array.
     *  
     */
    delete(element) {
        if (!IsNumber(element) && !IsString(element)) {
            errors.IncorrectElementParameterInRemoveElementFromSortedArray();
        }
        if (this.status !== 'sorted') this.sort();
        const removeModel = models.RemoveElementFormSortedArray(this.#array, element, this.sort_mode);
        this.#array = removeModel.array;
        this.#indices = removeModel.indices;
        return this;
    }
    /**
     * 
     * @param {function(number, number, Array)} callback 
     * @returns {SortLib}
     * @description this method filters the elements
     * of the current SortLib instance by given function. 
     */
    filter(callback) {
        if (!IsFunction(callback)) {
            errors.IncorrectCallbackParameterInFilter();
        }
        const filtered = models.Filter(this.#array, callback);
        this.#array = filtered.array;
        this.#indices = filtered.indices;
        return this;
    }
    /**
     * @returns {SortLib}
     * @description This method sorts the array property of
     * the current SortLib instance using the specified
     * properties "algorithm" and "sort mode" of the instance.
     * If these additional properties are not specified, then the
     * algorithm sorts the array with the default values of these
     * properties which are the merge sort (algorithm) and the
     * "increase"-ing (order) of sorting. 
     */
    sort() {
        let output;
        if (this.size <= 1) return this;
        else if (this.status === 'sorted') return this;
        else {
            if (this.algorithm === 'merge sort') output = models.MergeSort(this.array, this["sort mode"]);
            else if (this.algorithm === 'quick sort') output = models.QuickSort(this.array, this["sort mode"]);
            else if (this.algorithm === 'bubble sort') output = models.BubbleSort(this.array, this["sort mode"]);
            else if (this.algorithm === 'heap sort') output = models.HeapSort(this.array, this["sort mode"]);
            else if (this.algorithm === 'insertion sort') output = models.InsertionSort(this.array, this["sort mode"]);
            else if (this.algorithm === 'selection sort') output = models.SelectionSort(this.array, this["sort mode"]);
            else if (this.algorithm === 'cocktail sort') output = models.CocktailSort(this.array, this["sort mode"]);
            else if (this.algorithm === 'bucket sort') output = SortLib.bucket_sort(this.array, null, this["sort mode"]);
            else {
                if (this.show_warnings) {
                    infos.UnknownSortingMethod(this.algorithm);
                    infos.AutomaticallySetToDefault({ algorithm: "merge sort" });
                }
                this.algorithm = "merge sort";
                output = models.MergeSort(this.array, this["sort mode"]);
            }
            this.#array = output.array;
            this.#indices = output.indices;
            this.#status = 'sorted';
        }
        return this;
    }
}
export default SortLib;