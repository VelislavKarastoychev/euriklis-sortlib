'use strict'
class validator {
    /**
     * 
     * @param {any} parameter a javascript
     * valid variable. The type of the parameter
     * can be an arbitrary valid expression in
     * javascript or a type defined in this language.
     * @description The validator class is a javascript
     * library with tool for condition verification in
     * javascript. Every validator has properties answer,
     * value and internal (not for user usage) properties
     * _question, _operand, _required. Do declare an validator
     * expression just type new validator(<some expression>). To
     * verify if this expression covers some conditions use the
     * methods of the class and for more complex logical sentences
     * use the and, or and not methods. To compare the truth of two
     * validator expressions you have to use the bind method. See
     * the methods of the validator class for more information.   
     */
    constructor(parameter) {
        this.value = parameter
        this.answer = null
        this.required = false
        this.description = `This is a validator Object.` +
            `This library provides functionalities for checking, ` +
            `testing and validating of some data in javascript language.`
    }
    /**
     * @internal an internal method for obtaining
     * of the result of some logical operations.
     * @returns {validator}
     */
    _set_answer_() {
        if (this._not) {
            this._question = !this._question
        }
        if (this._operand === 'or') {
            this.answer = this.answer || this._question
        }
        if (this._operand === 'and') {
            this.answer = this.answer && this._question
        }
        if (typeof this._operand === 'undefined') {
            this.answer = this._question
        }
        delete this._not
        delete this._operand
        delete this._question
        return this
    }
    /**
     * @method copy() creates a new instance
     * with value parameter the current value
     * of the validator and ignore the answer
     * parameter that was obtained.
     * @returns {validator} the answer property of the
     * returned instance is undefined.
     */
    copy() {
        return new validator(this.value)
    }
    /**
     * @method absolute_copy() create a new instance
     * of the current validator object and records
     * the obtained answer and other properties of
     * the instance...
     * @returns {validator} the answer property of the
     * returned instance is the same as the answer property
     * of the current validator instance.
     */
    absolute_copy() {
        let v = new validator(this.value)
        v._not = this._not
        v._operand = this._operand
        v._question = this._question
        v.answer = this.answer
        return v
    }
    /**
     * @method and() set the operator
     * of the current validator instance
     * to the logical and (&) and in the
     * next not operator method execute a
     * logical conjunction. 
     */
    and() {
        this._operand = 'and'
        return this
    }
    /**
     * @method or() set the operator
     * to logical or (||) and in the next
     * non operational method executes the
     * operation disjunction.
     */
    or() {
        this._operand = 'or'
        return this
    }
    /**
     * @method not() set the operator to logical
     * negation for the current validator instance.
     * When the next non operational method is run
     * the operation of logical negation will be executed
     * and the obtained result will be written in the
     * value property of the validator instance.
     */
    not() {
        this._not = true
        return this
    }
    /**
     * @method required()
     * @deprecated
     * @description a method that set an internal
     * property of the current validator instance
     * and this property might be used in the interface()
     * validator method. See the description and commentaries
     * for the interface() method.
     */
    is_required() {
        this.required = true
        return this
    }
    /**
     * @method is_undefined()
     * @returns {validator}
     * @description this method checks if the
     * current value property is undefined and if this
     * condition is fulfilled returns true, otherwise
     * returns false. 
     */
    is_undefined() {
        let q = typeof this.value === 'undefined'
        this._question = q
        return this._set_answer_()
    }
    /**
     * @method is_boolean()
     * @returns {validator}
     * @description This method checks if the value property
     * of the current validator instance is of boolean type.
     */
    is_boolean() {
        this._question = typeof this.value === 'boolean'
        return this._set_answer_()
    }
    /**
     * @method is_string()
     * @returns {validator}
     * @description This method estimates if the
     * value property of the current validator instance
     * is string and return true if this condition is
     * fulfilled, otherwise returns false.
     */
    is_string() {
        this._question = typeof this.value === 'string'
        return this._set_answer_()
    }
    /**
     * @method is_number()
     * @returns {validator}
     * @description This method checks if the property
     * value of the current validator instance if number
     * type and if this condition is fulfilled returns true
     * otherwise returns false. Note that the number can be of string type,
     * or can be floating point number or integer number.
     */
    is_number() {
        this._question = (typeof this.value === 'number') && !isNaN(this.value)
        return this._set_answer_()
    }
    /**
     * @method is_integer()
     * @returns {validator}
     * @description a void method that checks
     * if the value property of the current 
     * validator instance is integer number or
     * not and returns true or false in the answer
     * property. 
     */
    is_integer() {
        this._question = Number.isInteger(this.value)
        return this._set_answer_()
    }
    /**
     * @method is_float()
     * @returns {validator}
     * @description a void method that checks if
     * the value property of the current validator
     * instance is floating point number or not and 
     * sets the answer property of the returned instance
     * to true or false respectively. 
     */
    is_float() {
        this._question = this.copy()
            .is_number()
            .and()
            .not()
            .is_integer().answer
        return this._set_answer_()
    }
    /**
     * 
     * @param {Number} a a real number that
     * has to be lesser or equal to than the
     * validator instance value property.
     * @returns {validator}
     * @description a method that checks if the
     * value property of the current validator
     * instance is bigger than a real number, say a
     * and sets the answer property of the returned 
     * validator instance to true or false respectively.  
     */
    is_bigger_than(a) {
        this._question = this.copy().is_number().answer && this.value > a
        return this._set_answer_()
    }
    /**
     * 
     * @param {Number} a a real number that
     * has to be greater or equal to the current
     * value property of the validator instance.
     * @returns {validator}
     * @description this method checks if the value
     * property of the current validator instance is
     * lesser than a real number say a, and sets the
     * answer property of the returned validator instance
     * to true or false respectively.
     */
    is_lesser_than(a) {
        this._question = this.copy().is_number().answer && this.value < a
        return this._set_answer_()
    }
    /**
     * 
     * @param {Number} a a real number that has to
     * be smaller than to the value property
     * of the current validator instance. 
     * @param {Number} b a real number that has to be
     * greater than the value property of the current
     * validator instance.
     * @returns {validator}
     * @description a method that checks if the validator
     * value property is in the open interval range (a, b)
     * and sets the answer property of the returned validator
     * instance to true or false respectively. 
     */
    is_in_range(a, b) {
        this._question = this.copy()
            .is_number()
            .and()
            .is_bigger_than(a)
            .and()
            .is_lesser_than(b).answer
        return this._set_answer_()
    }
    /**
     * 
     * @param {Number} a a real number that has to
     * be smaller than or equal to the current value
     * property of the validator instance.  
     * @param {Number} b a real number that has to be
     * greater or equal to the current value property
     * of the validator instance.
     * @description  a method that checks if the value of 
     * the current value property is in the closed range 
     * of the real numbers , say [a, b] and sets the answer property
     * of the validator instance to true or false respectively.
     */
    is_in_closed_range(a, b) {
        this._question = this.copy()
        .is_equal_or_lesser_than(b).and()
        .is_equal_or_bigger_than(a).answer 
        return this._set_answer_()
    }
    /**
     * 
     * @param {Number} a a real number that
     * has to be smaller or equal to the value
     * property of the current validator instance
     * @returns {validator}
     * @description a method that checks if the value
     * property of the current validator instance is
     * greater or equals to a real number , say a and
     * sets the answer property of the returned validator
     * instance to true or false respectively. 
     */
    is_equal_or_bigger_than(a) {
        this._question = this.copy()
        .is_same(a).or().is_bigger_than(a).answer
        return this._set_answer_()
    }
    /**
     * 
     * @param {Number} a a real number that has
     * to be greater or equal to the current value
     * property of the validator instance.
     * @returns {validator}
     * @description a method that checks if the value
     * property of the current validator instance is 
     * lesser or equal to a real number say a and sets
     * the answer property of the returned validator 
     * instance to true or false respectively.
     */
    is_equal_or_lesser_than (a) {
        this._question = this.copy()
        .is_same(a).or().is_lesser_than(a).answer
        return this._set_answer_()
    }
    /**
     * @method is_array()
     * @returns {validator}
     * @description a method that checks if
     * the value of the current validator instance
     * is of array type and sets the answer property
     * of the returned validator instance to true or
     * false respectively.
     */
    is_array() {
        this._question = this.value instanceof Array
        return this._set_answer_()
    }
    /**
     * @method is_string_array()
     * @returns {validator}
     * @description a method that checks if the
     * value property of the current validator
     * instance is an array, all elements of which
     * are strings and set the answer property of the
     * returned validator instance to true or false
     * respectively.
     */
    is_string_array() {
        let step = 'Is array'
        while (step) {
            switch (step) {
                case 'Is array':
                    if (this.copy().is_array().answer) {
                        step = 'Is every element string'
                    } else {
                        step = 'It is not string array'
                        this.description = `The type of the
                        value parameter of the validator object
                        is of type ${typeof this.value} and is not array.`
                    }
                    break
                case 'It is not string array':
                    this._question = false
                    step = 'stop'
                    break
                case 'Is every element string':
                    if (this.value.some(element => {
                        return typeof element !== 'string'
                    })) {
                        step = 'It is not string array'
                        this.description = `Some of the elements
                        of the array are (is) not string types and so
                        this array is not string type.`
                    } else {
                        this._question = true
                        step = 'stop'
                    }
                    break
                case 'stop':
                    step = 0
                    break
            }
        }
        return this._set_answer_()
    }
    /**
     * @method is_number_array()
     * @returns {validator}
     * @description a method that checks if
     * the value property of the current
     * validator instance is an array, all 
     * elements of which are arbitrary numbers
     * and sets the answer property of the returned
     * validator instance to true or false respectively.
     */
    is_number_array() {
        let step = 'Is array'
        while (step) {
            switch (step) {
                case 'Is array':
                    if (this.copy().is_array().answer) {
                        step = 'Is every element number'
                    } else {
                        step = 'It is not number array'
                        this.description = `The type of the
                        value parameter of the validator object
                        is of type ${typeof this.value} and is not array.`
                    }
                    break
                case 'It is not number array':
                    this._question = false
                    step = 'stop'
                    break
                case 'Is every element number':
                    if (this.value.some(element => {
                        return typeof element !== 'number'
                    })) {
                        step = 'It is not number array'
                        this.description = `Some of the elements
                        of the array are (is) not number types and so
                        this array is not string type.`
                    } else {
                        this._question = true
                        step = 'stop'
                    }
                    break
                case 'stop':
                    step = 0
                    break
            }
        }
        return this._set_answer_()
    }
    /**
     * @param {Object | String} options
     * an object parameter
     * with condition key property with
     * string value that is a legal validator
     * expression method or a string that is
     * a legal validator method expression.
     * @example
     * let a =new validator([12, 'a', 9, 'b', 6, 'c'])
     * .is_array_with_elements_that_satisfy({
     * conditions : 'is_number().or().is_string()'
     * })
     * // output:
     * console.log(a.answer) // --> true
     * @description a method that checks if every element
     * of its content satisfy a condition and sets the
     * answer property to true or false respectively.
     * @deprecated 
     */
    is_array_with_elements_that_satisfy(options) {
        let i, k, temp_methods, temp_validator,
            methods = Object.getOwnPropertyNames(validator.prototype),
            conditions, tmpv, areLegalMethods, step = 'Initialization'

        while (step) {
            switch (step) {
                case 'Initialization':
                    if (this.copy().not().is_array().answer) {
                        this.description = `In the validator method ` +
                            `"is_array_with_elements_that_satisfy" the value` +
                            `property is not of array type.Error value type.`
                        step = 'Error or false result'
                    }
                    if (new validator(options).is_string().answer) {
                        options = { conditions: options }
                        step = 'Preparation'
                    } else if (new validator(options)
                        .interface({
                            conditions: 'is_string().is_required()'
                        }).answer) {
                        step = "Preparation"
                    } else {
                        this.description = `In the validator method ` +
                            `"is_array_with_elements_that_satisfy" the argument options ` +
                            `is not of object type with conditions key parameter.Error incorrect parameter.`
                        step = 'Error or false result'
                    }
                    break
                case "Preparation":
                    conditions = options.conditions
                    temp_methods = conditions.split('.')
                    step = 'Is validator-type expressions'
                    break
                case 'Is validator-type expressions':
                    for (i = 0; i < temp_methods.length; i++) {
                        for (k = 0; k < methods.length; k++) {
                            tmpv = temp_methods[i].split(methods[k])
                            if (tmpv.length === 1) areLegalMethods = false
                            else if (tmpv[0] === ""
                                && tmpv[1][0] === '('
                                && tmpv[1][tmpv[1].length - 1] === ')') {
                                areLegalMethods = true
                                temp_methods[i] = {
                                    method: methods[k],
                                    argument: eval(tmpv[1].substring(0, tmpv[1][tmpv[1].length - 1]))
                                }
                                break
                            } else areLegalMethods = false
                        }
                        if (!areLegalMethods) break
                    }
                    if (!areLegalMethods) {
                        this.description = `In the validator method ` +
                            `"is_array_with_elements_that_satisfy" the ` +
                            `method ${conditions.split('.')[i]} is illegal ` +
                            `validator expression method.Error invalid validator method.`
                        step = 'Error or false result'
                    } else {
                        i = 0
                        step = 'Validate array data'
                    }
                    break
                case 'Validate array data':
                    if (i === this.value.length) step = 'Return true and success result'
                    else {
                        temp_validator = new validator(this.value[i])
                        temp_methods.forEach(temp_method => {
                            let method = temp_method.method,
                                argument = temp_method.argument
                            temp_validator = temp_validator[method](argument)
                        })
                        if (temp_validator.answer) ++i
                        else {
                            this.description = `In the validator method ` +
                                `"is_array_with_elements_that_satisfy" the element ${i} of the ` +
                                `value array, i.e. ${this.value[i]} do not satisfy the required conditions.` +
                                `Successful executed method.`
                            step = 'Error or false result'
                        }
                    }
                    break
                case 'Error or false result':
                    this._question = false
                    step = 0
                    break
                case 'Return true and success result':
                    this._question = true
                    step = 0
                    break
            }
        }
        return this._set_answer_()
    }
    /**
     * @method is_object()
     * @returns {validator}
     * @description a method that checks if the
     * value property of the current validator
     * instance is an object and sets the answer
     * property of the returned validator instance to
     * true or false respectively.
     */
    is_object() {
        this._question = Object.prototype.toString.call(this.value) === '[object Object]'
        return this._set_answer_()
    }
    /**
     * @method is_empty()
     * @returns {validator}
     * @description this method checks if the value
     * property of the current validator instance is
     * an empty object or an empty array or a empty
     * string or is an undefined type.
     */
    is_empty() {
        this.copy().is_undefined()
            .on(true, () => {
                this._question = true
            })
            .on(false, () => {
                if (this.copy().is_array().answer) {
                    this._question = this.value.length === 0
                } else if (this.copy().is_object().answer) {
                    this._question = Object.keys(this.value).length === 0
                } else if (this.copy().is_string().answer) {
                    this._question = this.value === ''
                } else throw new Error('This method can be used only for string, array and object types.')
            })
        return this._set_answer_()
    }
    /**
     * 
     * @param {function} callback
     * @description This method can
     * be active if and only if the
     * this.value is of type array
     * or object. The callback is a
     * function with argument that is
     * of validator type (instance).
     * @example
     * let a = new validator([12, 32, 998.3, 89, 0.9839])
     *     .for_all(elements => {
     *         return elements.is_float()
     *     })
     * console.log(a.answer) // true
     */
    for_all(callback) {
        // initialization
        const val = this.copy()
        const callback_val = new validator(callback)
        let i, keys, item
        // check if the parameters are correct
        callback_val.is_function()
            .on(false, () => {
                throw new Error('The callback argument of the for_all method of the euriklis validator module has to be funuction type.')
            })
            .on(true, () => {
                val.is_array()
                    .on(true, () => {
                        // the parameters are correct
                        // and we have to check every 
                        // element (key value) of the 
                        // array (object). Case array:
                        for (i = 0; i < val.value.length; i++) {
                            item = new validator(val.value[i])
                            if (callback(item).answer) {
                                this._question = true
                            }
                            else {
                                this._question = false
                                break
                            }
                        }
                    })
                    .on(false, () => {
                        // Here we will examine the
                        // case in which the this.value 
                        // is object type...
                        val.is_object().and()
                            .not().is_empty()
                            .on(true, () => {
                                // get the keys of the
                                // this.value and check 
                                // every value...
                                keys = Object.keys(val.value)
                                for (i = 0; i < keys.length; i++) {
                                    item = new validator(val.value[keys[i]])
                                    if (callback(item).answer) this.answer = true
                                    else {
                                        this._question = false
                                        break
                                    }
                                }
                            })
                            .on(false, () => {
                                this._question = false
                            })
                    })
            })
        return this._set_answer_()
    }
    /**
     * 
     * @param {function} callback
     * @description this method is
     * valid for array and object
     * and compute if some item of the
     * this.value satisfy the condition
     * defined in the callback function.
     * The callback function gets as
     * argument an validator type and
     * have to return a validator value.
     * @returns {validator}
     * @example
     * let a = new validator([1, 2, ,3, 4, 5])
     *     .for_any((element) => {
     *         return element.is_undefined()
     *     })
     * console.log(a.answer) // true
     */
    for_any(callback) {
        // Initializations:
        const val = this
        const callback_val = new validator(callback)
        let i, keys, item
        // Check if callback is correct:
        callback_val.is_function()
            .on(true, () => {
                // Check if the this.value is
                // array type and is not empty:
                val.copy().is_array().and()
                    .not().is_empty()
                    .on(true, () => {
                        // this.value is array case...
                        for (i = 0; i < val.value.length; i++) {
                            item = new validator(val.value[i])
                            if (callback(item).answer) {
                                this._question = true
                                break
                            } else {
                                this._question = false
                                continue
                            }
                        }
                    })
                    .on(false, () => {
                        // Check if this.value is 
                        // an object non empty instance
                        val.copy().is_object().and()
                            .not().is_empty()
                            .on(true, () => {
                                // this.value is non empty object
                                keys = Object.keys(val.value)
                                for (i = 0; i < keys[i].length; i++) {
                                    item = new validator(val.value[keys[i]])
                                    if (callback(item).answer) {
                                        this._question = true
                                        break
                                    } else {
                                        this._question = false
                                        continue
                                    }
                                }
                            })
                            .on(false, () => {
                                throw new Error(`Illegal type of the this.value in the "for_any" method of euriklis validator module. The value has to be array or object type. The value of the current validator is ${typeof this.value} type.`)
                            })
                    })
            })
            .on(false, () => {
                throw new Error('The callback argument of the for_any method of the euriklis validator module has to be a function with argument a validator instance.')
            })
        return this._set_answer_()
    }
    /**
     * 
     * @param {Number} n an integer number that
     * describes the length of the array/string/Object
     * @returns {validator}
     * @description a method that checks if the
     * value property of the current validator instance
     * is String or Array or Object javascript type that
     * has length n and sets the answer property of the
     * returned validator instance to true or false respectively.
     */
    has_length(n) {
        if (Number.isInteger(n)) n = Number(n)
        else throw new Error('The argument of the has length method is not integer.')
        let cp_instance = this.copy()
        if (cp_instance.is_array().or().is_string().answer) {
            this._question = this.value.length === n
        } else this._question = false
        return this._set_answer_()
    }
    /**
     * 
     * @param {string | object} options
     * @description this method checks if
     * a given string contains an expression
     * k times, where the k is an integer.
     * If the options is string, the k is 
     * assumed to be equals to 1, otherwise
     * if options is an object, then it has
     * to contains the properties "expression"
     * and "count". If "count" do not exists
     * then is assumed to be equals to 1 (k = 1). 
     */
    is_this_string_contains_expression_k_times(options) {
        // initializations:
        let k
        // check if the validator value
        // is string
        if (this.not().is_string().answer) {
            this._question = false
        } else {
            const opt_validator = new validator(options)
            // check if options
            // is correctly inserted.
            opt_validator
                .not().is_string()
                .and()
                .not().is_object()
                .on(true, () => {
                    throw new Error('The argument of the "is_this_string_contains_expression_k_times" method has to be string or object type.')
                })
                .on(false, () => {
                    // if options is string
                    // then assume k or the
                    // count to be equals to 1.
                    opt_validator.copy()
                        .is_string()
                        .on(true, () => {
                            k = 1
                            // get the length of 
                            // the options (string)
                            let ol = opt_validator.value.length
                            // search into the string
                            let s = String(this.value), count = 0
                            for (let i = 0; i < s.length - ol + 1; i++) {
                                if (s.substring(i).startsWith(options)) {
                                    ++count
                                    if (k === count) {
                                        this._question = true
                                        break
                                    } else this._question = false
                                }
                            }
                        })
                    opt_validator.copy()
                        .is_object()
                        .on(true, () => {
                            // check if options.expression
                            // is a legal string. If no throw Error
                            new validator(options.expression)
                                .not().is_undefined().and()
                                .is_string()
                                .on(true, () => {
                                    // if options.count do not
                                    // exists then assume k = 1
                                    if (typeof options.count !== 'number') k = 1
                                    else k = options.count | 0
                                    // search in the string
                                    let c = 0
                                    let s = String(this.value)
                                    let ol = options.expression.length
                                    let expression = options.expression
                                    for (let i = 0; i < s.length - ol + 1; i++) {
                                        if (s.substring(i).startsWith(expression)) {
                                            ++c
                                            if (k === c) {
                                                this._question = true
                                                break
                                            } else this._question = false
                                        }
                                    }
                                })
                                .on(false, () => {
                                    throw new Error('The expression property of the argument in the "is_this_string_contains_expression_k_times" method is incorrectly defined.')
                                })
                        })
                })
        }
        return this._set_answer_()
    }
    /**
     * @method is_function()
     * @returns {validator}
     * @description a method that checks if
     * the value property of the current validator
     * instance is a javascript function object and
     * sets the answer property of the returned validator
     * instance to true or false respectively.
     */
    is_function() {
        this._question = this.value instanceof Function || typeof this.value === 'function'
        return this._set_answer_()
    }
    /**
     * 
     * @param {Array | String} elements an array
     * or string element has to be compared with
     * the value property of the current validator
     * instance.
     * @returns {validator}
     * @description a method that checks if the value
     * property of the current validator instance is array
     * that contains all the items of the elements when the
     * elements is of array type or if in this array (the value property)
     * exists item that is equals to the elements, when the elements
     * argument is string and sets the answer property of the returned
     * validator instance to true or false respectively. 
     */
    contains(elements) {
        this._question = this.copy().is_array().answer
        let eltype = new validator(elements)
            .is_array()
            .or()
            .is_string().answer
        if (this._question && eltype) {
            // the value has to contain
            // all elements of the element.
            if (elements instanceof Array) {
                if (this.value.every(val => {
                    return elements.some(element => {
                        return element === val
                    })
                })) this._question = true
                else this._question = false
            } else this._question = this.value.some(val => {
                return val === elements
            })
        } else this._question = false
        return this._set_answer_()
    }
    /**
     * @method is_same(param)
     * @param {String | Number | Array | Object | boolean} param
     * @returns {validator}
     * @description This method checks if the 
     * current value of the validator constructor
     * is equal to the param argument of the method.  
     */
    is_same(param) {
        let param_type = new validator(param)
        this._question = false
        if (param_type.is_string().or().is_number().answer) {
            this._question = this.value === param
        }
        if (param_type.copy()
            .is_array()
            .or().is_object()
            .answer) {
            this._question = JSON.stringify(this.value) === JSON.stringify(param)
        }
        if (param_type.copy().is_function().answer) {
            this._question = this.value.toString() === param.toString()
        }
        if (this.copy().is_undefined().answer && param_type.copy().is_undefined().answer) {
            this._question = true
        }
        if (this.copy().is_boolean().answer && param_type.copy().is_boolean().answer) {
            this._question = this.value === param_type.value
        }
        if (param_type.value === null) {
            this._question = param_type.value === this.value
        }
        return this._set_answer_()
    }
    /**
     * 
     * @param {Array} arr_param an array
     * with arbitrary elements.
     * @returns {validator}
     * @description This method checks if
     * the current validator value in the constructor
     * is identical to one and only one of the elements
     * of the argument of the method (that is an array
     * with arbitrary type elements). Note that the method
     * checking procedure continues until the first equal
     * element is found and then stops, so if the array
     * contains more than one times the given parameter
     * this could not be verified with this method. 
     */
    is_same_with_any(arr_param) {
        let q, n, i = 0, ans
        new validator(arr_param).is_array()
            .on(false, () => {
                q = false
            }).on(true, () => {
                n = arr_param.length
                while (1) {
                    if (i === n) break
                    else {
                        q = this.copy().is_same(arr_param[i]).answer
                        if (q) break
                        else i += 1
                    }
                }
            })
        ans = this.copy()
        ans._question = q
        ans._set_answer_()
        return ans
    }
    /**
     * 
     * @method bind(otherValidator)
     * @param {validator} otherValidator
     * an validator expression
     * @description this is a crucial method in the
     * validator library. The method gets in the arguments a
     * valid validator expression and estimates/checks if the
     * two validator instances are true (the first one is the
     * current validator instance and the second is the validator
     * expression in the bind method). The method sets the answer property
     * of the returned validator instance to true or false respectively.
     * @example
     * let a = new validator(7.9889).is_float()
     *     .and().bind(
     *         new validator('Alias').is_string().and().not().is_empty() 
     *     )
     * console.log(a.answer) // true
     */
    bind(otherValidator) {
        if (!(otherValidator instanceof validator)) {
            throw new Error('The argument has to be validator type.')
        }
        this._question = otherValidator.answer
        return this._set_answer_()
    }

