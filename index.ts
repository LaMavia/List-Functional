// import { Maybe } from './Monads'

export const isFinal = (arr: any[]): boolean => {
  return Array.isArray(arr) ? arr.reduce((res, it) => Boolean(!it.push), false) : true 
}

export const toSingle = (arr: any[]): any => {
  arr = Array.isArray(arr) 
  ? arr
    .reduce<any[]>((res: any[], arIt: any ): any => 
      arIt.push ? res.concat(toSingle(arIt)) : res.concat(arIt)
    , [])
  : arr
  return isFinal(arr) ? arr : toSingle(arr)
}


const main = (): void => {
  // isFinal([1,2,[3,4]])
  console.log(toSingle([[1, [2]], [3, 4], [5, 6]]))
}

main()