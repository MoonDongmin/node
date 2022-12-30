const { odd, even} = require('./var');

function checkOddOrEeven(num){
    if(num%2){
        return odd;
    }
    return even;
}

module.exports = checkOddOrEeven;