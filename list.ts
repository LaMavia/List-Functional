import { Maybe } from "./Monads"
import { keeper, random, enumerate, even, smallerThanTen, notZero, smallerThan, odd, voider, positive, negator, randChar, fewerThan, double, Person, usersOnly } from './Toolbelt'
import { values, flatten } from 'ramda'
export type IO = (args?:any) => void
/**.filter callback function */
export type Filter<T> = (value: T, i?: number, array?: T[]) => Boolean
export type FilterConstruct<T> = (n: number) => Filter<T>
/**.map callback function */
export type Mapper<T> = (value: T, index?: number, array?: T[]) => T
/**Returns mapped version of an Array*/
export type Filler<T> = (array: T[]) => T[] 
export type Condition = (el: any, i?: number) => Boolean

/**
 * Array on functional steroids
 * @author Tomasz Surowiec
 */
export class List<Type> {
  filler: Filler<Type>
  filters: Filter<Type>[]
  iniLength: number
  arr: Type[]

  constructor(filler: Filler<Type>, filters: Filter<any>[] = [], length: number = 100) {
    // super()
    this.filler = filler
    this.filters = filters
    this.iniLength = length
    this.arr = this.withFilters(
      Maybe<any[], Type[]>([], filler, new Array(length).fill(0))
    )
    
    this.withFilters = this.withFilters.bind(this)
  }

  /**Set new value of the List */
  set val(newVal: any[]) {
    this.arr = this.withFilters(
      Maybe<any[], Type[]>(this.arr, keeper, newVal)
    )
  }

  /**Value of the List */
  get val(){
    return this.arr
  }

  /**Length of List's array */
  get length(){
    return this.arr.length
  }

  get first(){
    return this.arr[0]
  }

  get last(){
    return this.arr[this.length]
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

  fpush(...elemsToAdd: any[]){
    this.arr.push(...elemsToAdd)
    return this.withFilters(this.arr) 
  }

  /**/funshift(...elemsToAdd: any[]){
  /**/  this.arr.unshift(...elemsToAdd)
  /**/  return this.withFilters(this.arr)
  /**/}

  reFill(callbackFn: Filler<any> = this.filler) {
    return this.withFilters(
      callbackFn(new Array(this.iniLength).fill(0))
    )
  }

  shuffle(): Type[]{
    const rand = (a: any, b: any) => (a * Math.random() * 4 - 4) - (b * Math.random() * 4 - 4)
    const copy = this.arr.slice().sort(rand)
    return copy.toString() === this.toString() 
      ? this.shuffle() 
      : copy  
  }

  dropWhile(condition: Condition){
    const arr = this.arr.slice()
    let temp = arr.slice()
    for(let i = 0; condition(arr[i], i) ; i++) {
      temp.shift()
    }
    return temp
  }

  span(condition: Filter<Type>){
    const arr = flatten(this.arr.slice())
    const output = []
    output.push(
      arr.reduceRight((out: Type[], el: Type, i: number) => {
        if(condition(el, i)) {
          arr.splice(i,1)
          return out = [el, ...out]
        } else {
          return out
        }
      }, []),
      arr
    )
    return output
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
        Number(el) ? Number(el) : el // Before that every element is a string
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
    const sortFn = (a: any, b: any) => a - b
    if(typeof a.arr[0] !== "object" && typeof b.arr[0] !== "object"){
      return a.sort(sortFn).toString() === b.sort(sortFn).toString()
    } else if(typeof a.arr[0] === "object" && typeof b.arr[0] === "object"){
      const valsA = a.arr.reduce((output: any[], el: any) => output.concat(values(el)), [])
      const valsB = b.arr.reduce((output: any[], el: any) => output.concat(values(el)), [])
      return valsA.sort(sortFn).toString() === valsB.sort(sortFn).toString()
    }
  }

  static dropWhile(condition: Condition, array: any[]){
    const arr = array.slice()
    for(let i = 0; condition(array[i], i) ; i++) {
      arr.shift()
    }
    return arr
  }

  static span(condition: Filter<any>, array: any[]){
    const arr = flatten(array.slice())
    const output = []
    output.push(
      arr.reduceRight((out: any[], el: any, i: number) => { // Pushing prefix
        if(condition(el, i)) {
          arr.splice(i,1)
          return out = [el, ...out]
        } else {
          return out
        }
      }, []),
      arr // Pushing whatever else
    )
    return output
  }

  // Functions from Array
  map(mapper: Mapper<Type>){// Returns unFiltered, mapped List's value
    return this.arr.map(mapper)
  }
  concat(arrayToConcat: any[]): any[]{
    return this.arr.concat(arrayToConcat)
  }
  push(elToPush: Type): number{
    return this.arr.push(elToPush)
  }
  pop(): Type | undefined {
    return this.arr.pop()
  }
  shift(): Type | undefined {
    return this.arr.shift()
  }
  unshift(elToAdd: Type): number{
    return this.arr.unshift(elToAdd)
  }
  reduce(callbackfn: (previousValue: any, currentValue: Type, currentIndex: number, array: Type[]) => any, initialValue: any): any{
    return this.arr.reduce(callbackfn, initialValue)
  }
  filter(filterFn: Filter<Type>): Type[]{
    return this.arr.filter(filterFn)
  }   
  forEach(callbackfn: (value: Type, i: number, arr: Type[]) => void): void{
    return this.arr.forEach(callbackfn)
  }
  join(separator?: string): string{
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
  sort(callbackfn: (a: any, b: any) => number = (a: any, b: any) => a - b): Type[]{
    return this.arr
      .slice()
      .sort(callbackfn)
  }
}

const Main = (): void => {
  const odList = new List<number>(enumerate, [even, smallerThanTen, notZero])
  console.log(
    odList.span(smallerThan(6))
  )
}

Main()
