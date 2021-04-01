'use strict'
const message = require('@euriklis/message')
const texts = require('./errorTexts')
module.exports = () => {
    const error_message = new message().bold().italic()
        .underline().set_color_yellow().append(texts.ErrorText)
        .reset().set_color_blue().append(texts.IncorrectArrayDeclarationInSortLibConstructor)
        .reset()
    throw new Error(error_message.text)
}