"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Monads_1 = require("../Monads");
const double = (num) => num * 2;
test('Maybe', () => {
    const m = Monads_1.Maybe(2, double, 'rus');
    expect(m).toBe(2);
});
