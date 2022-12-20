'use strict';
import get_item_value from './GetItemValue.js';
/**
 * 
 * @param {Array.<{}>} array 
 * @param {Array.<string>} property 
 * @param {{}} element 
 * @param {boolean | 'increase' | 'decrease'} mode
 * @returns {{ array: Array.<{}>, indices: Array.<number>}}
 * @description this utility function implements the binary searching
 * for object arrays which are sorted by a specific value. If
 * the object array has more than one embedded structures, then the
 * properties has to be inserted as string elements in the property array.
 * The method returns all the elements which have final property equals
 * to the element parameter and the indices of these elements in the array.
 * If the array does not consists these properties, then no searching will be
 * made. 
 */
const FindElementsInSortedObjectArrayByProperty = (array, property, element, mode) => {
    const n = array.length, output = { array: [], indices: [] };
    let first = 0, last = n - 1, middle, found = false, condition;
    while (1) {
        middle = (first + last) >> 1;
        if (get_item_value(array[middle], property) === get_item_value(element, property)) {
            found = true;
        }
        if (first === middle) {
            if (!found) ++middle;
            if (get_item_value(array[middle], property) === get_item_value(element, property)) {
                found = true;
            }
            break;
        }
        condition = mode ? get_item_value(array[middle], property) > get_item_value(element, property)
            : get_item_value(array) < element;

        if (condition) {
            last = middle;
        } else first = middle;
    }
    if (found) {
        while (1) {
            output.array.unshift(array[middle]);
            output.indices.unshift(middle);
            --middle;
            if (get_item_value(array[middle], property) !== get_item_value(element, property)) break;
        }
    } else output.indices.push(-1);
    return output;
}
export default FindElementsInSortedObjectArrayByProperty;