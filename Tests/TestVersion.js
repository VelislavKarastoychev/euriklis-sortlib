'use strict'
function TestVersion() {
    const message = require('@euriklis/message')
    const SortLib = require('../index')
    return new Promise((resolve, reject) => {
        const info_message = new message().bold().italic()
            .underscore().set_color_yellow().append('Euriklis information message:\n')
            .reset().set_color_violet().append(`The current version of the SortLib package is ${SortLib.version}`)
            .reset().log()
        resolve(info_message)
    })
}

module.exports = TestVersion