    /**
     * 
     * @method interface(params)
     * @param {{}} params an object
     * with keys and values stringified
     * valid validator-like expressions
     * @description an object that
     * contains the key parameters
     * of the this.value object and
     * string-like valid expressions
     * of the validator methods to
     * tests or validate the validator
     * object
     * @returns {validator}
     * @example
     * let a = new validator({
     *         "name" : "Stephan",
     *         "age" : "23",
     *         "courses" : ['Mathematics', 'Economics', 'Econometrics']
     *     }).interface({
     *         "name" : "is_string()",
     *         "age" : "is_integer()",
     *         "courses" : "is_string_array()"
     *     })
     * console.log(a.answer) // true
     * @deprecated
     */
    interface(params) {
        let i, j, k, methods, keys,
            types, temp_key, temp_methods,
            areLegalMethods, tmpv,
            temp_validator, step = 1
        while (step) {
            switch (step) {
                case 1:
                    if (this.copy().is_object().answer) {
                        step = 3
                    } else {
                        step = 2
                        this.description = `In the validator method ` +
                            `"interface" the value parameter is not object type.` +
                            `Note that this method runs only when the this.value parameter ` +
                            `is of Object type.Error value parameter.`
                    }
                    break
                case 2:
                    this._question = false
                    step = 0
                    break
                case 3:
                    temp_validator = new validator(params).is_object()
                    if (temp_validator.answer) {
                        step = 4
                    } else {
                        this.description = `In the validator method interface ` +
                            `the required parameter "params" is not of Object type.` +
                            `Note that for the correct functionality of this method the ` +
                            `parameter "params" has to be an Object type with keys the ` +
                            `key properties of the this.value object, i.e ${Object.keys(this.value)}.` +
                            `Error params parameter.`
                        step = 2
                    }
                    break
                case 4:
                    let val_len = Object.keys(this.value).length,
                        param_len = Object.keys(temp_validator.value).length
                    if (val_len > param_len) {
                        this.description = `In the validator method interface ` +
                            `the length of the this.value is bigger than the length of the ` +
                            `controllable parameter "params", i.e the length of the this.value is ` +
                            `${val_len} and the length of the "params" is ${param_len}.Error length of the parameters.`
                        step = 2
                    } else step = 5
                    break
                case 5:
                    keys = Object.keys(params)
                    methods = Object.getOwnPropertyNames(validator.prototype)
                    types = Object.values(params)
                    areLegalMethods = true, i = 0
                    step = 6
                    break
                case 6:
                    if (new validator(types).is_string_array().answer) {
                        step = 7
                    } else {
                        this.description = `In the validator method interface ` +
                            `the values of the "params" object parameter have to be ` +
                            `only of string type.Error "params" values type.`
                        step = 2
                    }
                    break
                case 7:
                    if (i === keys.length) step = 11
                    else {
                        temp_key = keys[i]
                        temp_methods = params[temp_key]
                        // split the temp methods and
                        // transform it from string to
                        // array type...
                        temp_methods = temp_methods.split(".")
                        for (j = 0; j < temp_methods.length; j++) {
                            for (k = 0; k < methods.length; k++) {
                                tmpv = temp_methods[j].split(methods[k])
                                if (tmpv.length === 1) areLegalMethods = false
                                else if (tmpv[0] === ""
                                    && tmpv[1][0] === "("
                                    && tmpv[1][tmpv[1].length - 1] === ")") {
                                    areLegalMethods = true
                                    temp_methods[j] = {
                                        method: methods[k],
                                        argument: eval(tmpv[1].substring(1, tmpv[1].length - 1))
                                    }
                                    break
                                } else areLegalMethods = false
                            }
                            if (!areLegalMethods) break
                        }
                        if (!areLegalMethods) {
                            this.description = `In the validator method interface ` +
                                `the value of the key ${temp_key} contains invalid method code, i.e. ` +
                                `the value is ${temp_methods.join(".")}.Error invalid methods in "params" argument.`
                            step = 2
                        } else step = 8
                    }
                    break
                case 8:
                    if (typeof this.value[temp_key] === 'undefined') {
                        step = 9
                    } else step = 10
                    break
                case 9:
                    if (temp_methods.findIndex(element => {
                        return element.method === "is_required"
                    }) !== -1) {
                        this.description = `In the validator method interface ` +
                            `the property of the this.value object ${temp_key} is required.Error required key in the value parameter.`
                        step = 2
                    } else {
                        ++i
                        step = 7
                    }
                    break
                case 10:
                    temp_validator = new validator(this.value[temp_key])
                    temp_methods.forEach(method_obj => {
                        temp_validator = temp_validator[method_obj.method](method_obj.argument)
                    })
                    if (temp_validator.answer) {
                        ++i
                        step = 7
                    } else {
                        this.description = `In the validator method interface ` +
                            `the this.value property ${temp_key} has wrong type.Successful execution.`
                        step = 2
                    }
                    break
                case 11:
                    this._question = true
                    step = 0
                    break
            }
        }
        return this._set_answer_()
    }
    /**
     * 
     * @param {boolean} state - true or false
     * @param {function | arrow function} callback
     * the function that will be run when the condition of the
     * answer property has value equals to state.
     * @returns {validator}
     * @description This method is very significant for the
     * library. It execute a function recorded in the input
     * argument callback when the answer property is in state. 
     */
    on(state, callback) {
        let incorrectState = new validator(state)
            .not()
            .is_boolean()
            .and().not()
            .is_same('true')
            .and().not()
            .is_same('false')
            .answer
        let incorrectFunction = new validator(callback)
            .not().is_function()
            .answer
        if (!incorrectState && !incorrectFunction) {
            if (state === this.answer) {
                callback()
            }
        } else if (incorrectFunction) {
            console.warn('Incorrect function argument in on method of the validatgor mudule.')
        } else if (incorrectState) {
            console.warn('Incorrect state argument of the on method in the validator madule.')
        }
        return this
    }
    /**
     * @method is_date()
     * @returns {validator}
     * @description a method that checks if the value
     * property of the current validator instance is
     * valid date or not and sets the answer property of
     * the returned validator instance to true or false
     * respectively. 
     */
    is_date() {
        let cp = this.copy()
        if (cp.value instanceof Date || cp.value.toString() === '[object Date]') {
            cp._question = true
        } else cp._question = false
        return cp._set_answer_()
    }
}
module.exports = validator