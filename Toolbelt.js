"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Filters
exports.even = (num) => num % 2 === 0;
exports.odd = (num) => Boolean(num % 2);
exports.smallerThanTen = (num) => num < 10;
exports.smallerThanTwenty = (num) => num < 20;
exports.smallerThan = (n) => (num) => num < n;
exports.positive = (num) => num > 0;
exports.negative = (num) => num < 0;
exports.notZero = (num) => num !== 0;
exports.fewerThan = (n) => (el, i) => i + 1 < n;
exports.usersOnly = (person) => person.role.toLowerCase() === "user";
// Mappers
exports.double = (el) => el * 2;
exports.randomize = () => Math.floor(Math.random() * 10);
// Fillers
exports.enumerate = (arr) => arr.map((el, i) => i);
exports.negator = (arr) => arr.map((el, i) => -i);
exports.keeper = (array) => array.map((val) => val);
exports.randChar = (arr) => arr.map((el) => String.fromCharCode(Math.floor(Math.random() * (90 - 44) + 44)));
exports.voider = () => { };
// Simple functions
exports.random = (max, min = 0) => Math.floor(Math.random() * (max - min) + min);
