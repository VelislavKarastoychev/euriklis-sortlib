'use strict'
const validator = require('@euriklis/validator')
function TestSortObjectArray() {
    const method = 'sort object array by property'
    const SortLib = require('../index')
    let answer = false, 
    obj_array = [
        {
            attributes: {
                id: 13
            }
        },
        {
            attributes: {
                id: 2
            }
        },
        {
            attributes: {
                id: 7
            }
        },
        {
            attributes: {
                id: 1
            }
        },
        {
            attributes : {
                value : 3.4
            }
        },
        {
            attributes: {
                id: 4
            }
        }
    ]
    let result = [
        {
            attributes: {
                id: 1
            }

        },
        {
            attributes: {
                id: 2
            }
        },
        {
            attributes: {
                id: 4
            }
        },
        {
            attributes: {
                id: 7
            }
        },
        {
            attributes: {
                id: 13
            }
        }
    ]
    let output = SortLib.sort_object_array_by_property(obj_array, ['attributes', 'id'])
    new validator(output.array).is_same(result).on(true, () => answer = true)
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}
module.exports = TestSortObjectArray