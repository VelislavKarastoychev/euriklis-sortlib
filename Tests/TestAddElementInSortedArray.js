'use strict'
function TestAddElementInSortedArray() {
    const SortLib = require('../index')
    const validator = require('@euriklis/validator')
    const array = [1, 2, 3, 4, 5, 6, 8, 9, 10]
    const array1 = [1, 3, 5]
    const array2 = [1, 3, 5, 8]
    const array3 = [1, 3, 5, 7]
    const output = SortLib.addElementInSortedArray(array, 7)
    const output1 = SortLib.addElementInSortedArray(array1, 7)
    const output2 = SortLib.addElementInSortedArray(array2, 7)
    const output3 = SortLib.addElementInSortedArray(array3, 7)
    let answer
    new validator(output.array).is_same([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        .and().bind(new validator(output1.array).is_same([1, 3, 5, 7]))
        .and().bind(new validator(output2.array).is_same([1, 3, 5, 7, 8]))
        .and().bind(new validator(output3.array).is_same([1, 3, 5, 7, 7]))
        .on(true, () => answer = true)
        .on(false, () => answer = false)
    return new Promise((resolve, reject) => {
        if (answer) resolve("addElementInSortedArray")
        else reject("addElementInSortedArray")
    })
}
module.exports = TestAddElementInSortedArray