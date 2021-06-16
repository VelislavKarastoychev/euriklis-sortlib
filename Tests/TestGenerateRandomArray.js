'use strict'
const SortLib = require('../index')
const validator = require('@euriklis/validator')
function TestGenerateRandomArray() {
    const rand = SortLib.generate_random_array(100, null, el => el = (el * 100) >> 0)
    return new Promise((resolve, reject) => {
        new validator(rand).is_array().and()
            .for_all(numbers => {
                return numbers.is_integer().and().is_in_closed_range(0, 100)
            }).on(true, () => {
                resolve('Generate random array')
            }).on(false, () => {
                reject('Generate random array')
            })
    })
}
module.exports = TestGenerateRandomArray