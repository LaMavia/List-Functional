import { Filler, Mapper, Filter, FilterConstruct } from './list'
export interface Person {
  name: string
  role: string
  age: number
  projects: string[]
}
// Filters
export const even: Filter<number> = (num: number) => num % 2 === 0
export const odd: Filter<number> = (num: number) => Boolean(num % 2)
export const smallerThanTen: Filter<number> = (num: number) => num < 10
export const smallerThanTwenty: Filter<number> = (num: number) => num < 20
export const smallerThan: FilterConstruct<number> = (n: number) => (num: number) => num < n
export const positive: Filter<number> = (num: number) => num > 0
export const negative: Filter<number> = (num: number) => num < 0
export const notZero: Filter<number> = (num: number) => num !== 0
export const fewerThan: FilterConstruct<string> = (n: number) => (el: string, i: number) => i + 1 < n
export const usersOnly: Filter<Person> = (person: Person) => 
  person.role.toLowerCase() === "user"
// Mappers
export const double: Mapper<number> =
  (el: number): number => el * 2
export const randomize: Mapper<number> = 
  (): number => Math.floor(Math.random() * 10)

// Fillers
export const enumerate: Filler<any> = (arr: any[]): any => arr.map((el:any, i: number):any => i)
export const negator: Filler<any> = (arr: any[]): any => arr.map((el:any, i: number):any => -i)
export const keeper: Filler<any> = (array: any) => array.map((val: any) => val)

export const randChar: Filler<string> = (arr: any) => arr.map((el: any) => String.fromCharCode(Math.floor(Math.random() * (90 - 44) + 44)))

export const voider: any = () => {}

// Simple functions
export const random = (max: number, min: number = 0): number => Math.floor(
  Math.random() * (max - min) + min
)

