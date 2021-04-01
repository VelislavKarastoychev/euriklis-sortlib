'use strict'
const message = require('@euriklis/message')
const texts = require('./infoTexts')
module.exports = (parameters) => {
    return new message().bold().italic().underline()
        .set_color_yellow().append(texts.InfoText).reset()
        .set_color_green().append_check_mark().append_white_space()
        .reset().set_color_cyan().append(texts.AutomaticallySetToDefault(parameters))
        .reset().log()
}