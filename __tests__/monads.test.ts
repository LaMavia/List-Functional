import { Maybe } from '../Monads'
const double = (num: number): Number => num * 2

test('Maybe', () => {
  const m = Maybe<Number, String>(2, double, 'rus')
  expect(m).toBe(2)
})