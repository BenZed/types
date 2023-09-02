import { TypeGuard, TypeOf, isFunc } from './is-func'
import { Infer } from '../infer'
import { isObject } from './is-object'

//// EsLint ////
/* eslint-disable 
    @typescript-eslint/no-explicit-any,
*/

//// Types ////

export type ShapeGuards = Record<string | symbol, TypeGuard<unknown>>

export type ShapeGuardTypes<T extends ShapeGuards> = Infer<
    {
        [K in keyof T]: TypeOf<T[K]>
    },
    object
>

export type ShapeGuardsForType<T extends object> = {
    [K in keyof T]: TypeGuard<T[K]>
}

//// Main ////

export function isShapeOf<T extends object>(
    shape: ShapeGuardsForType<T>
): TypeGuard<T>
export function isShapeOf<T extends ShapeGuards>(
    shape: object
): TypeGuard<ShapeGuardTypes<T>>

export function isShapeOf(shape: object) {
    const keys = [
        ...Object.getOwnPropertyNames(shape),
        ...Object.getOwnPropertySymbols(shape)
    ].filter(k => isFunc(shape[k as keyof typeof shape]))

    return (input: unknown) => {
        if (!isObject(input)) return false

        for (const key of keys) {
            if (!(shape as any)[key](input[key as keyof typeof input]))
                return false
        }

        return true
    }
}
