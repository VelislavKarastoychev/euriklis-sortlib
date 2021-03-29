'use strict'
/**
 * @class Message
 * @description this class is a tool for
 * printing text in the nodejs terminal
 * and for writing useful symbols like
 * warning and success symbols, underlying,
 * italic and bold text manipulation and
 * setting of the color or the background
 * of the text.
 * Every instance of this class has only one
 * property - i.e. the text property.
 */
class Message {
    /**
     * 
     * @param {String} message
     * the text that has to be printed.
     * @returns {Message}
     * @description the constructor of the
     * Message class creates the text property
     * of the instance and set it to the message.
     * The message has to be a string type argument.
     * If the message parameter is not defined,then
     * the text property of the constructor will be
     * an empty string. 
     */
    constructor(message = '') {
        this.text = message
    }
    /**
     * @method reset()
     * @description this method returns the default value
     * of the color and background color of the text. 
     */
    reset() {
        this.text += '\x1b[0m'
        return this
    }
    /**
     * @method bold()
     * @description this method makes the text
     * message with bold style. 
     */
    bold() {
        this.text += '\x1b[1m'
        return this
    }
    /**
     * @method italic()
     * @description this method set the
     * text style to italic.
     */
    italic() {
        this.text += '\x1b[3m'
        return this
    }
    blink() {
        this.text += '\x1b[5m'
        return this
    }
    /**
     * @method machine()
     * @description this method makes the style
     * of the text machine - like (<tt> - tag).
     */
    machine() {
        this.text += '\x1b[2m'
        return this
    }
    /**
     * @method underscore()
     * @returns {Message}
     * @description this method underlines the
     * the text of an message.
     */
    underscore() {
        this.text += '\x1b[4m'
        return this
    }
    /**
     * @same_as underscore()
     */
    underline () {
        return this.underscore()
    }
    /**
     * 
     * @param {String} color a string value
     * that is a valid terminal color.The possible
     * values for the color argument are: 
     * 'black', 'red', 'green', 'yellow', 'blue', 
     * 'violet', 'cyan' and 'grey'.
     * @returns {Message}
     * @description this method sets the color of the
     * text message that has to be printed on the terminal.
     */
    setColor(color = '\x1b[0m') {
        if (color === 'black') color = '\x1b[30m'
        if (color === 'red') color = '\x1b[31m'
        if (color === 'green') color = '\x1b[32m'
        if (color === 'yellow') color = '\x1b[33m'
        if (color === 'blue') color = '\x1b[34m'
        if (color === 'violet') color = '\x1b[35m'
        if (color === 'cyan') color = '\x1b[36m'
        if (color === 'grey') color = '\x1b[37m'
        this.text += color
        return this
    }
    /**
     * @method set_color_cyan()
     * @returns {Message}
     * @description this method
     * sets the color of the text to
     * cyan when the message will be
     * printed on the terminal.
     */
    set_color_cyan() {
        return this.setColor('cyan')
    }
    /**
     * @method set_color_violet()
     * @returns {Message}
     * @description this method sets the
     * color of the text message that will be
     * printed on the terminal.
     */
    set_color_violet() {
        return this.setColor('violet')
    }
    /**
     * @method set_color_yellow()
     * @returns {Message}
     * @description this method sets the
     * color of the text message to yellow
     * when the message will be printed.
     */
    set_color_yellow() {
        return this.setColor('yellow')
    }
    /**
     * @method set_color_green()
     * @returns {Message}
     * @description this message sets the
     * color of the text message to green
     * when the message will be printed.
     */
    set_color_green() {
        return this.setColor('green')
    }
    /**
     * @method set_color_blue()
     * @returns {Message}
     * @description this message sets the
     * color of the text message to blue
     * when the message will be printed on
     * the terminal.
     */
    set_color_blue() {
        return this.setColor('blue')
    }
    /**
     * @method set_color_red()
     * @returns {Message}
     * @description this method sets the
     * color of the text message to red
     * when the message will be printed on
     * the terminal.
     */
    set_color_red() {
        return this.setColor('red')
    }
    /**
     * @method set_color_black()
     * @returns {Message}
     * @description this method sets the color
     * of the text message to black when the message 
     * will be printed on the terminal.
     */
    set_color_black() {
        return this.setColor('black')
    }
    /**
     * @method set_color_grey()
     * @returns {Message}
     * @description this method sets the color
     * of the text message to grey when the message
     * will be printed on the terminal.
     */
    set_color_grey() {
        return this.setColor('grey')
    }
    /**
     * 
     * @param {String} bgcolor a string
     * value that has to be a valid console
     * color. The valid colors that can be
     * used form the user are the following:
     * 'black', 'red', 'yellow', 'blue', 'violet',
     * 'cyan', 'green', 'grey' 
     * @returns {Message}
     * @description this method sets the background 
     * color of the text message to the required value
     * from the user.
     */
    setBgColor(bgcolor = '\x1b[0m') {
        if (bgcolor === 'black') bgcolor = '\x1b[40m'
        if (bgcolor === 'red') bgcolor = '\x1b[41m'
        if (bgcolor === 'green') bgcolor = '\x1b[42m'
        if (bgcolor === 'yellow') bgcolor = '\x1b[43m'
        if (bgcolor === 'blue') bgcolor = '\x1b[44m'
        if (bgcolor === 'violet') bgcolor = '\x1b[45m'
        if (bgcolor === 'cyan') bgcolor = '\x1b[46m'
        if (bgcolor === 'grey') bgcolor = '\x1b[47m'
        this.text += bgcolor
        return this
    }
    /**
     * @method set_bgColor_grey()
     * @returns {Message}
     * @description this method sets the background
     * color of the text message to grey.
     */
    set_bgColor_grey() {
        return this.setBgColor('grey')
    }
    /**
     * @method set_bgColor_cyan()
     * @returns {Message}
     * @description this method sets the background
     * color of the text message to cyan.
     */
    set_bgColor_cyan() {
        return this.setBgColor('cyan')
    }
    /**
     * @method set_bgColor_violet()
     * @returns {Message}
     * @description this method sets the background
     * of the text message to violet.
     */
    set_bgColor_violet() {
        return this.setBgColor('violet')
    }
    /**
     * @method set_bgColor_blue()
     * @returns {Message}
     * @description this method sets the background
     * of the text message to blue.
     */
    set_bgColor_blue() {
        return this.setBgColor('blue')
    }
    /**
     * @method set_bgColor_yellow()
     * @returns {Message}
     * @description this method sets the background
     * color of the text message to yellow.
     */
    set_bgColor_yellow() {
        return this.setBgColor('yellow')
    }
    /**
     * @method set_bgColor_green()
     * @returns {Message}
     * @description this method sets the background
     * color of the text message to green.
     */
    set_bgColor_green() {
        return this.setBgColor('green')
    }
    /**
     * @method set_bgColor_red()
     * @returns {Message}
     * @description this method sets the background
     * color of the text message to red.
     */
    set_bgColor_red() {
        return this.setBgColor('red')
    }
    /**
     * @method set_bgColor_black()
     * @returns {Message}
     * @description this method sets the background
     * color of the text message to black.
     */
    set_bgColor_black() {
        return this.setBgColor('black')
    }

