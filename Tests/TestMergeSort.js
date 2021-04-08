'use strict'
async function TestMergeSort() {
    const SortLib = require('../index')
    const validator = require('@euriklis/validator')
    let answer, method = 'Merge sort'
    const array = [19, 3, 38, 2, 14, 6, 48, 32, 12, 5]
    const sorted_array = [2, 3, 5, 6, 12, 14, 19, 32, 38, 48]
    const output = SortLib.merge_sort(array)
    const reverse_output = SortLib.merge_sort(array, false)
    console.log(reverse_output)
    const array1 = [1, 3]
    const sorted_array1 = [1, 3]
    const output1 = SortLib.merge_sort(array1)
    const reverse_output1 = SortLib.merge_sort(array1, false)
    new validator(output.array).is_same(sorted_array)
        .and().bind(new validator(reverse_output.array).is_same(sorted_array.reverse()))
        .and().bind(
            new validator(output1.array).is_same(sorted_array1)
            .and().bind(new validator(reverse_output1.array).is_same(sorted_array1.reverse()))
        )
        .on(true, () => answer = true)
        .on(false, () => answer = false)
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}
module.exports = TestMergeSort