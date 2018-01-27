"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Monads_1 = require("./Monads");
const Toolbelt_1 = require("./Toolbelt");
class List {
    constructor(filler, filters = [], length = 100) {
        this.hasInnerArr = (arr = this.arr) => {
            for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    return true;
                }
            }
            return false;
        };
        // super()
        this.filler = filler;
        this.filters = filters;
        this.arr = this.withFilters(Monads_1.Maybe([], filler, new Array(length).fill(0)));
        this.withFilters = this.withFilters.bind(this);
    }
    set val(newVal) {
        this.arr = this.withFilters(Monads_1.Maybe(this.arr, Toolbelt_1.keeper, newVal));
    }
    get val() {
        return this.arr;
    }
    get length() {
        return this.arr.length;
    }
    withFilters(_val) {
        let copy = _val.slice();
        this.filters.forEach((filter) => {
            copy = copy.filter((el, i, arr) => {
                if (Array.isArray(el)) {
                    el = this.withFilters(el); // preparing for check
                    return Boolean(el.length); // removing empty arrays
                }
                else {
                    return filter.call(this, el, i, arr);
                }
            });
        }, this);
        return copy;
    }
    // SPECIAL
    fmap(mapper, arr = this.arr) {
        const copy = arr.slice();
        const mappedCopy = copy.map((el) => Array.isArray(el)
            ? this.fmap(mapper, el)
            : mapper(el));
        return this.withFilters(mappedCopy);
    }
    fconcat(arrayToConcat) {
        return this.withFilters(this.arr.concat(arrayToConcat));
    }
    fpush(elToAdd) {
        this.arr.push(elToAdd);
        return this.withFilters(this.arr);
    }
    reFill(callbackFn = this.filler) {
        return this.withFilters(callbackFn(new Array(100).fill(1)));
    }
    shuffle() {
        const rand = (a, b) => (a * Math.random() * 4 - 4) - (b * Math.random() * 4 - 4);
        const copy = this.arr.slice().sort(rand);
        return copy.toString() === this.toString()
            ? this.shuffle()
            : copy;
    }
    flatten(arr = this.arr.slice()) {
        return arr
            .toString()
            .split(",")
            .map((el) => Number(el) ? Number(el) : el);
    }
    // STATIC
    static fromOther(Lists) {
        const isntIn = (elToCheck, arr) => {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === elToCheck)
                    return false;
            }
            return true;
        };
        const _val = Lists
            .reduce((res, el) => res.concat(el.val), [])
            .reduce((res, el) => // removes duplicates 
         res.concat(isntIn(el, res) ? [el] : []), [])
            .sort((a, b) => a - b);
        const _filters = Lists.reduce((_fl, _list) => _fl.concat(_list.filters), []);
        const NL = new List(Toolbelt_1.keeper, _filters);
        NL.arr = _val;
        return NL;
    }
    static compare(a, b) {
        return a.sort().toString() === b.sort().toString();
    }
    // Functions from Array
    map(mapper) {
        return this.arr.map(mapper);
    }
    concat(arrayToConcat) {
        return this.arr.concat(arrayToConcat);
    }
    push(elToPush) {
        return this.arr.push(elToPush);
    }
    pop() {
        return this.arr.pop();
    }
    // ----
    shift() {
        return this.arr.slice().shift();
    }
    unshift(elToAdd) {
        return this.arr.slice().unshift(elToAdd);
    }
    // ----
    reduce(callbackfn, initialValue) {
        return this.arr.reduce(callbackfn, initialValue);
    }
    filter(filterFn) {
        return this.arr.filter(filterFn);
    }
    forEach(callbackfn) {
        return this.arr.forEach(callbackfn);
    }
    join(separator) {
        return this.arr.join(separator);
    }
    reverse() {
        return this.arr.slice().reverse();
    }
    copyWithin(target, start = 0, end = this.length) {
        return this.arr.slice().copyWithin(target, start, end);
    }
    toString() {
        return this.arr.toString();
    }
    sort() {
        return this.arr
            .slice()
            .sort((a, b) => a - b);
    }
}
exports.List = List;
const Main = () => {
    // const thdList = new List<number>(enumerate, [notZero, smallerThan(20)])
    // thdList.val = [2, 4, [6, 8, [10, 12], 14]]
    // const strList = new List<string>(randChar, [fewerThan(5)])
    // strList.val = ['a', ['b', ['c']]]
    const strList = new List(Toolbelt_1.randChar, [Toolbelt_1.fewerThan(5)]);
    strList.val = ['a', ['b', ['c']]];
    const _tempL = new List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.smallerThan(4)]);
    _tempL.val = [1, 3];
    const tF = (arr) => (el) => el *= 4;
    _tempL.reFill();
    console.log(_tempL.val);
    // const NL = new List<number>(enumerate, [notZero, smallerThan(20)])
    // new List(enumerate, [even, smallerThanTen])
    // NL.filterMap(double)
    // console.log(NL.filterMap(double))
    // console.log(NL.map(double))
    // console.log(NL.concat([1,2,3]))
    // console.log(NL.val)  
};
Main();
