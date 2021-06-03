'use strict'
const validator = require('@euriklis/validator')
function TestFindWorstForObjectArray () {
    const method = 'find worst for object array by property'
    const SortLib = require('../index')
    let answer = false
    let random_array = SortLib.generate_random_array(50)
    let sorted_array = SortLib.quick_sort(random_array).array
    let object_array = Array.from({length : 50}).map((el, i) => {
        return { attributes : { value : random_array[i]}}
    })
    let sorted_object_array = Array.from({length : 11}).map((el, i) => {
        return { attributes : {value : sorted_array[i]}}
    })
    let sort_object_array = SortLib.find_worst_for_object_array_by_property(object_array, ['attributes', 'value'], 11).array
    console.log(sort_object_array, sorted_object_array)
    new validator(sort_object_array).is_same(sorted_object_array).on(true, () => answer = true) 
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}
module.exports = TestFindWorstForObjectArray