'use strict';
import message from '@euriklis/message';
import * as texts from './errorTexts.js';
module.exports = () => {
    const error_message = new message().bold().italic().underline()
        .set_color_yellow().append(texts.ErrorText).reset().set_color_red()
        .append_not_check_mark().set_color_cyan().append_white_space()
        .append(texts.IncorrectStatusInSetter).reset().text
    throw new Error(error_message)
}