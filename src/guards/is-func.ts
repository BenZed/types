/* eslint-disable 
    @typescript-eslint/no-explicit-any,
*/

export type AbstractClass<
    I extends object = object,
    A extends any[] = any[]
> = abstract new (...args: A) => I

export type Class<I extends object = object, A extends any[] = any[]> = new (
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
export type Func<A extends any[] = any, R = any> = (...args: A) => R

export const isFunc = <F extends Func = Func>(i: unknown): i is F =>
    typeof i === 'function'

export function isClass(i: unknown): i is Class
export function isClass<I extends object = object, A extends any[] = any>(
    input: unknown
): input is Class<I, A> {
    return (
        isFunc(input) &&
        !!input.prototype &&
        !!input.name &&
        input.name.charAt(0) === input.name.charAt(0).toUpperCase()
    )
}
