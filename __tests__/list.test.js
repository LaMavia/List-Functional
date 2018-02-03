"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_1 = require("../list");
const Toolbelt_1 = require("../Toolbelt");
const nList = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.even, Toolbelt_1.smallerThanTen, Toolbelt_1.positive]);
const bList = new list_1.List(Toolbelt_1.voider, [Toolbelt_1.even, Toolbelt_1.smallerThanTen, Toolbelt_1.positive]);
const negList = new list_1.List(Toolbelt_1.negator, [Toolbelt_1.even, Toolbelt_1.notZero, (num) => num > -15, Toolbelt_1.negative]);
const twdList = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.smallerThan(20)]);
twdList.val = [2, 4, [6, 8]];
const thdList = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.smallerThan(20)]);
thdList.val = [2, 4, [6, 8, [10, 12], 14]];
const strList = new list_1.List(Toolbelt_1.randChar, [Toolbelt_1.fewerThan(5)]);
strList.val = ['a', ['b', ['c']]];
// const evList = new List<number>(enumerate, [notZero, smallerThanTen, even])
describe("Basic functionality", () => {
    test("Returns Just value", () => {
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
    test("Returns Base Value upon void", () => {
        expect(bList.val).toEqual([]);
    });
    test(".val === .arr", () => {
        expect(bList.arr).toEqual(bList.val);
    });
    test("Works with negatives", () => {
        expect(negList.val).toEqual([-2, -4, -6, -8, -10, -12, -14]);
    });
    test("Applies filters after value change (number)", () => {
        negList.val = [1, 2, 3, 4, 5, 6];
        expect(negList.val).toEqual([]);
    });
    test("Applies filters after value change (string)", () => {
        const sl = new list_1.List(Toolbelt_1.randChar, [Toolbelt_1.fewerThan(5)]);
        console.log(sl.val);
        sl.val = ["abc", "def", "g", "h", "i", "j", "k", "l"];
        expect(sl.val).toEqual(["abc", "def", "g", "h"]);
    });
    test("Applies filters after value change (object)", () => {
        const persList = new list_1.List(Toolbelt_1.voider, [Toolbelt_1.usersOnly, Toolbelt_1.fewerThan(4)]);
        persList.val = [
            {
                name: "John Smith",
                role: "Admin",
                age: 21
            },
            {
                name: "Anna Jessit",
                role: "User",
                age: 26
            },
            {
                name: "Roger Clos",
                role: "User",
                age: 31
            },
            {
                name: "John Smith",
                role: "User",
                age: 51
            },
            {
                name: "Jamie Smith",
                role: "Admin",
                age: 24
            }
        ];
        expect(persList.val).toEqual([
            {
                name: "Anna Jessit",
                role: "User",
                age: 26
            },
            {
                name: "Roger Clos",
                role: "User",
                age: 31
            },
            {
                name: "John Smith",
                role: "User",
                age: 51
            }
        ]);
    });
});
describe("map", () => {
    test(`map doesn't mutate`, () => {
        nList.map(Toolbelt_1.double);
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
});
describe("forEach", () => {
    test("forEach recives values", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.smallerThan(4), Toolbelt_1.notZero]);
        const output = [];
        _tempL.forEach((el) => { output.push(el); });
        expect(output).toEqual([1, 2, 3]);
    });
});
describe("reverse", () => {
    test("reverse revers the List", () => {
        expect(nList.reverse()).toEqual([8, 6, 4, 2]);
    });
    test(`reverse doesn't mutate`, () => {
        nList.reverse();
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
});
describe("join", () => {
    test("join joins array's elements", () => {
        expect(nList.join('')).toEqual('2468');
    });
    test("join doesn't mutate", () => {
        nList.join('');
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
});
describe("push", () => {
    test("push adds an element", () => {
        const _tempL = new list_1.List(Toolbelt_1.voider);
        _tempL.push(2);
        expect(_tempL.val).toEqual([2]);
    });
});
describe("pop", () => {
    test("removes last element", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.fewerThan(10), Toolbelt_1.even]);
        _tempL.pop();
        expect(_tempL.val).toEqual([2, 4, 6]);
    });
    test("returns removed element", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.fewerThan(10), Toolbelt_1.even]);
        expect(_tempL.pop()).toBe(8);
    });
});
describe("shift", () => {
    test("removes first element of a List", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.fewerThan(10), Toolbelt_1.even]);
        _tempL.shift();
        expect(_tempL.val).toEqual([4, 6, 8]);
    });
    test("returns removed element", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.fewerThan(10), Toolbelt_1.even]);
        expect(_tempL.shift()).toBe(2);
    });
});
describe("unshift", () => {
    const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.even, Toolbelt_1.notZero, Toolbelt_1.smallerThanTen]);
    test("adds new element and returns new length", () => {
        expect(_tempL.unshift(2));
    });
});
describe("concat", () => {
    test("concat concats returns concated array", () => {
        expect(nList.concat([1, 2, 3])).toEqual([2, 4, 6, 8, 1, 2, 3]);
    });
    test("concat doesn't mutate", () => {
        nList.concat([1, 2, 3]);
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
});
describe("reduce", () => {
    test("Sums numbers in 1d Array (behaves like Array.prototype.reduce)", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.smallerThan(10), Toolbelt_1.even]);
        expect(_tempL.reduce(Toolbelt_1.sum, 0)).toBe(20);
        // 0 + 0 + 2 + 4 + 6 + 8 
    });
});
describe("filter", () => {
    test("returns even nums from 0 to 10", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.smallerThan(10)]);
        expect(_tempL.filter(Toolbelt_1.even)).toEqual([0, 2, 4, 6, 8]);
    });
    test("doesn't mutate", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.smallerThan(10)]);
        _tempL.filter(Toolbelt_1.even);
        expect(_tempL.val).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});
