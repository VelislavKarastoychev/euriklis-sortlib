# Euriklis - message package.

## About the package:

The ***@euriklis/message*** or ***euriklis-message*** package is a javascript tool that provide an utility library for colored console printing of messages with some additional properties like warning symbol, information symbol, check symbol or not check symbol. 

# Installation

To install the euriklis-message package just run in the terminal the following command.

`npm install @euriklis/message --save --save-exact`

This command will add the package to your node_modules folder.

# Usage:

To use the message library you have to get it from the package:

```js
const message = require ('@euriklis/message')
// print an information message:
new message().bold().italic().underline().set_color_yellow()
    .append('Euriklis information message:\n')
    .reset().set_color_green().append_check_mark()
    .set_color_cyan().append_white_space()
    .append('The message library of the euriklis package was successfully installed.')
    .reset().log()
// print an error message:
new message().bold().italic().underline().set_color_yellow()
    .blink().append('Euriklis error message:\n')
    .reset().set_color_red().append_warning_sign().set_color_yellow().append('The message library of the euriklis package prints error message for you.')
    .reset().log()
```

# Methods:

## message methods

All the methods of the message class return message object, but make changes on the text parameter of the instance.So the architecture of the library allows you to chain the methods of the @euriklis/message library.
Every message instance has a text property, that is the result of the applied methods.
In 03.03.2021 the current version was upgraded and a set of new methods, especially into the ground of the mathematics and symbols was added.

- method bold:
```js 
new message().bold()
``` 
makes the text that will be printed in the terminal after that to has bold style. For example:

```js
new message().append('This text will be bold...').bold()
    .reset().log()
```
- method italic:
```js
new message().italic()
``` 
makes the text that will be printed in the terminal with italic style. On the example that was shown above we can apply the italic method as well as the bold method.
```js
new message().append('This text will be bold and italic...')
    .bold().italic()
    .reset().log()
```
- method underline or underscore (?!?):
```js
 new message().underline() 
 // or 
 new message().underscore()
 ``` 
  this method makes the style of the text that will be printed on the terminal to be underlined.
```js
new message().append('Underlined text')
    .underline().reset().log()
```

- method blink:
```js
new message().blink()
``` 
the text that will be printed on the terminal will blink periodically.
- method family setColor (set_color_black, set_color_green, set_color_red, set_color_yellow, set_color_violet, set_color_cyan and etc...):
```js
/**
 * @param {string}color
 **/
new message().setColor(color)
```
sets the color of the text that will be printed on the terminal. The possible values of the color are 'black', 'red', 'green', 'blue', 'grey', 'violet', 'cyan' and finally 'yellow'. We recommend you to use the more user-friendly methods set_color_red, set_color_cyan and etc...
For example, let say that we want to print an info message to the terminal with underlined yellow bold style and the content of the information message to be cyan color, then we have to write:
```js
const message = require('@euriklis/message')
new message().bold().italic().underline()
    .set_color_yellow() // or setColor('yellow')
    .append('Information message:\n')
    .reset() // to unset the bold, italic and underline
    .set_color_cyan()
    .append('The file was successfully updated...')
    .reset().log()
```
- method family setBgColor:
```js
new message().setBgColor(color)
```
 sets the background color of the text message that will be printed on the terminal. The possible color values of the method are the same with the setColor() method. 

- method reset: 
 ```js
 new message().reset()
 ```
 reset, restart the color/background color and style properties of the text to the default.This method has to be used to unset previous properties like bold, italic, underline. When we want to change the color, it is not necessary to use this method because the set_color_... will change the color automatically. For more detail see the example for the underline and bold method above.
 - method family append/prepend:
 ```js
 /**
  * @param {string} text_message
  **/
 new message().append(text_message)
 ```
 appends a text to the current text property of the message instance. To see the message you have to use the log() method.
 ```js
 const message = require('@euriklis/message')
 new message().append('We appended a text').log()
 ```
 ```js
append_check_mark()
```
 appends check mark symbol to the text.
 For example:
 ```js
 const message = require('@euriklis/message')
 const validator =  require('@euriklis/validator')
 let buffer = null
 // Here we combine the message library with the
 // @euriklis/validator package to show a more complicated
 // way for the using of the message methods.
 new validator(buffer).is_array().and().is_empty()
     .or().is_same(null).or().is_undefined()
     .on(true, () => {
         new message().bold().italic().underline()
             .set_color_yellow()
             .append('Information message:\n').reset()
             .set_color_green()
             .append_check_mark().append_white_space()
             .set_color_cyan()
             .append('The buffer is empty and the program will ')
             .append('start to compute the required values...')
             .reset().log()
     })
 ```

