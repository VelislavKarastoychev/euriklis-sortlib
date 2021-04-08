const validator = require('@euriklis/validator')
const message = require('@euriklis/message')
new message().bold().italic().underline()
    .set_color_yellow().append('Euriklis sortlib package was run successfully...\n')
    .reset().set_color_green().append_check_mark()
    .append_white_space().reset()
    .set_color_cyan().append('This package is a collection of array sorting algorithms ')
    .append('that are implemented in javascript. The most interesting and useful ')
    .append('algorithms for sorting that you may use from the package are the merge sort and quick sort algorithms.')
    .reset()
    .log()

const SortLib = require('./src')
module.exports = SortLib
