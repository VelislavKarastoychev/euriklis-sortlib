const validator = require('@euriklis/validator')
const SortLib = require('../index')
function TestFindBestElements () {
    const method = 'Find best elements'
    let answer = false
    const array = [12, 1, 45, 23, 4, 15, 2, 114, 5, 18, 74, 88]
    const findBestItems = SortLib.find_best_elements(array, 3)
    const result = [114, 88, 74]
    new validator(findBestItems.array).is_same(result)
    .and().bind(
        new validator(findBestItems.indices).is_same([7, 11, 10])
    ).on(true, () => answer = true)
    return new Promise((resolve, reject) => {
        if (answer) resolve(method)
        else reject(method)
    })
}
module.exports = TestFindBestElements