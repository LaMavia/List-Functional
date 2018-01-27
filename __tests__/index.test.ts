import { toSingle, isFinal } from '../index'

test('toSingle', () => {
  expect(toSingle([[1, [2]], [[3, [4]]], [5, 6]])).toEqual([1,2,3,4,5,6])
  expect(toSingle([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
})

test('isFinal', () => {
  expect(isFinal([1,2,[3,4]])).toBe(false)
})