'use strict';
const texts = require('./errorTexts');
const message = require('@euriklis/message');
module.exports = () => {
    const err_name = new message().bold().italic().underline()
       .set_color_yellow().append(texts.ErrorText).reset().text;
    const err_message = new message().set_color_red().append_not_check_mark()
       .append_white_space().set_color_cyan()
       .append(texts.IncorrectPropertyParameterInAddElementInSortedObjectArrayByProperty)
       .reset().text;
    let error = new Error();
    error.name = err_name;
    error.message = err_message;
    throw error;
}