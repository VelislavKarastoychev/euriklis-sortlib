'use strict'
function ComparisonSortLibAndSort () {
    let answer = false
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    const array = Array.from({ length : 10000}).map(Math.random)
    console.time('Conventional sorting')
    const sorted_array_conventionally = [...array].sort()
    console.timeEnd('Conventional sorting')
    console.time('Sorting with merge sort')
    const sorted_array_ms = SortLib.merge_sort(array, true).array
    console.timeEnd('Sorting with merge sort')
    console.time('Heap sort')
    const sorted_array_hs = SortLib.heap_sort(array).array
    console.timeEnd('Heap sort')
    console.time('Insertion sort')
    const sorted_array_is = SortLib.insertion_sort(array).array
    console.timeEnd('Insertion sort')
    console.time('Bubble sort')
    const sorted_array_bubs = SortLib.bubble_sort(array).array
    console.timeEnd('Bubble sort')
    console.time('Bucket sort')
    const sorted_array_bcs = SortLib.bucket_sort(array).array
    console.timeEnd('Bucket sort')
    console.time('Cocktail sort')
    const sorted_array_cs = SortLib.cocktail_sort(array).array
    console.timeEnd('Cocktail sort')
    console.time('Quick sort')
    const sorted_array_qs = SortLib.quick_sort(array).array
    console.timeEnd('Quick sort')
    // console.log(sorted_array_conventionally)
    //console.log(sorted_array_ms)
    const conventional_sorting = new validator(sorted_array_conventionally)
    conventional_sorting.is_same(sorted_array_ms)
    .and().bind(
        conventional_sorting.is_same(sorted_array_qs)
    ).and().bind(
        conventional_sorting.is_same(sorted_array_bubs)
    ).and().bind(
        conventional_sorting.is_same(sorted_array_bcs)
    ).and().bind(
        conventional_sorting.is_same(sorted_array_is)
    ).and().bind(
        conventional_sorting.is_same(sorted_array_cs)
    ).and().bind(
        conventional_sorting.is_same(sorted_array_hs)
    ).on(true, () => answer = true)
    return new Promise((resolve, reject) => {
        if (answer) resolve('Comparison of conventional js sort function and the SortLib library')
        else reject('Comparison of conventional js sort function and the SortLib library')
    })
}
module.exports = ComparisonSortLibAndSort