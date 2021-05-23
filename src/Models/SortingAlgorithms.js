'use strict'
/**
 * 
 * @param {number} n 
 * @param {number} seed
 * @returns {Array.<number>}
 * @description this function creates a
 * random array that has the same elements
 * for given n. We use the John Burkardt routine
 * written in Fortran for the usage of the
 * algorithm 451 (M.Box complex optimization method).
 * We only utilize the code in such a manner that the
 * array creating to be more efficient by using
 * of bitwise operations. 
 */
function random_array_generator(n, seed) {
    let i, k, rand = []
    for (i = 0; i < n >> 1; i++) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[i << 1] = seed * 4.656612875e-10
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[(i << 1) + 1] = seed * 4.656612875e-10
    }
    if (n & 1) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[n - 1] = seed * 4.656612875e-10
    }
    return rand
}
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
function mergeSort(array, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    let i, j, k, l, p, s, t, condition, copied_indices = []
    let copied_array = [], sorted_array = [], sorted_indices = []
    const n = array.length
    for (i = 0; i < (n >> 1); i++) {
        j = i << 1
        copied_indices[j] = j
        sorted_indices[j] = j
        copied_indices[j + 1] = j + 1
        sorted_indices[j + 1] = j + 1
        copied_array[j] = array[j]
        copied_array[j + 1] = array[j + 1]
        sorted_array[j] = array[j]
        sorted_array[j + 1] = array[j + 1]
    }
    if (n & 1) {
        sorted_indices[n - 1] = n - 1
        copied_indices[n - 1] = n - 1
        copied_array[n - 1] = array[n - 1]
        sorted_array[n - 1] = array[n - 1]
    }
    k = 1
    while (k < n) {
        p = ((n / k) >> 0) + ((n % k) ? 1 : 0)
        for (s = 0; s < p >> 1; s++) {
            i = (s << 1) * k
            j = ((s << 1) + 1) * k
            t = (((s + 1) << 1) * k > n) ? n : ((s + 1) << 1) * k
            for (l = (s << 1) * k; l < t; l++) {
                condition = mode ? copied_array[i] >= copied_array[j] : copied_array[i] <= copied_array[j]
                if (i >= ((s << 1) + 1) * k) {
                    sorted_array[l] = copied_array[j]
                    sorted_indices[l] = copied_indices[j]
                    ++j
                } else if (j >= t) {
                    sorted_array[l] = copied_array[i]
                    sorted_indices[l] = copied_indices[i]
                    ++i
                } else {
                    if (condition) {
                        sorted_array[l] = copied_array[j]
                        sorted_indices[l] = copied_indices[j]
                        ++j
                    } else {
                        sorted_array[l] = copied_array[i]
                        sorted_indices[l] = copied_indices[i]
                        ++i
                    }
                }
            }
        }
        for (i = 0; i < n >> 1; i++) {
            j = i << 1
            copied_array[j] = sorted_array[j]
            copied_array[j + 1] = sorted_array[j + 1]
            copied_indices[j] = sorted_indices[j]
            copied_indices[j + 1] = sorted_indices[j + 1]
        }
        k <<= 1
    }
    return { array: sorted_array, indices: sorted_indices }
}
/**
 * 
 * @param {Array.<number | string>} array 
 * @param {boolean | 'decrease' | 'increase'} mode
 * @returns {{array : Array.<number | string>, indices : Array.<number>}}
 * @description this utility function implements
 * the merge sort algorithm that is used in the merge_sort
 * static method and in the sort method of the SortLib library.
 * The function is designed to implements the algorithm
 * in such a way that the time efficiency will be optimal
 * in comparison with the conventional sort method. Note that
 * the method is swallow by the quick sort because of the
 * storage procedures (we need to store the initial array 3 times
 * in order to save the initial array and two copies to the indices array).
 * Thus the merge sort can be more efficient than the quick sort only
 * if the length of the array is greater than 4*10^6.
 */
