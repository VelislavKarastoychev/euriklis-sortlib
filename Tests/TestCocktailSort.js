'use strict'
function TestCocktailSort() {
    const method = 'cocktail sort'
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    const array = [45, 1, 5, 2, 423, 23, 21, 55, 16, 24, 67]
    const sorted_array = [1, 2, 5, 16, 21, 23, 24, 45, 55, 67, 423]
    const output = SortLib.cocktail_sort(array)
    const reversed_output = SortLib.cocktail_sort(array, false)
    const sort_lib_instance = new SortLib()
    sort_lib_instance.array = array
    sort_lib_instance.algorithm = 'cocktail sort'
    sort_lib_instance["sort mode"] = true
    sort_lib_instance.sort()
    const reversed_instance = new SortLib()
    reversed_instance.array = array
    reversed_instance.algorithm = 'cocktail sort'
    reversed_instance['sort mode'] = false
    reversed_instance.sort()
    let answer
    new validator(output.array).is_same(sorted_array)
        .and().bind(
            new validator(reversed_output.array).is_same([...sorted_array].reverse())
        )
        .and().bind(new validator(sort_lib_instance.array).is_same(sorted_array))
        .and().bind(new validator(reversed_instance.array).is_same([...sorted_array].reverse()))
        .on(true, () => answer = true)
        .on(false, () => answer = false)
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}
module.exports = TestCocktailSort