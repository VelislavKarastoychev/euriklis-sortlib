'use strict'
const message = require('@euriklis/message')
function ComparisonSortLibAndSort() {
    let answer = false, elements = 100, iterations = 1,
        dt1, dt2, qs_time = 0, ms_time = 0, hs_time = 0, bs_time = 0,
        bub_time = 0, convent_time = 0, cs_time = 0, is_time = 0,
        sels_time = 0
    const validator = require('@euriklis/validator')
    const SortLib = require('../index')
    const array = SortLib.generate_random_array(elements, 123456)
    const conventional_sorting = function (array, mode) {
        if (typeof mode === 'undefined') mode = true
        if (mode === 'decrease') mode = false
        const n = array.length
        let i, sorted_array = []
        for (i = 0; i < n >> 2; i++) {
            sorted_array[i << 2] = array[i << 2]
            sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
            sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
            sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        }
        if ((n % 4) >= 1) {
            sorted_array[n - 1] = array[n - 1]
        }
        if ((n % 4) >= 2) {
            sorted_array[n - 2] = array[n - 2]
        }
        if ((n % 4) >= 2) {
            sorted_array[n - 3] = array[n - 3]
        }
        return mode ? sorted_array.sort((a, b) => a - b) : sorted_array.sort((a, b) => b - a)
    }
    console.clear()
    new message().bold().set_color_green().append_check_mark().append_white_space()
        .set_color_yellow().append(`A random array with ${elements} elements from 0 to 1 was created successfully.`).reset().log()
    let sorted_array_qs, sorted_array_ms, sorted_array_cs, sorted_array_bubs,
        sorting_array_conventionally, sorted_array_hs, sorted_array_is, sorted_array_bcs,
        sorted_array_sels, i

    new message().bold().italic().underline().set_color_blue()
        .append('Results from the executing of the sorting algorithms efficiency:\n')
        .reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_qs = SortLib.quick_sort(array).array
        dt2 = Date.now()
        qs_time += (dt2 - dt1) / iterations
    }
    new message()
        .set_color_yellow()
        .append(`quick sort: ${qs_time / 1000} seconds.\n`).reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_ms = SortLib.merge_sort(array).array
        dt2 = Date.now()
        ms_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`merge sort: ${ms_time / 1000} seconds.\n`).reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_hs = SortLib.heap_sort(array).array
        dt2 = Date.now()
        hs_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`heap sort: ${hs_time / 1000} seconds.\n`).reset().log()

    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_bcs = SortLib.bucket_sort(array).array
        dt2 = Date.now()
        bs_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`bucket sort: ${bs_time / 1000} seconds.\n`).reset().log()
    /**
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_cs = SortLib.cocktail_sort(array).array
        dt2 = Date.now()
        cs_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`cocktail sort: ${cs_time / 1000} seconds.\n`).reset().log()
    */
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorting_array_conventionally = conventional_sorting(array)
        dt2 = Date.now()
        convent_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`conventional js sort: ${convent_time / 1000} seconds.\n`).reset().log()
    /*
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_is = SortLib.insertion_sort(array).array
        dt2 = Date.now()
        is_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`insertion sort: ${is_time / 1000} seconds.\n`).reset().log()
    
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_bubs = SortLib.bubble_sort(array).array
        dt2 = Date.now()
        bub_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`bubble sort: ${bub_time / 1000} seconds.\n`).reset().log()
    for (i = 0; i < iterations; i++) {
        dt1 = Date.now()
        sorted_array_sels = SortLib.selection_sort(array).array
        dt2 = Date.now()
        sels_time += (dt2 - dt1) / iterations
    }
    new message().set_color_yellow()
        .append(`selection sort: ${sels_time / 1000} seconds.\n`).reset().log()
    */    
    new validator(sorting_array_conventionally).is_same(sorted_array_ms)
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_qs)
        )
        /*.and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_bubs)
        )*/
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_bcs)
        )
        /*.and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_is)
        )
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_cs)
        )*/
        .and().bind(
            new validator(sorting_array_conventionally).is_same(sorted_array_hs)
        )
        .on(true, () => answer = true)
    return new Promise((resolve, reject) => {
        if (answer) resolve('Comparison of conventional js sort function and the SortLib library')
        else reject('Comparison of conventional js sort function and the SortLib library')
    })
}
module.exports = ComparisonSortLibAndSort