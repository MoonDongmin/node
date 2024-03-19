import {odd, even} from "./var.mjs";
import {checkOddOrEven} from "./func.mjs";


function checkNumber(str) {
    if (str.length % 2) {
        return odd;
    }
    return even;
}

console.log(checkOddOrEven(10));
console.log(checkNumber('hello'));