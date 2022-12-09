'use strict';
/**
 * 
 * @param {number} n 
 * @returns {Array.<number>}
 */
const GenerateInitialIndices = (n) => {
    const indices = [];
    let i, j;
    for (i = 0;i < n >> 2;i++) {
        j = i << 2;
        indices[j] = j;
        indices[j + 1] = j + 1;
        indices[j + 2] = j + 2;
        indices[j + 3] = j + 3;
    }
    if (n % 4 >= 3) indices[n - 3] = n - 3;
    if (n % 4 >= 2) indices[n - 2] = n - 2;
    if (n % 4 >= 1) indices[n - 1] = n - 1;
    return indices;
}
export default GenerateInitialIndices;