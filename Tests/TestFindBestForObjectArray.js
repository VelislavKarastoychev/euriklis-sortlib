'use strict'
const validator = require('@euriklis/validator')
function TestFindBestForObjectArray () {
    const SortLib = require('../index')
    const method = 'find best for object array by property'
    let answer = false
    let random_array = SortLib.generate_random_array(50)
    let sort_random_array = SortLib.quick_sort(random_array, false).array
    let object_array = Array.from({length : 50}).map((el, i) => { 
        return { attributes : {value : random_array[i]}}
    })
    let sorted_object_array = Array.from({length : 10}).map((el, i) => { 
        return { attributes : {value : sort_random_array[i]}}
    })
    let find_best_for_obj_array = SortLib.find_best_for_object_array_by_property(object_array, ['attributes', 'value'], 10)
    new validator(sorted_object_array).is_same(find_best_for_obj_array.array)
    .on(true, () => answer = true)
    return new Promise((resolve, reject) => {
        if (answer) resolve (method)
        else reject (method)
    })

}
module.exports = TestFindBestForObjectArray