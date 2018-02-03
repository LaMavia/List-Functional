"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Monads_1 = require("./Monads");
const Toolbelt_1 = require("./Toolbelt");
const ramda_1 = require("ramda");
/**
 * Array on functional steroids
 * @author Tomasz Surowiec
 */
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
        this.iniLength = length;
        this.arr = this.withFilters(Monads_1.Maybe([], filler, new Array(length).fill(0)));
        this.withFilters = this.withFilters.bind(this);
    }
    /**Set new value of the List */
    set val(newVal) {
        this.arr = this.withFilters(Monads_1.Maybe(this.arr, Toolbelt_1.keeper, newVal));
    }
    /**Value of the List */
    get val() {
        return this.arr;
    }
    /**Length of List's array */
    get length() {
        return this.arr.length;
    }
    get first() {
        return this.arr[0];
    }
    get last() {
        return this.arr[this.length];
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
    fpush(...elemsToAdd) {
        this.arr.push(...elemsToAdd);
        return this.withFilters(this.arr);
    }
    /**/ funshift(...elemsToAdd) {
        /**/ this.arr.unshift(...elemsToAdd);
        /**/ return this.withFilters(this.arr);
        /**/ 
    }
    reFill(callbackFn = this.filler) {
        return this.withFilters(callbackFn(new Array(this.iniLength).fill(0)));
    }
    shuffle() {
        const rand = (a, b) => (a * Math.random() * 4 - 4) - (b * Math.random() * 4 - 4);
        const copy = this.arr.slice().sort(rand);
        return copy.toString() === this.toString()
            ? this.shuffle()
            : copy;
    }
    dropWhile(condition) {
        const arr = this.arr.slice();
        let temp = arr.slice();
        for (let i = 0; condition(arr[i], i); i++) {
            temp.shift();
        }
        return temp;
    }
    span(condition) {
        const arr = ramda_1.flatten(this.arr.slice());
        const output = [];
        output.push(arr.reduceRight((out, el, i) => {
            if (condition(el, i)) {
                arr.splice(i, 1);
                return out = [el, ...out];
            }
            else {
                return out;
            }
        }, []), arr);
        return output;
    }
    flatten(arr = this.arr.slice()) {
        return arr
            .toString()
            .split(",")
            .map((el) => Number(el) ? Number(el) : el // Before that every element is a string
        );
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
        const sortFn = (a, b) => a - b;
        if (typeof a.arr[0] !== "object" && typeof b.arr[0] !== "object") {
            return a.sort(sortFn).toString() === b.sort(sortFn).toString();
        }
        else if (typeof a.arr[0] === "object" && typeof b.arr[0] === "object") {
            const valsA = a.arr.reduce((output, el) => output.concat(ramda_1.values(el)), []);
            const valsB = b.arr.reduce((output, el) => output.concat(ramda_1.values(el)), []);
            return valsA.sort(sortFn).toString() === valsB.sort(sortFn).toString();
        }
    }
    static dropWhile(condition, array) {
        const arr = array.slice();
        for (let i = 0; condition(array[i], i); i++) {
            arr.shift();
        }
        return arr;
    }
    static span(condition, array) {
        const arr = ramda_1.flatten(array.slice());
        const output = [];
        output.push(arr.reduceRight((out, el, i) => {
            if (condition(el, i)) {
                arr.splice(i, 1);
                return out = [el, ...out];
            }
            else {
                return out;
            }
        }, []), arr // Pushing whatever else
        );
        return output;
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
    shift() {
        return this.arr.shift();
    }
    unshift(elToAdd) {
        return this.arr.unshift(elToAdd);
    }
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
    sort(callbackfn = (a, b) => a - b) {
        return this.arr
            .slice()
            .sort(callbackfn);
    }
}
exports.List = List;
const Main = () => {
    const odList = new List(Toolbelt_1.enumerate, [Toolbelt_1.even, Toolbelt_1.smallerThanTen, Toolbelt_1.notZero]);
    console.log(odList.span(Toolbelt_1.smallerThan(6)));
};
Main();
