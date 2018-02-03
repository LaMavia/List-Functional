// import { Maybe } from './Monads'

 const isFinal = (arr: any[]): boolean => {
  return Array.isArray(arr) ? arr.reduce((res, it) => Boolean(!it.push), false) : true 
}

 const toSingle = (arr: any[]): any => {
  arr = Array.isArray(arr) 
  ? arr
    .reduce<any[]>((res: any[], arIt: any ): any => 
      arIt.push ? res.concat(toSingle(arIt)) : res.concat(arIt)
    , [])
  : arr
  return isFinal(arr) ? arr : toSingle(arr)
}

const powFact = (n: number): number => {
  return n < 0 
    ? 0 ** 0
    : n ** n
}


const main = (): void => {
  // isFinal([1,2,[3,4]])
  // console.log(toSingle([[1, [2]], [3, 4], [5, 6]]))
  const output = new Int8Array(1)
  for(let i = 1; i > 0; i -= 10 ** -20){
    output[output.length] = i ** i
  }
  console.dir(output[output.length - 1], {colors: true})
}

main()