export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const tuple = <T extends string[]>(...args: T) => args

export const tupleNum = <T extends number[]>(...args: T) => args

export type LiteralUnion<T extends U, U> = T | (U & Record<string, unknown>)

export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never

export type AnyFunction<T = any> = (...args: T[]) => any

// eslint-disable-next-line @typescript-eslint/ban-types
export type FunctionArguments<T extends Function> = T extends (...args: infer R) => any ? R : never

export type Dict<T = any> = Record<string, T>

export type Booleanish = boolean | 'true' | 'false'
export type StringOrNumber = string | number
