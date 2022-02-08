'use strict'
import message from '@euriklis/message';
import * as texts from './errorTexts';
export default () => {
    const error = new Error();
    error.name = new message().bold().italic().underline()
        .set_color_yellow().append(texts.ErrorText).reset().text;
    error.message = new message().set_color_red()
        .append_warning_sign().append_white_space().set_color_cyan()
        .append(texts.IncorrectArgumentInIndexSetter).reset().text;
    throw error;
}