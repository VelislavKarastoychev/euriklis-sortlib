'use strict';
import message from '@euriklis/message';
import * as texts from './errorTExts.js';
export default () => {
    const error = new Error();
    error.name = new message().bold().italic()
        .underline().set_color_yellow().append(texts.ErrorText).reset().text;
    error.message = new message().set_color_blue()
        .append(texts.IncorrectArrayInRemoveElementFromSortedObjectArray)
        .reset().text;
    throw error;
}