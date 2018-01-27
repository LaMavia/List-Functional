"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maybe = (baseVal, foo, justValue) => {
    const res = foo(justValue);
    return res ? res : (res === 0 ? res : baseVal);
};
const double = (num) => {
    return num * 2;
};
const Main = () => {
    console.log(exports.Maybe(2, double, 4));
};
// Main() 