describe("copyWithin", () => {
    test("copyWithin works", () => {
        expect(nList.copyWithin(2, 1, 2)).toEqual([2, 4, 4, 8]);
    });
    test("copyWithin dowsn't mutate", () => {
        nList.copyWithin(2, 1, 2);
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
    test("only target", () => {
        expect(nList.copyWithin(3)).toEqual([2, 4, 6, 2]);
    });
    test("default with start", () => {
        expect(nList.copyWithin(3, 2)).toEqual([2, 4, 6, 6]);
    });
});
describe("toString", () => {
    test("toString returns single string", () => {
        expect(nList.toString()).toBe("2,4,6,8");
    });
    test("toString doesn't mutate", () => {
        nList.toString();
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
});
describe("sort", () => {
    test("returns sorted Array without parameters", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.smallerThanTen, Toolbelt_1.notZero, Toolbelt_1.even]);
        _tempL.val = [6, 2];
        expect(_tempL.sort()).toEqual([2, 6]);
    });
});
// Special methods
describe("fmap", () => {
    test("fmap filters", () => {
        expect(new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.even, Toolbelt_1.smallerThanTen, Toolbelt_1.notZero])
            .fmap(Toolbelt_1.double)).toEqual([4, 8]);
    });
    test("fmap doesn't mutate", () => {
        const _l = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.even, Toolbelt_1.smallerThanTen, Toolbelt_1.notZero]);
        _l.fmap(Toolbelt_1.double);
        expect(_l.val).toEqual([2, 4, 6, 8]);
    });
    test("fmap maps 3d List", () => {
        expect(thdList.fmap(Toolbelt_1.double)).toEqual([4, 8, [12, 16]]);
    });
});
describe("fconcat", () => {
    test("fconcat filters", () => {
        expect(nList.fconcat([12, 534, 432])).toEqual([2, 4, 6, 8]);
    });
    test("fconcat doesn't mutate", () => {
        nList.fconcat([1, 2, 3]);
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
});
describe("fpush", () => {
    test("fpush adds an element", () => {
        const _tempL = new list_1.List(Toolbelt_1.voider);
        _tempL.push(2);
        expect(_tempL.val).toEqual([2]);
    });
    test("fpush returns and array", () => {
        const _tempL = new list_1.List(Toolbelt_1.voider);
        expect(_tempL.fpush(2)).toEqual([2]);
    });
});
describe("reFill", () => {
    test("reFill returns same array as in the init", () => {
        const _tempL = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.smallerThan(4)]);
        _tempL.val = [1, 3];
        console.log(_tempL.val);
        expect(_tempL.reFill()).toEqual([1, 2, 3]);
    });
    test("reFill doesn't mutate", () => {
        nList.reFill(Toolbelt_1.enumerate);
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
});
describe("shuffle", () => {
    test("shuffles", () => {
        expect(nList.shuffle()).not.toEqual([2, 4, 6, 8]);
    });
    test("shuffle doesn't mutate", () => {
        expect(nList.shuffle().sort()).toEqual([2, 4, 6, 8]);
    });
});
describe("hasInnerArr", () => {
    test("true with 2d List", () => {
        expect(twdList.hasInnerArr()).toBeTruthy();
    });
    test("false width 1d List", () => {
        expect(nList.hasInnerArr()).toBeFalsy();
    });
});
describe("flatten", () => {
    test("flattens 2d List", () => {
        expect(twdList.flatten()).toEqual([2, 4, 6, 8]);
    });
    test("flattens 3d List", () => {
        expect(thdList.flatten()).toEqual([2, 4, 6, 8, 10, 12, 14]);
    });
    test("flattens 3d string List", () => {
        expect(strList.flatten()).toEqual(['a', 'b', 'c']);
    });
    /*test("flattens 23d List", () => { // I've tested that, please for the love of God don't use that EVER AGAIN!
    const ttdList = new List<number>(enumerate, [notZero, smallerThan(42)])
    ttdList.val = [
      [1, [2,[3,[4,[5,[6,[7,[8,[9,[10,[11,[12,[13,[14,[15,[16,[17,[18,[19,[20,[21,[22]]]]]]]]]]]]]]]]]]]]]]
    ]
      expect(
        ttdList.flatten()
      ).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22])
    })*/
});
describe("fromOther", () => {
    test("fromOther returns sorted List from 5 other", () => {
        const lArr = new Array(5).fill(new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.smallerThanTen, Toolbelt_1.even, Toolbelt_1.notZero], 20));
        const _l = list_1.List.fromOther(lArr);
        expect(_l.val).toEqual([2, 4, 6, 8]);
    });
    test("fromOther doesn't mutate", () => {
        const l1 = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.smallerThanTen, Toolbelt_1.even, Toolbelt_1.notZero], 20);
        const l2 = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.smallerThanTen, Toolbelt_1.even], 20);
        list_1.List.fromOther([l1, l2]);
        expect(l2.val).toEqual([0, 2, 4, 6, 8]);
    });
});
describe("compare", () => {
    test("true with diffrent order Lists", () => {
        const lA = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.smallerThanTen]);
        const lB = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.smallerThanTen]);
        lB.val = lB.shuffle();
        expect(list_1.List.compare(lA, lB)).toBeTruthy();
    });
    test("false with diffrent Lists", () => {
        const lA = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.notZero, Toolbelt_1.smallerThanTen]);
        const lB = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.smallerThanTen]);
        expect(list_1.List.compare(lA, lB)).toBeFalsy();
    });
    test("true with the same object Lists", () => {
        const lA = new list_1.List(Toolbelt_1.voider, [Toolbelt_1.usersOnly]);
        lA.val = [
            {
                name: "John Smith",
                role: "Admin",
                age: 21
            },
            {
                name: "Anna Jessit",
                role: "User",
                age: 26
            },
            {
                name: "Roger Clos",
                role: "User",
                age: 31
            },
            {
                name: "John Smith",
                role: "User",
                age: 51
            },
            {
                name: "Jamie Smith",
                role: "Admin",
                age: 24
            }
        ];
        const lB = new list_1.List(Toolbelt_1.voider, [Toolbelt_1.usersOnly]);
        lB.val = [
            {
                name: "John Smith",
                role: "Admin",
                age: 21
            },
            {
                name: "Anna Jessit",
                role: "User",
                age: 26
            },
            {
                name: "Roger Clos",
                role: "User",
                age: 31
            },
            {
                name: "John Smith",
                role: "User",
                age: 51
            },
            {
                name: "Jamie Smith",
                role: "Admin",
                age: 24
            }
        ];
        expect(list_1.List.compare(lA, lB)).toBeTruthy();
    });
    test("false with diffrent object Lists", () => {
        const lA = new list_1.List(Toolbelt_1.voider, []);
        lA.val = [
            {
                name: "Marry Smith",
                role: "Admin",
                age: 21,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            },
            {
                name: "Anna Jessit",
                role: "User",
                age: 26,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            },
            {
                name: "Roger Clos",
                role: "User",
                age: 31,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            },
            {
                name: "John Smith",
                role: "User",
                age: 51,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            },
            {
                name: "Jamie Smith",
                role: "Admin",
                age: 24,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            }
        ];
        const lB = new list_1.List(Toolbelt_1.voider, []);
        lB.val = [
            {
                name: "John Smith",
                role: "Admin",
                age: 21,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            },
            {
                name: "Anna Jessit",
                role: "User",
                age: 26,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            },
            {
                name: "Roger Clos",
                role: "User",
                age: 31,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            },
            {
                name: "John Smith",
                role: "User",
                age: 51,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            },
            {
                name: "Jamie Smith",
                role: "Admin",
                age: 24,
                pets: [
                    {
                        edgard: "dog"
                    }
                ]
            }
        ];
        expect(list_1.List.compare(lA, lB)).toBeFalsy();
    });
    test("false with diffrence in sub-object", () => {
        const lA = new list_1.List(Toolbelt_1.voider, []);
        lA.val = [
            {
                name: "Marry Smith",
                role: "Admin",
                age: 21,
                pets: [
                    "dog"
                ]
            },
            {
                name: "Anna Jessit",
                role: "User",
                age: 26,
                pets: [
                    "dog"
                ]
            },
            {
                name: "Roger Clos",
                role: "User",
                age: 31,
                pets: [
                    "dog"
                ]
            },
            {
                name: "John Smith",
                role: "User",
                age: 51,
                pets: [
                    "dog"
                ]
            },
            {
                name: "Jamie Smith",
                role: "Admin",
                age: 24,
                pets: [
                    "dog"
                ]
            }
        ];
        const lB = new list_1.List(Toolbelt_1.voider, []);
        lB.val = [
            {
                name: "John Smith",
                role: "Admin",
                age: 21,
                pets: [
                    "dog"
                ]
            },
            {
                name: "Anna Jessit",
                role: "User",
                age: 26,
                pets: [
                    "dog"
                ]
            },
            {
                name: "Roger Clos",
                role: "User",
                age: 31,
                pets: [
                    "cat"
                ]
            },
            {
                name: "John Smith",
                role: "User",
                age: 51,
                pets: [
                    "cat"
                ]
            },
            {
                name: "Jamie Smith",
                role: "Admin",
                age: 24,
                pets: [
                    "dog"
                ]
            }
        ];
        expect(list_1.List.compare(lA, lB)).toBeFalsy();
    });
    test("false with diffrence in 4d Array", () => {
        const lA = new list_1.List(Toolbelt_1.voider);
        const lB = new list_1.List(Toolbelt_1.voider);
        lA.val = [1, 2, [3, 4, [5, 6, [7, 8]]]];
        lB.val = [1, 2, [3, 4, [5, 6, [7, 9]]]];
        expect(list_1.List.compare(lA, lB)).toBeFalsy();
    });
});
describe("dropWhile", () => {
    test("ignores truthy anter falsy", () => {
        const _tempL = new list_1.List(Toolbelt_1.voider);
        _tempL.val = [1, 3, 10, 2, 6];
        expect(_tempL.dropWhile(Toolbelt_1.smallerThan(10))).toEqual([10, 2, 6]);
    });
    test("doesn't mutate", () => {
        const odList = new list_1.List(Toolbelt_1.enumerate, [Toolbelt_1.even, Toolbelt_1.smallerThanTen, Toolbelt_1.notZero]);
        odList.dropWhile(Toolbelt_1.smallerThan(3));
        expect(odList.val).toEqual([2, 4, 6, 8]);
    });
});
describe("span PRIVATE", () => {
    test("doesn't mutate", () => {
        nList.span(Toolbelt_1.smallerThan(3));
        expect(nList.val).toEqual([2, 4, 6, 8]);
    });
    test("returns 2d Array from 3d", () => {
        expect(thdList.span(Toolbelt_1.smallerThan(3))).toEqual([[2], [4, 6, 8, 10, 12, 14]]);
    });
    test("returns 2d empty Array from an Empty Array", () => {
        const emptyList = new list_1.List(Toolbelt_1.voider);
        expect(emptyList.span(Toolbelt_1.smallerThan(3))).toEqual([[], []]);
    });
});
describe("span STATIC", () => {
    test("doesn't mutate", () => {
        const _tempL = [1, 2, 3, 4];
        list_1.List.span(Toolbelt_1.smallerThan(3), _tempL);
        expect(_tempL).toEqual([1, 2, 3, 4]);
    });
    test("returns 2d Array from 3d", () => {
        const _tempL = [1, [2, [3]]];
        expect(list_1.List.span(Toolbelt_1.smallerThan(3), _tempL)).toEqual([[1, 2], [3]]);
    });
    test("returns 2d empty Array from an Empty Array", () => {
        const emptyArr = [];
        expect(list_1.List.span(Toolbelt_1.smallerThan(3), emptyArr)).toEqual([[], []]);
    });
});
