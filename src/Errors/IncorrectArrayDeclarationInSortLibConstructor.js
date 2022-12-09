'use strict'
import * as  texts from './errorTexts.js';
export default () => {
    const error = new Error();
    error.name = texts.ErrorText;
    error.message = texts.IncorrectArrayDeclarationInSortLibConstructor
    throw error;
};