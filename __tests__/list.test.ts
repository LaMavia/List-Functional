import { List } from '../list'
import { even, smallerThanTen, smallerThan, positive, notZero, enumerate, negator, double, voider, negative, randChar, fewerThan, Person, usersOnly} from '../Toolbelt'

const nList = new List<number>(enumerate, [even, smallerThanTen, positive])
const bList = new List<number>(voider, [even, smallerThanTen, positive])
const negList = new List<number>(negator, [even, notZero, (num: number): boolean => num > -15, negative])
const twdList = new List<number>(enumerate, [notZero, smallerThan(20)])
twdList.val = [2,4, [6,8]]
const thdList = new List<number>(enumerate, [notZero, smallerThan(20)])
thdList.val = [2, 4, [6, 8, [10, 12], 14]]
const strList = new List<string>(randChar, [fewerThan(5)])
strList.val = ['a', ['b', ['c']]]

// const evList = new List<number>(enumerate, [notZero, smallerThanTen, even])
/*
const ttdList = new List<number>(enumerate, [notZero, smallerThan(42)])
ttdList.val = [
  [1, [2,[3,[4,[5,[6,[7,[8,[9,[10,[11,[12,[13,[14,[15,[16,[17,[18,[19,[20,[21,[22]]]]]]]]]]]]]]]]]]]]]]
]*/

describe("Basic functionality", () => {
  test("Returns Just value", () => {
    expect(nList.val).toEqual([2,4,6,8])
  })
  test("Returns Base Value upon void", () => {
    expect(bList.val).toEqual([])
  })
  test(".val === .arr", () => {
    expect(bList.arr).toEqual(bList.val)
  })
  test("Works with negatives", () => {
    expect(
      negList.val
    ).toEqual([-2,-4,-6,-8,-10,-12,-14])
  })
  test("Applies filters after value change (number)", () => {
    negList.val = [1,2,3,4,5,6]
    expect(
      negList.val
    ).toEqual([])
  })
  test("Applies filters after value change (string)", () => {
    const sl = new List<string>(randChar, [fewerThan(5)])
    console.log(sl.val)
    sl.val = ["abc", "def", "g", "h", "i", "j", "k", "l"]
    expect(
      sl.val
    ).toEqual(["abc", "def", "g", "h"])
  })
  test("Applies filters after value change (object)", () => {
    const persList = new List<Person>(voider, [usersOnly, fewerThan(4)])
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
    ]
    expect(
      persList.val
    ).toEqual([
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
    ])
  })
})

describe("map", () => {
  test(`map doesn't mutate`, () => {
    nList.map(double)
    expect(nList.val).toEqual([2,4,6,8])
  })
})

describe("forEach", () => {
  test("forEach recives values", () => {
    const _tempL = new List<number>(enumerate, [smallerThan(4), notZero])
    const output: any[] = []
    _tempL.forEach((el: number) => {output.push(el)})
    expect(
      output
    ).toEqual([1,2,3])
  })
})

describe("reverse", () => {
  test("reverse revers the List", () => {
    expect(
      nList.reverse()
    ).toEqual([8,6,4,2])
  })
  test(`reverse doesn't mutate`, () => {
    nList.reverse()
    expect(
      nList.val
    ).toEqual([2,4,6,8])
  })
})

describe("join", () => {
  test("join joins array's elements", () => {
    expect(
      nList.join('')
    ).toEqual('2468')
  })
  test("join doesn't mutate", () => {
    nList.join('')
    expect(
      nList.val
    ).toEqual([2,4,6,8])
  })
})

describe("push", () => {
  test("push adds an element", () => {
    const _tempL = new List<number>(voider)
    _tempL.push(2)
    expect(
      _tempL.val
    ).toEqual([2])
  })
})

describe("concat", () => {
  test("concat concats returns concated array", () => {
    expect(
      nList.concat([1,2,3])
    ).toEqual([2,4,6,8,1,2,3])
  })
  test("concat doesn't mutate", () => {
    nList.concat([1,2,3])
    expect(
      nList.val
    ).toEqual([2,4,6,8])
  })
})

