'use strict'
import message from '@euriklis/message';
import * as  texts from './errorTexts';
export default () => {
    const error = new Error();
    error.name = new message().bold().italic().underline()
        .set_color_yellow().append(texts.ErrorText).reset().text;
    error.message = new message().set_color_red()
        .append_warning_sign().set_color_cyan().append_white_space()
        .append(texts.IncorrectArrayInSetterArray).text;
    throw new error;
}