'use strict'
/**
 * 
 * @param {Array} array 
 * @param {number} element 
 * @param {boolean} ascending_order
 * @returns {Array} sorted_array
 * @description - this is an utility function
 * for the statistics library of the
 * euriklis package. The function uses the
 * binary searching to detect the correct
 * position of the new element and then puts
 * it to the array. Finally all the elements are
 * shifted because of the new size of the array.
 * The array is copied for more security. 
 */
function PutInSortedArray(array, element, ascending_order) {
    let expanded_array = [], first, last, middle, condition
    if (typeof ascending_order === 'undefined') ascending_order = true // "increase"
    if (ascending_order === "decrease") ascending_order = false
    first = 0, last = array.length - 1
    while (true) {
        middle = (first + last) >> 1
        condition = ascending_order ? element > array[middle] : element < array[middle]
        if (first === last && last === middle) break
        if (condition) first = middle + 1
        else last = middle
    }
    if (ascending_order) {
        if (array[middle] > element) {
            for (first = 0; first < middle; first++) {
                expanded_array[first] = array[first]
            }
            expanded_array[middle] = element
            for (last = 0; last < array.length - middle; last++) {
                expanded_array.push(array[last + middle])
            }
        } else {
            for (first = 0; first < middle + 1; first++) {
                expanded_array[first] = array[first]
            }
            expanded_array.push(element)
            for (last = 0; last < array.length - middle - 1; last++) {
                expanded_array.push(array[last + middle + 1])
            }
        }
    }
    return expanded_array
}
/**
 * 
 * @param {Array} array 
 * @param {boolean} ascending_order
 * @returns {{array : Array, indices : Array}} 
 * @description this is an utility function for the
 * statistics library of the euriklis package. The
 * function implements the merge sort algorithm. We
 * have done some improvements for the more efficient
 * functionality of the algorithm. First we do not use
 * recursion in the algorithm, second we do not use
 * additional arrays to keep the items of the initial
 * array that have to be merged. Third we implement the
 * sorting algorithm directly into the function without
 * calling any additional function. These three things
 * improve the speed and the time efficiency of the algorithm
 * more than two times according to our metrics.
 */
