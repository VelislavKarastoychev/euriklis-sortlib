'use strict'
function TestHeapSort() {
    let answer
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    const method = 'Heap sort'
    const array = [1, 4, 2, 98, 32, 24, 42, 18, 3, 48, 21]
    const sorted_array = [1, 2, 3, 4, 18, 21, 24, 32, 42, 48, 98]
    const output = SortLib.heap_sort(array)
    const reversed_output = SortLib.heap_sort(array, false)
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
module.exports = TestHeapSort