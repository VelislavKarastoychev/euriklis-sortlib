'use strict';
const texts = require('./errorTexts');
const message = require('@euriklis/message');
module.exports = () => {
    const error = new Error();
    const error_name = new message().bold().italic().underline()
        .set_color_yellow().append(texts.ErrorText).reset().text;
    const error_message = new message().set_color_red().append_not_check_mark()
        .append_white_space().set_color_blue()
        .append(texts.IncorrectElementParameterInFindElementsInSortedObjectArray)
        .reset().text;
    error.name = error_name;
    error.message = error_message;
    throw error;
}