function merge_sort(array, ascending_order) {
    let sorted_array = [...array], // real array
        sorted_indices = array.map((e, i) => i), // real array
        i, j, // real or integer 
        k, m, n, s, t, // integers
        condition // boolean
    if (typeof ascending_order === 'undefined') ascending_order = true
    if (ascending_order === 'decrease') ascending_order = false
    // get the length of the array.
    n = sorted_array.length
    // initializations
    // k is the number of elements in every sorted subarray
    // of the initial array.
    k = 1
    while (k < n) {
        s = 1
        while (s * k < n) {
            /**
             * Create the start and end indices
             * of the subarray sorted_array[(s - 1) * k : s * k - 1].
             * When we put an item ito the sorted subarray then
             * i or j will be set to the median or m element.
             */
            for (t = 0; t < k; t++) {
                i = (s - 1) * k + t
                j = s * k + t - 1
                m = (i + j) >> 1
                if (s * k + t >= n) break
                // get the element sorted_array[s * k + t]
                // and put it into the sorted subarray
                // sorted_array[(s - 1) * k + t : s * k + t - 1]
                while (1) {
                    if (i === j && j === m) break
                    condition = ascending_order ? sorted_array[m] > sorted_array[s * k + t] : sorted_array[m] < sorted_array[s * k + t]
                    if (condition) {
                        j = m
                    }
                    else {
                        i = m + 1
                    }
                    m = (i + j) >> 1
                }
                condition = ascending_order ? sorted_array[m] > sorted_array[s * k + t] ?
                    true : false
                    : sorted_array[m] < sorted_array[s * k + t] ?
                        true : false
                for (i = condition ? m : m + 1; i < s * k + t; i++) {
                    j = sorted_array[i]
                    sorted_array[i] = sorted_array[s * k + t]
                    sorted_array[s * k + t] = j
                    j = sorted_indices[i]
                    sorted_indices[i] = sorted_indices[s * k + t]
                    sorted_indices[s * k + t] = j
                }
            }
            s += 2
        }
        k = k << 1
    }
    return { array: sorted_array, indices: sorted_indices }
}
/**
 * 
 * @param {Array} array
 * @param {boolean} ascending_order
 * @returns {Array} sorted_array
 * @description this function is an utility
 * function for the statistics library of the
 * euriklis package. This function sorts the 
 * elements of an unordered array of numbers.
 * Definition: Rigid (static) point of an arbitrary 
 * array is a point which preserve its position when
 * the array is sorted. 
 * Definition: Turning point of an array is a point that
 * is rigid point and all the elements before this point 
 * are smaller than this point and all the elements after
 * it are higher than this point.
 * Proposition: An array is sorted if every element is turning
 * point. So if a point is a turning point, then
 * it will be stable an do not be changed when the array
 * will be sorted. If an array is sorted, then no changing
 * point will exists, because if such a point exists, then
 * this array will be not sorted.
 * So to construct an algorithm that sorts all the elements
 * of an array we have identify its turning points. In the
 * algorithm that follows we use the term "pivot" as an
 * alternative to the turning point.
 * The algorithm can be described with the following steps:
 * 1. Initialize the sorted_array to copied array,
 * mode to true by default and to false if is set to decrease.
 * Set also the n to the length of the array. Create the tail
 * queue and set it to [0, n - 1] initially.
 * 2. Loop forever
 * 3. If tail is empty, break the loop 2.
 * 4. [first, last] = tail.pop() // get the last elements of the tail.
 * 5. i = first, j = last, p = sorted_array[first]
 * 6. loop forever:
 * 7. If i === j go to step 12, otherwise 
 * If mode is true and  sorted_array[j] < p then condition = true
 * else condition = false
 * 8. If mode is false and sorted_array[j] > p then condition = true
 * otherwise the condition = false.
 * 9. If condition is true, then decrease the j with unit
 * and go to the step 7, otherwise swap the elements
 * sorted_array[i] with sorted_array[j] and go to step 10.
 * 10. if i < j increase the i with unit. Else go to step 12.
 * 11. If sorted_array[j] (this is the p or the pivot element)
 * is bigger or equal than the sorted_array[i] then
 * go to the step 10, otherwise swap the elements
 * sorted_array[i] with the sorted_array[j] and go to the step 7.
 * 12. In this step i has to be equal to j, so
 * we have to put the two sequences into the tail element.
 * if j - first > 1 then tail.push([first, j - 1])
 * if last - j > 1 then tail.push([j + 1, last])
 * break loop 6.
 * 
 */
function quickSort(array, mode) {
    let i, j, p, sorted_array = [...array], temp,
        tail = [], condition, first, last, sorted_indices
    const n = sorted_array.length
    sorted_indices = Array.from({ length: n }).map((e, i) => e = i)
    if (mode === 'decrease') mode = false
    if (typeof mode === 'undefined') mode = true
    tail.push([0, n - 1])
    while (1) {
        if (!tail.length) break
        [first, last] = tail.pop()
        i = first
        j = last
        p = sorted_array[first]
        while (1) {
            if (i === j || i >= j) break
            condition = mode ? p > sorted_array[j] : p < sorted_array[j]
            if (condition) {
                temp = sorted_array[i]
                sorted_array[i] = sorted_array[j]
                sorted_array[j] = temp
                temp = sorted_indices[i]
                sorted_indices[i] = sorted_indices[j]
                sorted_indices[j] = temp
                while (1) {
                    if (i === j || i >= j) break
                    ++i // note that p = sorted_array[j]
                    condition = mode ? sorted_array[i] > p : sorted_array[i] < p
                    if (condition) {
                        temp = sorted_array[i]
                        sorted_array[i] = sorted_array[j]
                        sorted_array[j] = temp
                        temp = sorted_indices[i]
                        sorted_indices[i] = sorted_indices[j]
                        sorted_indices[j] = temp
                        break
                    } else continue
                }
            } else --j
        }
        if (j - first > 1) tail.push([first, j - 1])
        if (last - j > 1) tail.push([j + 1, last])
    }
    return { array: sorted_array, indices: sorted_indices }
}
/**
 * 
 * @method bubble_sort
 * @param {Array} array 
 * @param {boolean | 'decrease' | 'increase'} ascending_order
 * @description this utility function function
 * implements the bubble sort algorithm for the
 * sorting of an array.  
 */
