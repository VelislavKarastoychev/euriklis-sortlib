'use strict'
const { sort_algorithms } = require('./Models')
const { sort_algorithms_list } = require('./Models')
const validator = require('@euriklis/validator')
const infos = require('./Infos')
const warnings = require('./Warnings')
const errors = require('./Errors')

class SortLib {
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
        new validator(options)
            .is_object()
            .on(true, () => {
                new validator(options.array).is_number_array()
                    .or().is_string_array()
                    .on(true, () => {
                        this.__array__ = options.array
                        this.__size__ = this.array.length
                    }).on(false, () => {
                        new validator(options.array).is_undefined()
                            .on(true, () => {
                                warnings.UndefinedArrayInSortLibConstructor()
                                this.__array__ = []
                                this.__size__ = 0
                            }).on(false, () => {
                                errors.IncorrectArrayDeclarationInSortLibConstructor()
                            })
                    })
                new validator(options.algorithm)
                    .is_same_with_any(sort_algorithms_list)
                    .on(true, () => {
                        this.__algorithm__ = options.algorithm
                    }).on(false, () => {
                        this.__algorithm__ = 'merge sort'
                        warnings.IncorrectAlgorithmDeclaration()
                        infos.AutomaticallySetToDefault({ algorithm: 'merge sort' })
                    })
                new validator(options['sort mode'])
                    .is_same_with_any([true, false, 'increase', 'decrease'])
                    .on(true, () => {
                        this.__sort_mode__ = options['sort mode']
                    }).on(false, () => {
                        warnings.IncorrectSortModeDeclaration()
                        infos.AutomaticallySetToDefault({ 'sort mode': 'increase' })
                        this.__sort_mode__ = 'increase'
                    })
                new validator(options.status).not().is_undefined()
                    .and().is_same_with_any(['sorted', 'unsorted']).on(true, () => {
                        this.__status__ = options.status
                    }).on(false, () => this.status = 'unsorted')
                new validator(options.indices).is_number_array()
                    .and().has_length(this.size).on(true, () => {
                        this.__indices__ = options.indices
                    }).on(false, () => {
                        this.__indices__ = Array.from({ length: this.size }).map((e, i) => { return e = i })
                    })
            }).on(false, () => {
                this.__array__ = []
                this.__indices__ = []
                this.__algorithm__ = 'merge sort'
                this.__size__ = 0
                this.__sort_mode__ = 'increase'
            })
    }
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
    static addElementInSortedArray(array, element) {
        let i, _array, ascending_order
        new validator(array).is_string_array().or().is_number_array()
            .on(true, () => {
                // check if the array is in increasing or decreasing order
                // not that we assume that the array is sorted!
                i = 0
                while (1) {
                    if (array[i] < array[i + 1]) {
                        ascending_order = true
                        break
                    } else if (array[i] > array[i + 1]) {
                        ascending_order = false
                        break
                    } else ++i
                    if (i === array.length) {
                        ascending_order = true
                        break
                    }
                }
            }).on(false, () => errors.IncorrectArrayInAddElementInSortedArray())
        _array = sort_algorithms.PutInSortedArray(array, element, ascending_order)
        return new SortLib({ array: _array, 'sort mode': ascending_order, status: 'sorted' })
    }
    /**
     * @method merge_sort
     * @param {Array.<number | string>} array 
     * @param {string} sort_mode
     * @returns {{array : Array.<number | string>, indices : Array.<number>}}  
     * @description this static method implements the merge sort
     * algorithm that is invented from Jon von Neumann in 1945
     */
    static merge_sort(array, sort_mode) {
        return sort_algorithms.merge_sort(array, sort_mode)
    }
    /**
     * 
     * @method insertion_sort
     * @param {Array.<number | string>} array 
     * @param {boolean | 'increase' | 'decrease'} sort_mode
     * @description This static method implements
     * the insertion sort algorithm. If the sort_mode is
     * true or has the value "increase", then the method
     * sorts the elements of the array into ascending order
     * otherwise if the sorted_mode is false or has the value 
     * "decrease", then the elements of the array are sorted in
     * descending order.
     */
    static insertion_sort(array, sort_mode) {
        return sort_algorithms.insertion_sort(array, sort_mode)
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
        return sort_algorithms.selection_sort(array, sort_mode)
    }
    /**
     * 
     * @param {array.<number | string>} array 
     * @param {string} sort_mode
     * @returns {{array : Array.<number | string>, indices : Array.<number>}}
     * @description This static method implements the
     * quick sort algorithm that was created form
     * Tony Hoare in 1959 and published in 1961. 
     */
    static quick_sort(array, sort_mode) {
        return sort_algorithms.quick_sort(array, sort_mode)
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {string} sort_mode
     * @returns {{array : Array.<number | string>, indices : Array.<number>}}
     * @description This static algorithm implements the trivial
     * bubble sort algorithm. 
     */
    static bubble_sort(array, sort_mode) {
        return sort_algorithms.bubble_sort(array, sort_mode)
    }
    /**
     * 
     * @param {Array.<number | string>} array 
     * @param {string} sort_mode
     * @returns {{array: Array.<number | string>, indices : Array.<number>}}
     * @description THis static method implements the heap sort
     * algorithm invented by J.W.J. Williams in 1964.
     */
    static heap_sort(array, sort_mode) {
        return sort_algorithms.heap_sort(array, sort_mode)
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
    static cocktail_sort (array, sort_mode) {
        return sort_algorithms.cocktail_sort(array, sort_mode)
    }

    get algorithm() {
        return this.__algorithm__
    }
    /**
     * @param {string} algorithm
     * @description this method set the algorithm that
     * the current SortLib instance will use to sort
     * the items of the array. 
     */
    set algorithm(algorithm) {
        new validator(algorithm).is_same_with_any(sort_algorithms_list)
            .on(true, () => this.__algorithm__ = algorithm)
            .on(false, () => {
                warnings.IncorrectAlgorithmInAlgorithmSetter()
                infos.AutomaticallySetToDefault({ algorithm: 'merge sort' })
                this.__algorithm__ = 'merge sort'
            })
    }
    get size() {
        return this.__size__
    }
    get array() {
        return this.__array__
    }
    /**
     * @param {Array.<number | string>} array
     * @description this method set the array property
     * of the current SortLib instance.
     */
    set array(array) {
        new validator(array).is_number_array().or().is_string_array()
            .on(true, () => {
                this.__array__ = array
                this.__size__ = array.length
            })
            .on(false, () => errors.IncorrectArrayInSetterArray())
    }
    get indices() {
        return this.__indices__
    }
    /**
     * @param {Array.<number | string>} indices
     * @description This method set the indices
     * property of the current SortLib instance.
     */
    set indices(indices) {
        new validator(indices).is_number_array().and().has_length(this.size)
            .and().for_all(elements => {
                return elements.is_equal_or_bigger_than(0).is_lesser_than(this.size)
            }).on(true, () => {
                this.__indices__ = indices
            }).on(false, () => errors.IncorrectIndicesParameterInSetter())
    }
    /**
     * @param {{index : number, item  : number | string}} options
     * @description This method set the item of some index. 
     */
    set index(options) {
        new validator(options).is_object()
            .on(true, () => {
                new validator(options.index).is_in_closed_range(0, this.size - 1)
                    .and().bind(new validator(options.item).is_number())
                    .on(false, () => errors.IncorrectArgumentInIndexSetter())
                    .on(true, () => {
                        this.__array__[options.index] = options.item
                    })
            }).on(false, () => errors.IncorrectArgumentInIndexSetter())
    }
    get status() {
        return this.__status__
    }
    /**
     * @param {"sorted" | "unsorted"} status
     * @description This method set the status
     * property of the current SortLib instance.
     */
    set status(status) {
        new validator(status).is_string().and()
            .is_same_with_any(['sorted', 'unsorted'])
            .on(true, () => {
                this.__status__ = status
            }).on(false, () => errors.IncorrectStatusInSetter())
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
        new validator(sort_mode).is_string().or().is_boolean()
            .on(true, () => {
                new validator(sort_mode).is_same_with_any([true, false, 'increase', 'decrease'])
                    .on(true, () => this.__sort_mode__ = sort_mode)
                    .on(false, () => {
                        warnings.IncorrectSortModeDeclaration()
                        infos.AutomaticallySetToDefault({ "sort mode": "increase" })
                        this.__sort_mode__ = 'increase'
                    })
            }).on(false, () => {
                warnings.IncorrectSortModeDeclaration()
                infos.AutomaticallySetToDefault({ "sort mode": "decrease" })
                this.__sort_mode__ = 'increase'
            })
    }
    get ['sort mode']() {
        return this.__sort_mode__
    }
    get sort_mode() {
        return this['sort mode']()
    }
    /**
     * @param {"increase" | "decrease" | boolean} sort_mode
     * @description See the sort mode setter method.
     */
    set sort_mode(sort_mode) {
        this['sort mode'] = sort_mode
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
        let output
        if (this.size <= 1) return this
        else if (this.status === 'sorted') return this
        else {
            if (this.algorithm === 'merge sort') output = sort_algorithms.merge_sort(this.array, this["sort mode"])
            else if (this.algorithm === 'quick sort') output = sort_algorithms.quick_sort(this.array, this["sort mode"])
            else if (this.algorithm === 'bubble sort') output = sort_algorithms.bubble_sort(this.array, this["sort mode"])
            else if (this.algorithm === 'heap sort') output = sort_algorithms.heap_sort(this.array, this["sort mode"])
            else if (this.algorithm === 'insertion sort') output = sort_algorithms.insertion_sort(this.array, this["sort mode"])
            else if (this.algorithm === 'selection sort') output = sort_algorithms.selection_sort(this.array, this["sort mode"])
            else if (this.algorithm === 'cocktail sort') output = sort_algorithms.cocktail_sort(this.array, this["sort mode"])
            else {
                infos.UnknownSortingMethod(this.algorithm)
                infos.AutomaticallySetToDefault({ algorithm: "merge sort" })
                output = sort_algorithms.merge_sort(this.array, this["sort mode"])
            }
            this.array = output.array
            this.indices = output.indices
            this.status = 'sorted'
        }
        return this
    }
}
SortLib.version = '1.0.2'
module.exports = SortLib