const message = require('@euriklis/message')
const texts = require('./warningTexts')
module.exports = () => {
    return new message().bold().italic().underline()
        .set_color_yellow().append(texts.WarningText)
        .reset().set_color_cyan().append(texts.UndefinedArrayInSortLibConstructor)
        .reset().log()
}