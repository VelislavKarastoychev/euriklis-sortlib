'use strict'
async function TestSortLibConstructor () {
    const SortLib = require('../index')
    const sortLibInstance = new SortLib({ 
        array : [12, 3, 10, 17, 9, 188, 3, 121, 37, 44],
    })
    return sortLibInstance
}

module.exports = TestSortLibConstructor