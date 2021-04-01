'use strict'
const InfoText = 'Euriklis SortLib information message:\n'
const AutomaticallySetToDefault = (parameters) => {
    let keys = Object.keys(parameters), i
    let values = Object.values(parameters), output
    if (keys.length > 1) {
        output =`The properties of the SortLib instance was automatically set to the default options. Especially:\n`
        for (i = 0;i < keys.length;i++) output += `${i + 1}. The property ${keys[i]} is set to the ${values[i]}.\n`
    } else {
        output = `The property ${keys[0]} of the current SortLib instance was automatically set to the default value ${values[0]}`
    }
    return output
}

module.exports = {
    InfoText,
    AutomaticallySetToDefault,
    
}