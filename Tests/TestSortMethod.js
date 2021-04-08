'use strict'
function TestSortMethod () {
    const SortLib = require('../index')
    const array = [4, 1, 5, 35, 9, 289, 3, 24, 14, 21, 6, 28]
    const sortlib_instance = new SortLib({array})
    // the unsorted array
    console.log(sortlib_instance)
    sortlib_instance.algorithm = 'quick sort'
    // the sorted array with the quick sort algorithm
    sortlib_instance.sort()
    console.log(sortlib_instance)
    // reset the array and apply the
    // insertion sort algorithm.
    sortlib_instance.algorithm = 'insertion sort'
    sortlib_instance.status = 'unsorted'
    sortlib_instance.array = array
    sortlib_instance.sort()
    // the sorted array with the insertion sort
    // algorithm...
    console.log(sortlib_instance)
    sortlib_instance.algorithm = 'bubble sort'
    sortlib_instance.status = 'unsorted'
    sortlib_instance.sort()
    console.log(sortlib_instance)
    return new Promise((resolve, reject) => {
        resolve("sort method")
    })
}
module.exports = TestSortMethod