function mergeSort(array, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    let i, j, k, l, p, s, t, condition, copied_indices = []
    let copied_array = [], sorted_array = [], sorted_indices = []
    const n = array.length
    for (i = 0; i < (n >> 1); i++) {
        j = i << 1
        copied_indices[j] = j
        sorted_indices[j] = j
        copied_indices[j + 1] = j + 1
        sorted_indices[j + 1] = j + 1
        copied_array[j] = array[j]
        copied_array[j + 1] = array[j + 1]
        sorted_array[j] = array[j]
        sorted_array[j + 1] = array[j + 1]
    }
    if (n & 1) {
        sorted_indices[n - 1] = n - 1
        copied_indices[n - 1] = n - 1
        copied_array[n - 1] = array[n - 1]
        sorted_array[n - 1] = array[n - 1]
    }
    k = 1
    while (k < n) {
        p = ((n / k) >> 0) + ((n % k) ? 1 : 0)
        for (s = 0; s < p >> 1; s++) {
            i = (s << 1) * k
            j = ((s << 1) + 1) * k
            t = (((s + 1) << 1) * k > n) ? n : ((s + 1) << 1) * k
            for (l = (s << 1) * k; l < t; l++) {
                condition = mode ? copied_array[i] >= copied_array[j] : copied_array[i] <= copied_array[j]
                if (i >= ((s << 1) + 1) * k) {
                    sorted_array[l] = copied_array[j]
                    sorted_indices[l] = copied_indices[j]
                    ++j
                } else if (j >= t) {
                    sorted_array[l] = copied_array[i]
                    sorted_indices[l] = copied_indices[i]
                    ++i
                } else {
                    if (condition) {
                        sorted_array[l] = copied_array[j]
                        sorted_indices[l] = copied_indices[j]
                        ++j
                    } else {
                        sorted_array[l] = copied_array[i]
                        sorted_indices[l] = copied_indices[i]
                        ++i
                    }
                }
            }
        }
        for (i = 0; i < n >> 1; i++) {
            j = i << 1
            copied_array[j] = sorted_array[j]
            copied_array[j + 1] = sorted_array[j + 1]
            copied_indices[j] = sorted_indices[j]
            copied_indices[j + 1] = sorted_indices[j + 1]
        }
        k <<= 1
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
    let i, j, p, sorted_array = [], temp,
        tail = [], condition, first, last, sorted_indices = []
    const n = array.length
    for (i = 0; i < n >> 1; i++) {
        sorted_array[i << 1] = array[i << 1]
        sorted_indices[i << 1] = i << 1
        sorted_array[(i << 1) + 1] = array[(i << 1) + 1]
        sorted_indices[(i << 1) + 1] = (i << 1) + 1
    }
    if (n & 1) {
        sorted_array[n - 1] = array[n - 1]
        sorted_indices[n - 1] = n - 1
    }
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
 * @param {boolean | 'decrease' | 'increase'} mode
 * @description this utility function implements the
 * Heap sort algorithm. The function uses the two
 * sub-functions shift_down and heap_shift_down... 
 */
function heap_sort(array, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    const n = array.length
    let i, j, k, m, t, sorted_array = [], sorted_indices = [], condition
    while (i < (n >> 1)) {
        sorted_array[i << 1] = array[i << 1]
        sorted_indices[i << 1] = i << 1
        sorted_array[(i << 1) + 1] = array[(i << 1) + 1]
        sorted_indices[(i << 1) + 1] = (i + 1) << 1
        ++i
    }
    if (n & 1) {
        sorted_array[n - 1] = array[n - 1]
        sorted_indices[n - 1] = n - 1
    }
    // transform the array into heap...
    k = (n - 2) >> 1
    while (k >= 0) {
        // shift down
        j = k
        while ((j << 1) + 1 <= n - 1) {
            m = j
            condition = mode ? sorted_array[m] < sorted_array[(j << 1) + 1] : sorted_array[m] > sorted_array[(j << 1) + 1]
            if (condition) m = (j << 1) + 1
            condition = mode ? sorted_array[m] < sorted_array[(j + 1) << 1] : sorted_array[m] > sorted_array[(j + 1) << 1]
            if ((j + 1) << 1 <= n - 1 && condition) m = (j + 1) << 1
            if (m === j) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[j]
                sorted_array[j] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[j]
                sorted_indices[j] = t
                j = m
            }
        }
        --k
    }
    // sort the array with the heap sort...
    k = n - 1
    while (k > 0) {
        // swap the k and the 0 elements
        t = sorted_array[0]
        sorted_array[0] = sorted_array[k]
        sorted_array[k] = t
        t = sorted_indices[0]
        sorted_indices[0] = sorted_indices[k]
        sorted_indices[k] = t
        --k
        // shift down the subarray sorted_array[0:k]
        i = 0
        while ((i << 1) + 1 <= k) {
            m = i
            condition = mode ? sorted_array[m] < sorted_array[(i << 1) + 1] : sorted_array[m] > sorted_array[(i << 1) + 1]
            if (condition) m = (i << 1) + 1
            condition = mode ? sorted_array[m] < sorted_array[(i + 1) << 1] : sorted_array[m] > sorted_array[(i + 1) << 1]
            if (((i + 1) << 1) <= k && condition) m = (i + 1) << 1
            if (i === m) break
            else {
                t = sorted_array[m]
                sorted_array[m] = sorted_array[i]
                sorted_array[i] = t
                t = sorted_indices[m]
                sorted_indices[m] = sorted_indices[i]
                sorted_indices[i] = t
                i = m
            }
        }
    }
    return { array: sorted_array, indices: sorted_indices }
}


function insertion_sort(array, ascending_order) {
    if (typeof ascending_order === 'undefined') ascending_order = true
    if (ascending_order === 'decrease') ascending_order = false
    const n = array.length
    let i, j, sorted_array = [...array], p, k, condition,
        sorted_indices = sorted_array.map((e, i) => e = i)
    for (i = 1; i < n; i++) {
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
    return { array: sorted_array, indices: sorted_indices }
}

/**
 * 
 * @param {Array.<number | string>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array : Array.<number | string>, indices : Array.<number>}} 
 * @description this is an utility function that implements the
 * selection sort algorithm.
 */
function selection_sort(array, mode) {
    if (mode === 'decrease') mode = false
    if (typeof mode === 'undefined') mode = true
    const n = array.length
    let i, j, m, condition, temp,
        sorted_array = [...array],
        sorted_indices = sorted_array.map((e, i) => e = i)
    for (i = 0; i < n - 1; i++) {
        m = i
        for (j = i + 1; j < n; j++) {
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
    return { array: sorted_array, indices: sorted_indices }
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
function cocktail_sort(array, mode) {
    let n = array.length, sorted_array = [...array],
        indices = Array.from({ length: n }).map((e, i) => e = i)
    let i, start, end, condition, temp, swapped = true

    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    start = 0
    end = n - 1
    while (swapped) {
        swapped = false
        for (i = start; i < end; i++) {
            condition = mode ? sorted_array[i] > sorted_array[i + 1] : sorted_array[i] < sorted_array[i + 1]
            if (condition) {
                temp = sorted_array[i]
                sorted_array[i] = sorted_array[i + 1]
                sorted_array[i + 1] = temp
                temp = indices[i]
                indices[i] = indices[i + 1]
                indices[i + 1] = temp
                swapped = true
            }
        }
        if (!swapped) break
        swapped = false
        --end
        for (i = end - 1; i > start - 1; i--) {
            condition = mode ? sorted_array[i] > sorted_array[i + 1] : sorted_array[i] < sorted_array[i + 1]
            if (condition) {
                temp = sorted_array[i]
                sorted_array[i] = sorted_array[i + 1]
                sorted_array[i + 1] = temp
                temp = indices[i]
                indices[i] = indices[i + 1]
                indices[i + 1] = temp
                swapped = true
            }
        }
        ++start
    }
    return { array: sorted_array, indices }
}

/**
 * 
 * @param {Array.<number>} array 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{array : Array.<number>, indices: Array.<number>}}
 * @description this utility function implements
 * the bucket sort algorithm. Note that this
 * algorithm is not fast sorting algorithm and
 * has worst complexity of O(n^2) and average
 * time complexity of O(n + n^2 / k + k), where
 * the k is the count of the buckets.
 *  
 */
function bucket_sort(array, buckets, mode) {
    if (typeof mode === 'undefined') mode = true
    if (mode === 'decrease') mode = false
    let sorted_array = [], i, j, temp, min, indices = [],
        temp_array = [], temp_indices = [], n, max
    for (i = 0; i < buckets; i++) {
        temp_array.push([])
        temp_indices.push([])
    }
    // find the biggest element of the array.
    max = array[0]
    n = array.length
    for (i = 0; i < n; i++) if (array[i] > max) max = array[i]
    // find the min element:
    min = array[0]
    for (i = 0; i < n; i++) if (array[i] < min) min = array[i]
    // push the arrays into the right sub-array of the temp_array
    for (i = 0; i < n; i++) {
        j = (((array[i] - min) / (max - min)) * (buckets - 1)) | 0
        temp_array[j].push(array[i])
        temp_indices[j].push(i)
    }
    // sort all the subarrays of the temp and concatenate then to
    // the sorted_array
    for (j = mode ? 0 : buckets - 1; mode ? j < buckets : j >= 0; mode ? j++ : j--) {
        temp = insertion_sort(temp_array[j], mode)
        sorted_array.push(...temp.array)
        indices.push(...temp.indices.map(el => {
            return temp_indices[j][el]
        }))
    }
    return { array: sorted_array, indices }
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
    merge_sort: mergeSort,
    MergeSort: mergeSort,
    Merge_sort: mergeSort,
    quick_sort: quickSort,
    QuickSort: quickSort,
    Quick_sort: quickSort,
    bubble_sort,
    BubbleSort: bubble_sort,
    Bubble_sort: bubble_sort,
    bucket_sort,
    bucketSort: bucket_sort,
    BucketSort: bucket_sort,
    cocktail_sort,
    CocktailSort: cocktail_sort,
    cocktailSort: cocktail_sort,
    heap_sort,
    heapSort: heap_sort,
    HeapSort: heap_sort,
    insertion_sort,
    insertionSort: insertion_sort,
    InsertionSort: insertion_sort,
    selection_sort,
    selectionSort: selection_sort,
    SelectionSort: selection_sort,
    generate_random_array: random_array_generator,
    GenerateRandomArray: random_array_generator,
    Generate_random_array: random_array_generator,
}