import { Maybe } from "./Monads"
import { keeper, random, enumerate, even, smallerThanTen, notZero, smallerThan, odd, voider, positive, negator, randChar, fewerThan, double } from './Toolbelt'

export type IO = (args?:any) => void
export type Filter<T> = (value: T, i?: number, array?: T[]) => Boolean
export type FilterConstruct<T> = (n: number) => Filter<T>
export type Mapper<T> = (value: T, index?: number, array?: T[]) => T
export type Filler<T> = (array: T[]) => ((value: T, index: number, array: T[]) => T)

export class List<Type> {
  filler: Filler<Type>
  filters: Filter<Type>[]
  arr: Type[]

  constructor(filler: Filler<Type>, filters: Filter<any>[] = [], length: number = 100) {
    // super()
    this.filler = filler
    this.filters = filters
    this.arr = this.withFilters(
      Maybe<any[], Type[]>([], filler, new Array(length).fill(0))
    )
    
    this.withFilters = this.withFilters.bind(this)
  }

  set val(newVal: any[]) {
    this.arr = this.withFilters(
      Maybe<any[], Type[]>(this.arr, keeper, newVal)
    )
  }

  get val(){
    return this.arr
  }

  get length(){
    return this.arr.length
  }

  withFilters(_val: any[]): Type[]{
    let copy: any[] = _val.slice()
    this.filters.forEach((filter: Filter<any>): void => {
      copy = copy.filter((el: any, i: number, arr: any[]) => {
        if(Array.isArray(el)) {
          el = this.withFilters(el) // preparing for check
          return Boolean(el.length) // removing empty arrays
        } else {
          return filter.call(this, el, i, arr)
        }
      })
    }, this)
    return copy
  }

  // SPECIAL
  fmap(mapper: Mapper<Type>, arr: Type[] = this.arr): Type[]{
    const copy = arr.slice()
    const mappedCopy = copy.map((el: Type ): any => 
    Array.isArray(el) 
      ? this.fmap(mapper, el) 
      : mapper(el)
    )
    return this.withFilters(mappedCopy)
  }

  fconcat(arrayToConcat: any[]){
    return this.withFilters(
      this.arr.concat(arrayToConcat)
    )
  }

  fpush(elToAdd: any){
    this.arr.push(elToAdd)
    return this.withFilters(this.arr) 
  }

  reFill(callbackFn: Filler<any> = this.filler){
    return this.withFilters(
      callbackFn(new Array(100).fill(1))
    )
  }

  shuffle(): Type[]{
    const rand = (a: any, b: any) => (a * Math.random() * 4 - 4) - (b * Math.random() * 4 - 4)
    const copy = this.arr.slice().sort(rand)
    return copy.toString() === this.toString() 
      ? this.shuffle() 
      : copy  
  }

  hasInnerArr = (arr: any[] = this.arr): boolean => {
    for(let i = 0; i < arr.length; i++){
      if(Array.isArray(arr[i])){
        return true
      }
    } 
    return false
  }

  flatten( arr: Type[] = this.arr.slice() ): Type[]{
    return arr
      .toString()
      .split(",")
      .map((el: string): any => 
        Number(el) ? Number(el) : el
      ) 
  }
  // STATIC
  static fromOther(Lists: List<any>[]){
    const isntIn = (elToCheck: any, arr: any[]): boolean => {
      for(let i = 0; i < arr.length; i++){
        if(arr[i] === elToCheck) return false
      }
      return true
    }

    const _val: any[] = Lists
      .reduce((res: any[], el: List<any>) => 
        res.concat(el.val)
      ,[])
      .reduce((res: any[], el: any) => // removes duplicates 
        res.concat(isntIn(el, res) ? [el] : [])
      ,[])
      .sort((a: any, b: any) => a - b)
    const _filters = Lists.reduce((_fl: Filter<any>[], _list: List<any>) => _fl.concat(_list.filters), [])
    const NL: List<any> = new List<any>(keeper, _filters)
    NL.arr = _val

    return NL
  }

  static compare<Ta, Tb>(a: List<Ta>, b: List<Tb>){
    return a.sort().toString() === b.sort().toString()
  }

  // Functions from Array
  map(mapper: Mapper<Type>){// Returns unFiltered, mapped List's value
    return this.arr.map(mapper)
  }
  concat(arrayToConcat: any[]){
    return this.arr.concat(arrayToConcat)
  }
  push(elToPush: Type){
    return this.arr.push(elToPush)
  }
  pop(): Type | undefined{
    return this.arr.pop()
  }
  // ----
  shift(){
    return this.arr.slice().shift()
  }
  unshift(elToAdd: Type){
    return this.arr.slice().unshift(elToAdd)
  }
  // ----
  reduce(callbackfn: (previousValue: any, currentValue: Type, currentIndex: number, array: Type[]) => any, initialValue: any): any{
    return this.arr.reduce(callbackfn, initialValue)
  }
  filter(filterFn: Filter<Type>): Type[]{
    return this.arr.filter(filterFn)
  }
  forEach(callbackfn: (value: Type, i: number, arr: Type[]) => void){
    return this.arr.forEach(callbackfn)
  }
  join(separator?: string | undefined): string{
    return this.arr.join(separator)
  }
  reverse(): Type[]{
    return this.arr.slice().reverse()
  }
  copyWithin(target: number, start: number = 0, end: number = this.length): Type[]{
    return this.arr.slice().copyWithin(target, start, end)
  }
  toString(): string{
    return this.arr.toString()
  }
  sort(): Type[]{
    return this.arr
      .slice()
      .sort((a: any, b: any) => a - b)
  }
}

const Main = (): void => {
  // const thdList = new List<number>(enumerate, [notZero, smallerThan(20)])
  // thdList.val = [2, 4, [6, 8, [10, 12], 14]]
  // const strList = new List<string>(randChar, [fewerThan(5)])
  // strList.val = ['a', ['b', ['c']]]
  const strList = new List<string>(randChar, [fewerThan(5)])
  strList.val = ['a', ['b', ['c']]]
  const _tempL = new List<number>(enumerate, [notZero, smallerThan(4)])
  _tempL.val = [1,3]
  const tF: Filler<number> = (arr: number[]) => (el: number) => el *= 4
  _tempL.reFill()
  console.log(
    _tempL.val
  )
  // const NL = new List<number>(enumerate, [notZero, smallerThan(20)])
  // new List(enumerate, [even, smallerThanTen])
  // NL.filterMap(double)
  // console.log(NL.filterMap(double))
  // console.log(NL.map(double))
  // console.log(NL.concat([1,2,3]))
  // console.log(NL.val)  
}

Main()
