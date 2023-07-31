import { TypeGuard } from './is-func'
import { isNumber, isString } from '../primitive'
import { isRecord } from './is-record'

export const isArray = <T = unknown>(i: unknown): i is T[] => Array.isArray(i)

export const isArrayOf =
    <T>(type: TypeGuard<T>): TypeGuard<T[]> =>
    (i: unknown): i is T[] =>
        isArray(i) && i.every(type)

export const isArrayLike = <T = unknown>(i: unknown): i is ArrayLike<T> => {
    if (isString(i)) return true

    if (!isRecord(i) && !isArray(i)) return false

    if (!isNumber(i.length)) return false

    return true
}

export const isArrayLikeOf =
    <T>(type: TypeGuard<T>): TypeGuard<ArrayLike<T>> =>
    (arrayLike: unknown): arrayLike is ArrayLike<T> => {
        if (!isArrayLike(arrayLike)) return false

        for (let i = 0; i < arrayLike.length; i++) {
            if (!type(arrayLike[i])) return false
        }

        return true
    }
