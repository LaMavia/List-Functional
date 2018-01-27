"use strict";
// import { Maybe } from './Monads'
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFinal = (arr) => {
    return Array.isArray(arr) ? arr.reduce((res, it) => Boolean(!it.push), false) : true;
};
exports.toSingle = (arr) => {
    arr = Array.isArray(arr)
        ? arr
            .reduce((res, arIt) => arIt.push ? res.concat(exports.toSingle(arIt)) : res.concat(arIt), [])
        : arr;
    return exports.isFinal(arr) ? arr : exports.toSingle(arr);
};
const main = () => {
    // isFinal([1,2,[3,4]])
    console.log(exports.toSingle([[1, [2]], [3, 4], [5, 6]]));
};
main();