```js
new message().append_not_check_mark()
```
appends the not check mark symbol (&#x237B;) to the text property of the message instance. (prepend_not_check_mark() also exists).

```js
new message().append_warning_sign() 
```
appends a warning sign (&#x26A0;) to the text property of current the message instance.
 
```js
new message().append_white_space() 
```
appends an empty interval to the text property.
- method log: 
```js
new message().log() 
```
prints the message on the terminal. 
- method warn:
```js
new message().warn()
```
execute console.warn method to the text.
- method error:
```js
new message().error()
```
execute console.error() method to the text property.
- method info:
```js
new message().info()
```
execute console.info() method to the text property.

Note that the color, background color and style method are valid only in the node terminal environment.

# More useful examples:

Let say that we want to print a mathematical expression in formal logic. We can use the append_math_... and append_logic_... methods of the library.
```js
new message().bold().set_color_yellow().setBgColor('red')
    .append_logical_forAll_symbol().append(' a, b : ')
    .append('a ').append_logical_element_of_symbol()
    .append_white_space().append_math_natural_numbers_symbol()
    .append_white_space().append_logical_conjunction_symbol()
    .append_white_space().append('b')
    .append_white_space().append_logical_element_of_symbol()
    .append_white_space().append_math_natural_numbers_symbol()
    .append_white_space().append_logical_follows_symbol()
    .append_white_space().append_logical_exists_symbol()
    .append_white_space().append('c :')
    .append_white_space().append('c ')
    .append_logical_element_of_symbol()
    .append_white_space().append_math_natural_numbers_symbol()
    .append_white_space().append_logical_conjunction_symbol()
    .append(' c').append_white_space()
    .append_logical_identical().append_white_space()
    .append('a + b ').reset().log()
```
and we have to take the following result in the terminal:


<p>
   <div style = "color:yellow;background-color:red;">
   <em>
   ∀ a, b : a ∈ ℕ ⋀ b ∈ ℕ ⇒ ∃ c : c ∈ ℕ ⋀ c ≡ a + b
   </em>
   </div>
</p>

The message library is constructed especially for the needs of writing and printing of mathematical expressions into the terminal, so the methods family 
```js 
new message().append_math_<some symbol> and
new message().append_logical_<some symbol> 
```
provides a rich assortment of functionalities and methods that ensure the supporting of expressions relevant to the logical programming, mathematical formulas, integrals, differential equations and partial differentials and set theory.

For example we can write a differential equation:

```js
new message()
    .append_math_cube_root_symbol()
    .append('x + ').append_math_partial_differential()
    .append('y / ').append_math_partial_differential()
    .append('x + ').append('w * y = 0').reset().log()
```
and will obtain as result in the terminal:

```
∛x + ∂y / ∂x + w * y = 0
```
Some other new symbols and functionalities that are not mathematical and logic are presenting in the following code:
```js
new message()
    .append('This is the ambulance symbol:')
    .append_ambulance_symbol().append('\n')
    .append('This is the corona virus symbol:')
    .append_corona_virus_symbol().append('\n')
    .append('This is the copyright symbol:')
    .append_copyright_symbol().append('\n')
    .append('This is the registered symbol:')
    .append_registered_symbol().append('\n')
    .append('This is the masked face symbol:')
    .append_face_with_medical_mask_symbol().append('\n')
    .append('This is the hourglass symbol:')
    .append_hourglass_symbol().append('\n')
    .append('This is the heart symbol:')
    .append_heart_symbol().append('\n')
    .append('This is the keyboard symbol:')
    .append_keyboard_symbol().append('\n')
    .append('This is a joyful face:')
    .append_face_with_tears_of_joy().append('\n')
    .append('This is the water symbol:')
    .append_potable_water_symbol().append('\n')
    .append('This is the Bitcoin symbol:')
    .append_bitcoin_symbol().append('\n')
    .append('This is the rose symbol:')
    .append_rose_symbol().append('\n')
    .append('This is the euro symbol:')
    .append_euro_symbol().append('\n')
    .append('This is the question mark symbol:')
    .append_question_mark_ornament().append('\n')
    .reset().log()
```
The expected output in the terminal has to be:

```
This is the ambulance symbol:🚑
This is the corona virus symbol:🦠
This is the copyright symbol:©
This is the registered symbol:®
This is the masked face symbol:😷
This is the hourglass symbol:⌛
This is the heart symbol:❤
This is the keyboard symbol:⌨
This is a joyful face:😂
This is the water symbol:🚰
This is the Bitcoin symbol:₿
This is the rose symbol:🌹
This is the euro symbol:€
This is the question mark symbol:❓
```

Note for the non console messages. The symbols that are supported of the message library can be used also in the html files or in the site text content. The only exception in this case is that the method family setColor(...) , setBgColor(...), error(), warn(), reset(), italic(), bold(), underline/underscore() and log() can not be used. If you want to put the obtained text content just get the text property of the message instance. The same issue is valid for the Error throwing , where for the throwing of error we simply have to get the text property. For example:
```js
const message = require('@euriklis/message')
const error_message = new message().bold().italic()
    .underline().set_color_yellow()
    .append('Internal error message:\n').reset()
    .set_color_red().append_warning_symbol()
    .append_white_space().set_color_cyan()
    .append('The file name that was created already exists ')
    .append('so please select other name for your application.')
    .reset().text
throw new Error(error_message)
``` 


# Bugs and tips

If you want to inform me for something useful for this project or for some possible mistake or error, you can send me an email to exel_mmm@abv.bg or to euriklis@hotmail.com

# License

This project has MIT license. Everyone that use it has to know that the author of the project is not responsible for any third party software or hardware harms that follows from the using of this library. The package is free to use supposing that the it will be not part of some commercial software or hardware product.
