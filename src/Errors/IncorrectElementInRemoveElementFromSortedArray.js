'use strict';
const texts = require('./errorTexts');
const message = require('@euriklis/message');
module.exports = () => {
    const error = new Error();
    error.name = new message().bold().italic().underline()
        .set_color_yellow().append(texts.ErrorText).reset().text;
    error.message = new message().set_color_blue()
        .append(texts.IncorrectElementParameterInRemoveElementFromSortedArray)
        .reset().text;
    throw error;
}