    /**
     * 
     * @param {String} text the message that will be
     * printed on the terminal.
     * @returns {Message}
     * @description this method appends a text to the text
     * property of the Message instance.
     */
    append(text = '') {
        this.text += text
        return this
    }
    /**
     * @method prepend
     * @param {string} text
     * @description this method put a text before the existing
     * text parameter of the message instance. 
     */
    prepend (text = '') {
        this.text = text + this.text
        return this
    }
    /**
     * @method append_copyright_symbol
     * @description this method put the copyright symbol
     * after the current text content of the message instance.
     */
    append_copyright_symbol() {
        this.text += '\u00A9'
        return this 
    }
    /**
     * @method prepend_copyright_symbol
     * @description this method put the copyright symbol
     * before the text content of the current message instance.
     */
    prepend_copyright_symbol() {
        this.text = '\u00A9' + this.text
        return this
    }
    /**
     * @method prepend_registered_symbol
     * @description this method put the registered symbol
     * before the text content of the current message instance.
     */
    prepend_registered_symbol() {
        return this.prepend('\u00AE')
    }
    /**
     * @method append_registered_symbol
     * @description this method put the registered symbol
     * after the text content of the current message instance.
     */
    append_registered_symbol() {
        return this.append('\u00AE')
    }
    /**
     * @method append_logical_not_symbol
     * @description this method put the
     * logical not symbol to the text content 
     * of the current message instance.
     */
    append_logical_not_symbol() {
        return this.append('\u00AC')
    }
    /**
     * @method prepend_logical_not_symbol
     * @description this method put the
     * logical not symbol to the text content
     * of the current message instance.
     */
    prepend_logical_not_symbol() {
        return this.prepend('\u00AC')
    }
    /**
     * @method append_logical_forAll_symbol
     * @description this method appends the
     * universal logical operator.
     */
    append_logical_forAll_symbol() {
        return this.append('\u2200')
    }
    /**
     * @method prepend_logical_forAll_symbol
     * @description this method put in the
     * beginning of the text content the 
     * universal logical operator.
     */
    prepend_logical_forAll_symbol () {
        return this.prepend('\u2200')
    }
    /**
     * @method append_logical_exists_symbol
     * @description this method put at the end of the
     * text content the exists logical operator.
     */
    append_logical_exists_symbol() {
        return this.append('\u2203')
    }
    /**
     * @method prepend_logical_exists_symbol
     * @description this method put in the beginning
     * of the text content the exists logical operator.
     */
    prepend_logical_exists_symbol() {
        return this.prepend('\u2203')
    }
    /**
     * @method append_logical_conjunction_symbol
     * @description this method puts the logical and
     * operator in the end of the text content of the
     * current message instance.
     */
    append_logical_conjunction_symbol () {
        return this.append('\u22C0')
    }
    /**
     * @method prepend_logical_conjunction_symbol
     * @description this method puts in the beginning of
     * the text content of the current message instance the
     * logical and operator.
     */
    prepend_logical_conjunction_symbol() {
        return this.prepend('\u22C0')
    }
    /**
     * @method append_logical_disjunction_symbol
     * @description this method puts in the end of the text
     * content of the current message instance the logical or
     * operator.
     */
    append_logical_disjunction_symbol () {
        return this.append('\u22C1')
    }
    /**
     * @method prepend_logical_disjunction_symbol
     * @description this method puts in the beginning of the
     * text content of the current message instance the logical 
     * or operator.
     */
    prepend_logical_disjunction_symbol() {
        return this.prepend('\u22C1')
    }
    /**
     * @method append_logical_element_of_symbol
     * @description this method puts in the end of
     * the text content of the current message instance
     * the logical element of operator.
     */
    append_logical_element_of_symbol () {
        return this.append('\u2208')
    }
    /**
     * @method prepend_logical_element_of_symbol
     * @description this method puts in the beginning of
     * the text content of the current message instance
     * the logical element of operator.
     */
    prepend_logical_element_of_symbol(){
        return this.prepend('\u2208')
    }
    append_logical_follows_symbol () {
        return this.append('⇒')
    }
    prepend_logical_follows_symbol () {
        return this.prepend('⇒')
    }
    append_logical_inverse_follows_symbol () {
        return this.append('⇐')
    }
    prepend_logical_inverse_follows_symbol() {
        return this.prepend('⇐')
    }
    append_logical_equivalence_symbol () {
        return this.append('⇔')
    }
    prepend_logical_equivalence_symbol() {
        return this.prepend('⇔')
    }
    append_logical_identical () {
        return this.append('≡')
    }
    prepend_logical_identical() {
        return this.prepend('≡')
    }
    append_logical_not_identical () {
        return this.append('≢')
    }
    prepend_logical_not_identical() {
        return this.prepend('≢')
    }

