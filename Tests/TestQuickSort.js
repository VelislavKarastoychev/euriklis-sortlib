'use strict'
function TestQuickSort() {
    const method = 'Quick sort'
    const SortLib = require('../index')
    const validator = require('@euriklis/validator')
    const array = [3, 61, 23, 13, 87, 19, 185, 2, 26, 5]
    /**
     * p = 3, i = 0, j = 9
     * p <=  5 --> j = 8
     * p <= 26  --> j = 7
     * p >= 2 --> i = 1,
     * array = [2, 61, 23, 13, 87, 19, 185, 3, 26, 5]
     * p <= array[i] = 61 --> array = [2, 3, 23, 13, 87, 19, 185, 61, 26, 5]
     * and j = 6
     * p <= 185 --> j = 5
     * p <= 
     */
    const sorted_array = [2, 3, 5, 13, 19, 23, 26, 61, 87, 185]
    const output = SortLib.quick_sort(array)
    const reverse_output = SortLib.quick_sort(array, false)
    const array1 = [2, 7, 5]
    const sorted_array1 = [2, 5, 7]
    const output1 = SortLib.quick_sort(array1)
    const reverse_output1 = SortLib.quick_sort(array1,false)
    let answer
    new validator(output.array).is_same(sorted_array)
        .and().bind(new validator(reverse_output.array).is_same(sorted_array.reverse()))
        .and().bind(new validator(output1.array).is_same(sorted_array1))
        .and().bind(new validator(reverse_output1.array).is_same(sorted_array1.reverse()))
        .on(true, () => answer = true)
        .on(false, () => answer = false)
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}
module.exports = TestQuickSort