'use strict';
const texts = require('./errorTexts');
const message = require('@euriklis/message');
module.exports = () => {
    const err_name = new message().bold().italic().underline()
        .set_color_yellow().append(texts.ErrorText).reset().text;
    const err_message = new message().set_color_blue()
        .append(texts.IncorrectLengthInGRSA).reset().text;
    const error = new Error();
    error.name = err_name;
    error.message = err_message;
    throw error;
}