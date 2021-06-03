'use strict'
const message = require('@euriklis/message')
const texts = require('./warningTexts')
module.exports = () => {
    return new message().bold().italic().underline()
        .set_color_yellow().append(texts.WarningText)
        .reset().set_color_red().append_not_check_mark().append_white_space()
        .set_color_cyan().append(texts.IncorrectCountParameterInFindBestElements)
        .reset().log()
}