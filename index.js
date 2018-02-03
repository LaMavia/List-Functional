"use strict";
// import { Maybe } from './Monads'
const isFinal = (arr) => {
    return Array.isArray(arr) ? arr.reduce((res, it) => Boolean(!it.push), false) : true;
};
const toSingle = (arr) => {
    arr = Array.isArray(arr)
        ? arr
            .reduce((res, arIt) => arIt.push ? res.concat(toSingle(arIt)) : res.concat(arIt), [])
        : arr;
    return isFinal(arr) ? arr : toSingle(arr);
};
const powFact = (n) => {
    return n < 0
        ? Math.pow(0, 0)
        : Math.pow(n, n);
};
const main = () => {
    // isFinal([1,2,[3,4]])
    // console.log(toSingle([[1, [2]], [3, 4], [5, 6]]))
    const output = new Int8Array(1);
    for (let i = 1; i > 0; i -= Math.pow(10, -20)) {
        output[output.length] = Math.pow(i, i);
    }
    console.dir(output[output.length - 1], { colors: true });
};
main();