describe("copyWithin", () => {
  test("copyWithin works", () => {
    expect(
      nList.copyWithin(2,1,2)
    ).toEqual([2,4,4,8])
  })
  test("copyWithin dowsn't mutate", () => {
    nList.copyWithin(2,1,2)
    expect(
      nList.val
    ).toEqual([2,4,6,8])
  })
  test("only target", () => {
    expect(
      nList.copyWithin(3)
    ).toEqual([2, 4, 6, 2])
  })
  test("default with start", () => {
    expect(
      nList.copyWithin(3,2)
    ).toEqual([2, 4, 6, 6])
  })
})

describe("toString", () => {
  test("toString returns single string", () => {
    expect(
      nList.toString()
    ).toBe("2,4,6,8")
  })
  test("toString doesn't mutate", () => {
    nList.toString()
    expect(
      nList.val
    ).toEqual([2,4,6,8])
  })
})

// Special methods
describe("fmap", () => {
  test("fmap filters", () => {
    expect(
      new List(enumerate, [even, smallerThanTen, notZero])
        .fmap(double)    
    ).toEqual([4,8])
  })
  test("fmap doesn't mutate", () => {
    const _l: List<number> = new List(enumerate, [even, smallerThanTen, notZero])
    _l.fmap(double)
    expect(_l.val).toEqual([2,4,6,8])
  })
  test("fmap maps 3d List", () => {
    expect(
      thdList.fmap(double)
    ).toEqual([4, 8, [12, 16]])
  })
})

describe("fconcat", () => {
  test("fconcat filters", () => {
    expect(
      nList.fconcat([12,534,432])
    ).toEqual([2,4,6,8])
  })
  test("fconcat doesn't mutate", () => {
    nList.fconcat([1,2,3])
    expect(
      nList.val
    ).toEqual([2,4,6,8])
  })
})

describe("fpush", () => {
  test("fpush adds an element", () => {
    const _tempL = new List<number>(voider)
    _tempL.push(2)
    expect(
      _tempL.val
    ).toEqual([2])
  })
  test("fpush returns and array", () => {
    const _tempL = new List<number>(voider)
    expect(
      _tempL.fpush(2)
    ).toEqual([2])
  })
})

describe("reFill", () => {
  test("reFill returns same array as in the init", () => {
    const _tempL = new List<number>(enumerate, [notZero, smallerThan(4)])
    _tempL.val = [1,3]
    expect(
      _tempL.reFill()
    ).toEqual([1,2,3])

  })
  test("reFill doesn't mutate", () => {
    nList.reFill(enumerate)
    expect(
      nList.val
    ).toEqual([2,4,6,8])
  })
})

describe("shuffle", () => {
  test("shuffles", () => {
    expect(
      nList.shuffle()
    ).not.toEqual([2,4,6,8])
  })
  test("shuffle doesn't mutate", () => {
    expect(
      nList.shuffle().sort()
    ).toEqual([2,4,6,8])
  })
})

describe("flatten", () => {
  test("flattens 2d List", () => {
    expect(
      twdList.flatten()
    ).toEqual([2,4, 6, 8])
  })
  test("flattens 3d List", () => {
    expect(
      thdList.flatten()
    ).toEqual([2,4,6,8,10,12,14])
  })
  test("flattens 3d string List", () => {
    expect(
      strList.flatten()
    ).toEqual(['a','b','c'])
  })
  // test("flattens 23d List", () => { // I've tested that, please for the love of God don't use that EVER AGAIN!
  //   expect(
  //     ttdList.flatten()
  //   ).toEqual([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22])
  // })
})

describe("fromOther", () => {
  test("fromOther returns sorted List from 5 other", () => {
    const larr: List<number>[] = new Array(5).fill(new List<number>(enumerate, [smallerThanTen, even, notZero], 20))
    const _l = List.fromOther(larr)
    expect(
      _l.val
    ).toEqual([2,4,6,8])
  })
  test("fromOther doesn't mutate", () => {
    const l1 = new List<number>(enumerate, [smallerThanTen, even, notZero], 20)
    const l2 = new List<number>(enumerate, [smallerThanTen, even], 20)
    List.fromOther([l1,l2])
    expect(
      l2.val
    ).toEqual([0,2,4,6,8])
  })
})

describe("compare", () => {
  test("true with diffrent order Lists", () => {
    const lA = new List<number>(enumerate, [notZero, smallerThanTen])
    const lB = new List<number>(enumerate, [notZero, smallerThanTen])
    lB.val = lB.shuffle()
    expect(
      List.compare(lA, lB)
    ).toBeTruthy()
  })
})