function bubble_sort(array, ascending_order) {
    let sorted_array = [...array], condition,
        i, j, sorted_indices = array.map((e, i) => i),
        n = array.length, temp
    if (typeof ascending_order === 'undefined') ascending_order = true
    if (ascending_order === 'decrease') ascending_order = false
    for (i = 0; i < n; i++) {
        for (j = 0; j < n - 1; j++) {
            if (ascending_order) condition = sorted_array[j + 1] > sorted_array[j]
            else condition = sorted_array[j + 1] < sorted_array[j]
            if (!condition) {
                temp = sorted_array[j]
                sorted_array[j] = sorted_array[j + 1]
                sorted_array[j + 1] = temp
                temp = sorted_indices[j]
                sorted_indices[j] = sorted_indices[j + 1]
                sorted_indices[j + 1] = temp
            }
        }
    }
    return { array: sorted_array, indices: sorted_indices }
}

/**
 * 
 * @param {Array} array 
 * @param {Array} indices 
 * @param {number} i 
 * @param {number} k 
 * @param {boolean | 'decrease' | 'increase'} mode
 * @description utility function used in the heap_shift_down
 * and heap_sort algorithm functions. 
 */

function shift_down(array, indices, i, k, mode) {
    let m, left, right, condition, temp
    if (mode === 'decrease') mode = false
    if (typeof mode === 'undefined') mode = true
    while (2 * k <= i) {
        left = 2 * k
        right = 2 * k + 1
        m = right
        condition = mode ? array[right - 1] < array[left - 1] : array[right - 1] > array[left - 1]
        if (condition || 2 * k === i) m = left
        condition = mode ? array[m - 1] > array[k - 1] : array[m - 1] < array[k - 1]
        if (condition) {
            temp = array[k - 1]
            array[k - 1] = array[m - 1]
            array[m - 1] = temp
            temp = indices[k - 1]
            indices[k - 1] = indices[m - 1]
            indices[m - 1] = temp
        }
        k = m
    }
    return { array, indices }
}

/**
 * 
 * @param {Array} array 
 * @param {Array} indices 
 * @param {boolean | 'decrease' | 'increase'} mode
 * @description this utility function is part of the
 * heap_sort algorithm. 
 */
function heap_shift_down(array, indices, mode) {
    let k = array.length >> 1, i
    for (i = k; i >= 1; i--) {
        let output = shift_down(array, indices, array.length, i, mode)
        array = output.array
        indices = output.indices
    }
    return { array, indices }
}

/**
 * 
 * @param {Array} array 
 * @param {boolean | 'decrease' | 'increase'} mode
 * @description this utility function implements the
 * Heap sort algorithm. The function uses the two
 * sub-functions shift_down and heap_shift_down... 
 */
function heap_sort(array, mode) {
    const n = array.length
    let sorted_array = [...array], temp, output,
        sorted_indices = sorted_array.map((e, i) => e = i)
    if (mode === 'decrease') mode = false
    if (typeof mode === 'undefined') mode = true
    // implementation...
    output = heap_shift_down(sorted_array, sorted_indices, mode)
    sorted_array = output.array
    sorted_indices = output.indices
    for (let i = n; i > 1; i--) {
        temp = sorted_array[0]
        sorted_array[0] = sorted_array[i - 1]
        sorted_array[i - 1] = temp
        temp = sorted_indices[0]
        sorted_indices[0] = sorted_indices[i - 1]
        sorted_indices[i - 1] = temp
        output = shift_down(sorted_array, sorted_indices, (i - 1), 1, mode)
        sorted_array = [...output.array]
        sorted_indices = [...output.indices]
    }
    return { array: sorted_array, indices: sorted_indices }
}


function insertion_sort(array, ascending_order) {
    if (typeof ascending_order === 'undefined') ascending_order = true
    if (ascending_order === 'decrease') ascending_order = false
    const n = array.length
    let i, j, sorted_array = [...array], p, k, condition,
        sorted_indices = sorted_array.map((e, i) => e = i)
    for (i = 1;i < n;i++) {
        p = sorted_array[i]
        k = sorted_indices[i]
        j = i - 1
        while (1) {
            condition = ascending_order ? sorted_array[j] <= p : sorted_array[j] >= p
            if (j < 0 || condition) break
            sorted_array[j + 1] = sorted_array[j]
            sorted_indices[j + 1] = sorted_indices[j]
            --j
        }
        sorted_array[j + 1] = p
        sorted_indices[j + 1] = k
    }
    return { array : sorted_array, indices: sorted_indices }
}

