import { TypeGuard, TypeOf } from '../func'
import { Infer } from '../infer'
import { isObject } from './is-object'

export type ShapeInput = Record<string | symbol, TypeGuard<unknown>>
export type ShapeOutput<T extends ShapeInput> = Infer<
    {
        [K in keyof T]: TypeOf<T[K]>
    },
    object
>
export const isShape =
    <T extends ShapeInput>(shape: T): TypeGuard<ShapeOutput<T>> =>
    (input: unknown): input is ShapeOutput<T> => {
        if (!isObject(input)) return false

        for (const key in shape) {
            if (!shape[key](input[key as keyof typeof input])) return false
        }

        return true
    }
