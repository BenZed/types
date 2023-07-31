/* eslint-disable 
    @typescript-eslint/no-explicit-any,
*/

export type AbstractClass<
    A extends any[] = any[],
    I extends object = object
> = abstract new (...args: A) => I

export type Class<A extends any[] = any[], I extends object = object> = new (
    ...args: A
) => I

export type TypeGuard<O extends I, I = unknown> = (input: I) => input is O
export type AnyTypeGuard = TypeGuard<any, any>

export type TypeAssertion<O extends I, I = unknown> = (
    input: I
) => asserts input is O
export type AnyTypeAssertion = TypeAssertion<any, any>

export type TypeOf<F extends _AnyTypeMethod> = F extends
    | TypeGuard<infer T>
    | TypeAssertion<infer T>
    ? T
    : unknown
type _AnyTypeMethod = AnyTypeGuard | AnyTypeAssertion

export type TypesOf<F extends _AnyTypeMethods> = F extends [
    infer F1,
    ...infer Fr
]
    ? F1 extends TypeGuard<infer T1, any>
        ? Fr extends _AnyTypeMethods
            ? [T1, ...TypesOf<Fr>]
            : [T1]
        : Fr extends _AnyTypeMethods
        ? TypesOf<Fr>
        : []
    : []
type _AnyTypeMethods = _AnyTypeMethod[] | readonly _AnyTypeMethod[]

/**
 * Any function.
 */
export type Func = (...args: any) => any

export const isFunc = <F extends Func = Func>(i: unknown): i is F =>
    typeof i === 'function'
