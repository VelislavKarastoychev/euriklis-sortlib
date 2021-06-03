'use strict'
const texts = require('./errorTexts')
const message = require('@euriklis/message')
module.exports = () => {
    const error_message = new message().bold().italic().underline()
        .set_color_yellow().append(texts.ErrorText).reset()
        .set_color_red().append_not_check_mark().append_white_space()
        .set_color_cyan().append(texts.IncorrectArrayParameterInFindBestElements)
        .reset().text
    throw new Error(error_message)
}