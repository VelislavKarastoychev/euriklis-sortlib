'use strict'
function TestSelectionSort() {
    const method = 'selection sort'
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    let array = [4, 1, 5, 35, 9, 289, 3, 24, 14, 21, 6, 28], answer
    const sorted_array = [1, 3, 4, 5, 6, 9, 14, 21, 24, 28, 35, 289]
    let output = SortLib.selection_sort(array)
    let reversed_output = SortLib.selection_sort(array, false)
    console.log(output)
    console.log(reversed_output)
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
module.exports = TestSelectionSort