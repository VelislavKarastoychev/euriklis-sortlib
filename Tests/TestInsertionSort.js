'use strict'
function TestInsertionSort() {
    const method = 'Insertion sort'
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    let answer
    let array = [12, 1, 54, 34, 67, 13, 109, 32, 88]
    let output = SortLib.insertion_sort(array)
    let reversed_output = SortLib.insertion_sort(array, false)
    let sorted_array = [1, 12, 13, 32, 34, 54, 67, 88, 109]
    new validator(output.array).is_same(sorted_array)
        .and().bind(
            new validator(reversed_output.array).is_same(sorted_array.reverse())
        ).on(true, () => answer = true)
        .on(false, () => answer = false)
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}
module.exports = TestInsertionSort