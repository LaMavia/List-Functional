export const Maybe = <B, T = B>( baseVal: B, foo: Function, justValue: T): B | T => {
  const res: any = foo(justValue)
  return res ? res : (res === 0 ? res : baseVal)
}

const double = (num: number): number => {
  return num * 2
}

const Main = (): void => {
  console.log(Maybe(2, double, 4))
}

// Main()