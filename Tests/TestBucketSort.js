'use strict'
function TestBucketSort () {
    const method = 'bucket sort'
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    let answer,
    array = [12, 2, -21, 32,1.2, 43, 5, 3],
    sorted_array = [-21, 1.2, 2, 3, 5, 12, 32, 43],
    output = SortLib.bucket_sort(array, true, 3)
    console.log(output)
    new validator(output.array).is_same(sorted_array)
    .on(true, () => answer = true)
    .on(false, () => answer = false)
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}