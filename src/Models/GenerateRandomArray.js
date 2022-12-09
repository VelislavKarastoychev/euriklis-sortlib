'use strict';
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
 const  GenerateRandomArray = (n, seed, callback) => {
    let i, k, rand = []
    for (i = 0; i < n >> 2; i++) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[i << 2] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[i << 2] = callback(rand[i << 2], i << 2)
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[(i << 2) + 1] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[(i << 2) + 1] = callback(rand[(i << 2) + 1], (i << 2) + 1)
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[(i << 2) + 2] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[(i << 2) + 2] = callback(rand[(i << 2) + 2], (i << 2) + 2)
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[(i << 2) + 3] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[(i << 2) + 3] = callback(rand[(i << 2) + 3], (i << 2) + 3)
    }
    if (n % 4 >= 1) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[n - 1] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[n - 1] = callback(rand[n - 1], n - 1)
    }
    if (n % 4 >= 2) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[n - 2] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[n - 2] = callback(rand[n - 2], n - 2)
    }
    if (n % 4 >= 3) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        rand[n - 3] = seed * 4.656612875e-10
        if (typeof callback === 'function') rand[n - 3] = callback(rand[n - 3], n - 3)
    }
    return rand
}
export default GenerateRandomArray;