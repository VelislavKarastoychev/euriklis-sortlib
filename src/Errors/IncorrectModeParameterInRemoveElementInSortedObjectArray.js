'use strict';
const texts = require('./errorTexts');
const message = require('@euriklis/message');
module.exports = () => {
    const error = new Error();
    error.name = new message().bold().italic().underline()
        .set_color_yellow().append(texts.ErrorText).reset().text;
    error.message = new message()
        .set_color_red().append_not_check_mark().append_white_space()
        .set_color_blue().append(texts.IncorrectModeParameterInRemoveElementFromSortedObjectArray)
        .reset().text;
    throw error;
}