'use strict';
import message from '@euriklis/message';
import * as texts from './errorTexts.js';
export default () => {
    const error = new Error();
    error.name = new message().set_color_yellow().underline().italic()
        .bold().append(texts.ErrorText).reset().text;
    error.message = new message().set_color_red()
        .append_warning_sign().append_white_space().set_color_blue()
        .append(texts.IncorrectElementParameterInRemoveElementFromSortedArray).reset().text;
    throw error;
}