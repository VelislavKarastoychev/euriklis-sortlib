'use strict'
function TestBubbleSort() {
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    const array = [2, 18, 3, 84, 24, 13, 1, 42, 21, 11]
    const sorted_array = [1, 2, 3, 11, 13, 18, 21, 24, 42, 84]
    const output = SortLib.bubble_sort(array)
    const reversed_output = SortLib.bubble_sort(array, false)
    let answer, method = 'Bubble sort'
    new validator(output.array).is_same(sorted_array)
        .and().bind(new validator(reversed_output.array).is_same(sorted_array.reverse()))
        .on(true, () => answer = true)
        .on(false, () => answer = false)
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}
module.exports = TestBubbleSort