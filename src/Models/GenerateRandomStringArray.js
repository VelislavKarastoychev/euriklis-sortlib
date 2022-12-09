'use strict';
/**
 * 
 * @param {number} n 
 * @param {number} l 
 * @param {number} seed 
 * @param {function(string, number, number):string} callback 
 * @returns {Array.<string>}
 */
const GenerateRandomStringArray = (n, l, seed, callback) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQSTUVWXWZabcdefghijklmnopqrstuvwxyz0123456789';
    const symbols = alphabet.length;
    let i, j, k, word, rand = [], temp = [];
    for (i = 0; i < (n * l) >> 2; i++) {
        j = i << 2;
        word = j / l | 0;
        if (!(j % l)) temp[word] = '';
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        temp[word] += alphabet.charAt((symbols * (seed * 4.656612875e-10)) << 0)
        if (typeof callback === 'function') rand[word] = callback(temp[word], word)
        else rand[word] = temp[word];
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        word = ((j + 1) / l) | 0;
        if (!((j + 1) % l)) temp[word] = '';
        temp[word] += alphabet.charAt((symbols * (seed * 4.656612875e-10)) << 0);
        if (typeof callback === 'function') rand[word] = callback(temp[word], word);
        else rand[word] = temp[word];
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        word = (j + 2) / l | 0;
        if (!((j + 2) % l)) temp[word] = '';
        temp[word] += alphabet.charAt((symbols * seed * 4.656612875e-10) << 0);
        if (typeof callback === 'function') rand[word] = callback(temp[word], word);
        else rand[word] = temp[word];
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        word = (j + 3) / l | 0;
        if (!((j + 3) % l)) temp[word] = '';
        temp[word] += alphabet.charAt((symbols * seed * 4.656612875e-10) << 0);
        if (typeof callback === 'function') rand[word] = callback(temp[word], word);
    }
    if ((n * l) % 4 >= 1) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647;
        word = ((n * l) - 1) / l | 0;
        if (!((n * l - 1) % l)) temp[word] = '';
        temp[word] += alphabet.charAt((symbols * seed * 4.656612875e-10) << 0);
        if (typeof callback === 'function') rand[word] = callback(temp[word], word)
        else rand[word] = temp[word];
    }
    if ((n * l) % 4 >= 2) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        word = ((n * l) - 2) / l | 0;
        if (!((n * l - 2) % l)) temp = '';
        if (seed < 0) seed += 2147483647
        temp[word] += alphabet.charAt((symbols * seed * 4.656612875e-10) << 0);
        if (typeof callback === 'function') rand[word] = callback(temp[word], word)
        else rand[word] = temp[word];
    }
    if ((n * l) % 4 >= 3) {
        seed <<= 0
        k = (seed / 127773) >> 0
        seed = (16807 * (seed - k * 127773) - k * 2836) >> 0
        if (seed < 0) seed += 2147483647
        word = (n * l - 3) / l | 0;
        if (!((n * l - 3) % l)) temp[word] = ''
        rand[word] += alphabet.charAt((symbols * seed * 4.656612875e-10) << 0);
        if (typeof callback === 'function') rand[word] = callback(temp[word], word);
        else rand[word] = temp[word];
    }
    return rand;
}
export default GenerateRandomStringArray;