'use strict';
import message from '@euriklis/message';
import * as texts from './infoTexts.js';
export default (parameters) => {
    return new message().bold().italic().underline()
        .set_color_yellow().append(texts.InfoText).reset()
        .set_color_green().append_check_mark().append_white_space()
        .reset().set_color_cyan().append(texts.AutomaticallySetToDefault(parameters))
        .reset().log();
};