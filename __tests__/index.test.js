"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
test('toSingle', () => {
    expect(index_1.toSingle([[1, [2]], [[3, [4]]], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(index_1.toSingle([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});
test('isFinal', () => {
    expect(index_1.isFinal([1, 2, [3, 4]])).toBe(false);
});
