import { Func, isFunc } from '../func'
import { isString } from '../primitive'
import { isObject } from './is-object'

export const isIterable = <T>(input: unknown): input is Iterable<T> => {
    type SymbolIterator = { [Symbol.iterator]: Func }

    return (
        isString(input) ||
        (isObject<SymbolIterator>(input) && isFunc(input[Symbol.iterator]))
    )
}
