'use strict';
const GetItemValue = (item, property) => {
    let i, p, k = Object.assign({}, item);
    for (i = 0; i < property.length; i++) {
        p = property[i];
        k = k[p];
    }
    return k;
}
export default GetItemValue;