    append_math_natural_numbers_symbol () {
        return this.append('ℕ')
    }
    prepend_math_natural_numbers_symbol () {
        return this.prepend('ℕ')
    }
    append_math_partial_differential () {
        return this.append('∂')
    }
    prepend_math_partial_differential () {
        return this.prepend('∂')
    }
    append_math_empty_set() {
        return this.append('∅')
    }
    prepend_math_empty_set() {
        return this.prepend('∅')
    }
    append_math_increment() {
        this.append('∆')
    }
    prepend_math_increment() {
        this.prepend('∆')
    }
    append_math_nabla () {
        return this.append('∇')
    }
    prepend_math_nabla () {
        this.prepend('∇')
    }
    append_math_product_symbol() {
        return this.append('∏')
    }
    prepend_math_product_symbol() {
        return this.prepend('∏')
    }
    append_math_summation_symbol() {
        return this.append('∑')
    }
    prepend_math_summation_symbol() {
        return this.prepend('∑')
    }
    append_math_intersection_symbol() {
        this.append('∩')
    }
    prepend_math_intersection_symbol() {
        return this.prepend('∩')
    }
    append_math_union_symbol() {
        return this.append('∪')
    }
    prepend_math_union_symbol() {
        return this.prepend('∪')
    }
    append_math_integral_symbol() {
        return this.append('∫')
    }
    prepend_math_integral_symbol() {
        return this.prepend('∫')
    }
    append_double_integral_symbol() {
        return this.append('∬')
    }
    prepend_double_integral_symbol() {
        return this.prepend('∬')
    }
    append_math_triple_integral_symbol() {
        return this.append('∭')
    }
    prepend_math_triple_integral_symbol() {
        return this.prepend('∭')
    }
    append_math_proportional_symbol() {
        return this.append('∝')
    }
    prepend_proportional_symbol() {
        return this.prepend('∝')
    }
    append_math_infinity_symbol() {
        return this.append('∞')
    }
    prepend_math_infinity_symbol() {
        return this.prepend('∞')
    }
    append_math_contour_integral() {
        return this.append('∮')
    }
    prepend_math_contour_integral() {
        return this.prepend('∮')
    }
    append_math_volume_integral() {
        return this.append('∰')
    }
    prepend_math_volume_integral() {
        return this.prepend('∰')
    }
    append_math_almost_equal() {
        return this.append('≈')
    }
    prepend_math_almost_equal() {
        return this.prepend('≈')
    }
    append_math_almost_equal_or_equal() {
        return this.append('≊')
    }
    prepend_math_almost_equal_or_equal() {
        return this.prepend('≊')
    }
    append_math_estimates () {
        return this.append('≙')
    }
    prepend_math_estimates() {
        return this.prepend('≙')
    }
    append_math_equal_by_def () {
        return this.append('≝')
    }
    prepend_math_equal_by_def () {
        return this.prepend('≝')
    }
    append_math_sqrt_symbol() {
        return this.append('√')
    }
    prepend_math_sqrt_symbol() {
        return this.prepend('√')
    }
    append_math_cube_root_symbol() {
        return this.append('∛')
    }
    prepend_math_cube_root_symbol() {
        return this.prepend('∛')
    }
    append_math_forth_root_symbol() {
        return this.append('∜')
    }
    prepend_math_forth_root() {
        return this.prepend('∜')
    }
    append_math_subset_of_symbol() {
        return this.append('⊂')
    }
    prepend_math_subset_of_symbol() {
        return this.prepend('⊂')
    }
    append_math_superset_of_symbol () {
        return this.append('⊃')
    }
    prepend_math_superset_of_symbol() {
        return this.prepend('⊃')
    }
    append_hourglass_symbol () {
        return this.append('⌛')
    }
    prepend_hourglass_symbol() {
        this.prepend('⌛')
    }
    append_keyboard_symbol() {
        return this.append('⌨')
    }
    prepend_keyboard_symbol() {
        return this.prepend('⌨')
    }
    append_question_mark_ornament() {
        return this.append('❓')
    }
    append_bitcoin_symbol () {
        return this.append('₿')
    }
    prepend_bitcoin_symbol() {
        return this.prepend('₿')
    }
    append_euro_symbol() {
        return this.append('€')
    }
    prepend_euro_symbol() {
        return this.prepend('€')
    }
    append_face_with_tears_of_joy () {
        return this.append('😂')
    }
    prepend_face_with_tears_of_joy() {
        return this.prepend('😂')
    }
    append_heart_symbol () {
        return this.append('❤') 
    }
    prepend_heart_symbol() {
        return this.prepend('❤')
    }
    append_corona_virus_symbol() {
        return this.append('🦠')
    }
    prepend_corona_virus_symbol() {
        return this.prepend('🦠')
    }
    append_ambulance_symbol() {
        return this.append('🚑')
    }
    prepend_ambulance_symbol() {
        return this.prepend('🚑')
    }
    append_potable_water_symbol() {
        return this.append('🚰')
    }
    prepend_potable_water_symbol() {
        return this.prepend('🚰')
    }
    append_face_with_medical_mask_symbol() {
        return this.append('😷')
    }
    prepend_face_with_medical_mask_symbol() {
        this.prepend('😷')
    }
    append_rose_symbol() {
        return this.append('🌹')
    }
    prepend_rose_symbol() {
        return this.prepend('🌹')
    }
    /**
     * @method append_not_check_mark()
     * @returns {Message}
     * @description this method appends a not check
     * mark symbol to the text property of the Message
     * instance.
     */
    append_not_check_mark() {
        this.text += '\u237b'
        return this
    }
    /**
     * @method prepend_not_check_mark()
     * @returns {Message}
     * @description this method puts a
     * not check mark symbol to the text
     * property of the Message instance.
     */
    prepend_not_check_mark() {
        this.text = '\u237b' + this.text
        return this
    }
    /**
     * @method append_check_mark()
     * @returns {Message}
     * @description this method appends a check
     * mark symbol to the text property of the 
     * Message instance.
     */
    append_check_mark() {
        this.text += '\u2713'
        return this
    }
    /**
     * @method prepend_check_mark()
     * @returns {Message}
     * @description this method puts a check
     * mark symbol to the text property to the
     * text property of the Message instance.
     */
    prepend_check_mark() {
        this.text = '\u2713' + this.text
        return this
    }
    /**
     * @method append_ballot_box_with_check_mark()
     * @returns {Message}
     * @deprecated
     * @description this method appends a check mark
     * in a box symbol to the text property of the
     * Message instance.
     */
    append_ballot_box_with_check_mark() {
        this.text += '\u2611'
        return this
    }
    /**
     * @method prepend_ballot_box_with_check_mark()
     * @returns {Message}
     * @description this method puts a check mark
     * in a box symbol before the text property of the
     * Message instance.
     */
    prepend_ballot_box_with_check_mark() {
        this.text = '\u2611' + this.text
        return this
    }
    /**
     * @method append_white_heavy_check_mark()
     * @returns {Message}
     * @description this method appends check mark to
     * the text property of the Message instance.
     */
    append_white_heavy_check_mark() {
        this.text += '\u2705'
        return this
    }
    /**
     * @method prepend_white_heavy_check_mark()
     * @returns {Message}
     * @description this method puts a check mark 
     * before the text property of the Message instance.
     */
    prepend_white_heavy_check_mark() {
        this.text = '\u2705' + this.text
        return this
    }
    /**
     * @method append_heavy_check_mark()
     * @returns {Message}
     * @description this method appends a check mark
     * to the text property of the Message instance.
     */
    append_heavy_check_mark() {
        this.text += '\u2714'
        return this
    }
    /**
     * @method prepend_heavy_check_mark()
     * @returns {Message}
     * @description this method puts a check
     * mark to the text property of the Message instance.
     */
    prepend_heavy_check_mark() {
        this.text = '\u2714' + this.text
        return this
    }
    /**
     * @method append_warning_sign()
     * @returns {Message}
     * @description this method appends a warning sign
     * symbol to the text property of the Message instance.
     */
    append_warning_sign() {
        this.text += '\u26A0'
        return this
    }
    /**
     * @method prepend_warning_sign()
     * @returns {Message}
     * @description this method puts a warning sign
     * symbol before the text property of the 
     * Message instance.
     */
    prepend_warning_sign() {
        this.text += '\u26A0' + this.text
        return this
    }
    /**
     * 
     * @param {Integer} n
     * @method append_white_space()
     * @returns {Message}
     * @description this method appends n
     * white spaces to the text property of
     * the Message instance.
     */
    append_white_space(n = 1) {
        if (!Number.isInteger(n)) n = 1
        for (let i = 0; i < n; i++) this.text += ' '
        return this
    }
    /**
     * 
     * @param {Integer} n
     * @method prepend_white_space()
     * @return {Message}
     * @description this method puts n
     * white spaces before the text property
     * of the Message instance.
     */
    prepend_white_space(n = 1) {
        if (!Number.isInteger(n)) n = 1
        for (let i = 0; i < n; i++) this.text = ' ' + this.text
        return this
    }
    /**
     * @method log()
     * @return {Message}
     * @description this method prints the final text message
     * or the text property.
     */
    log() {
        console.log(this.text)
        return this
    }
    /**
     * @method info()
     * @return {Message}
     * @description this method writes the
     * text property of the Message instance
     * like information message.
     */
    info() {
        console.info(this.text)
        return this
    }
    /**
     * @method warn()
     * @return {Message}
     * @description this method writes the
     * text property of the Message instance
     * like warning message.
     */
    warn() {
        console.warn(this.text)
        return this
    }
    /**
     * @method error()
     * @return {Message}
     * @description this method writes the text
     * property of the Message instance like
     * error message. This method throws an error.
     */
    error() {
        console.error(this.text)
        return this
    }
}

module.exports = Message