/**
 * 
 * @param {Array.<number | string>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array : Array.<number | string>, indices : Array.<number>}} 
 * @description this is an utility function that implements the
 * selection sort algorithm.
 */
function selection_sort (array, mode) {
    if (mode === 'decrease') mode = false
    if (typeof mode === 'undefined') mode = true
    const n = array.length
    let i, j, m, condition, temp,
    sorted_array = [...array],
    sorted_indices = sorted_array.map((e, i) => e = i)
    for (i = 0;i < n - 1;i++) {
        m = i
        for (j = i + 1;j < n;j++) {
            condition = mode ? sorted_array[j] < sorted_array[m] : sorted_array[j] > sorted_array[m]
            if (condition) m = j
        }
        if (m !== i) {
            temp = sorted_array[m]
            sorted_array[m] = sorted_array[i]
            sorted_array[i] = temp
            temp = sorted_indices[m]
            sorted_indices[m] = sorted_indices[i]
            sorted_indices[i] = temp 
        }
    }
    return {array : sorted_array, indices : sorted_indices}
}

/**
 * 
 * @param {Array.<number | string>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array : Array.<number | string>, indices : Array.<number>}}
 * @description this utility function implements
 * the cocktail sorting algorithm that is a variant
 * of the bubble sort algorithm. Note that this algorithm
 * is not fast (has complexity proportional to O(n^2)).
 */
function cocktail_sort (array, mode) {
    const n = array.length, sorted_array = [...array],
    indices = Array.from({length: n}).map((e, i) => e = i)
    let i, start, end, temp, condition, swapped = true
    [start, end] = [0, n - 1]
    while (swapped) {
        swapped = false
        for (i = start;i < end;i++) {
            condition = mode ? sorted_array[i] > sorted_array[i + 1] : sorted_array[i] < sorted_array[i + 1]
            if (condition) {
                [sorted_array[i], sorted_array[i + 1]] = [sorted_array[i + 1], sorted_array[i]]
                [indices[i], indices[i + 1]] = [indices[i + 1], indices[i]]
                swapped = true
            }
        }
        if (!swapped) break
        swapped = false
        --end
        for (i = end - 1;i > start - 1;i--) {
            condition = mode ? sorted_array[i] > sorted_array[i + 1] : sorted_array[i] < sorted_array[i + 1]
            if (condition) {
                [sorted_array[i], sorted_array[i + 1]] = [sorted_array[i + 1], sorted_array[i]]
                [indices[i], indices[i + 1]] = [indices[i + 1], indices[i]]
                swapped = false
            }
            ++start
        }
    }
    return {array : sorted_array, indices}
}

/**
 * 
 * @param {array} array
 * @param {"merge sort" | "quick sort" | "bubble sort"} method
 * @param {boolean} ascending_order
 * @returns {array} sorted_array
 * @description this function is an utility
 * method for the Statistics library that
 * sorts the array with the merge sort,
 * quick sort algorithms. If the user does not
 * select the method then by default the function
 * selects the 'merge sort' method.
 */
function SortArray(array, method, ascending_order = true) {
    if (method === 'quick sort') sorted_array = quick_sort(array, ascending_order)
    else if (method === 'bubble sort') sorted_array = bubble_sort(array, ascending_order)
    else if (method === 'heap sort') sorted_array = heap_sort(array, ascending_order)
    else if (method === 'insertion sort') sorted_array = insertion_sort(array, ascending_order)
    else sorted_array = merge_sort(array, ascending_order)
    return sorted_array
}

module.exports = {
    SortArray,
    PutInSortedArray,
    merge_sort,
    MergeSort: merge_sort,
    Merge_sort: merge_sort,
    quick_sort: quickSort,
    QuickSort: quickSort,
    Quick_sort: quickSort,
    bubble_sort,
    BubbleSort: bubble_sort,
    Bubble_sort: bubble_sort,
    cocktail_sort,
    CocktailSort : cocktail_sort,
    cocktailSort : cocktail_sort,
    heap_sort,
    heapSort: heap_sort,
    HeapSort: heap_sort,
    insertion_sort,
    insertionSort : insertion_sort,
    InsertionSort : insertion_sort,
    selection_sort,
    selectionSort : selection_sort,
    SelectionSort : selection_sort,

}