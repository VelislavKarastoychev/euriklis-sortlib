'use strict';
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
    for (i = 0; i < n >> 2; i++) {
        sorted_array[i << 2] = array[i << 2]
        sorted_indices[i << 2] = i << 2
        sorted_array[(i << 2) + 1] = array[(i << 2) + 1]
        sorted_indices[(i << 2) + 1] = (i << 2) + 1
        sorted_array[(i << 2) + 2] = array[(i << 2) + 2]
        sorted_indices[(i << 2) + 2] = (i << 2) + 2
        sorted_array[(i << 2) + 3] = array[(i << 2) + 3]
        sorted_indices[(i << 2) + 3] = (i << 2) + 3
    }
    if (n % 4 >= 1) {
        sorted_array[n - 1] = array[n - 1]
        sorted_indices[n - 1] = n - 1
    }
    if (n % 4 >= 2) {
        sorted_array[n - 2] = array[n - 2]
        sorted_indices[n - 2] = n - 2
    }
    if (n % 4 >= 3) {
        sorted_array[n - 3] = array[n - 3]
        sorted_indices[n - 3] = n - 3
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
export default quickSort;