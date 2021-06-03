'use strict'
const validator = require('@euriklis/validator')
const SortLib = require('../index')
function TestFindWorstElements () {
    let answer = false
    const method = 'Find worst elements'
    const array = [11, 12, 1.4, 34, 0.43, 42, 2, 4]
    const result = [0.43, 1.4, 2, 4]
    console.log(SortLib.find_worst_elements(array, 4))
    new validator(SortLib.find_worst_elements(array, 4).array)
    .is_same(result).and().bind(
        new validator(SortLib.find_worst_elements(array, 4).indices)
        .is_same([4, 2, 6, 7])
    ).on(true, () => answer = true)
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}
module.exports = TestFindWorstElements