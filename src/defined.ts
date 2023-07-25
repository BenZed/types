import { isNil, nil } from './nil'

//// Type ////

/**
 * Only the keys with defined values of a given type.
 */
type Defined<T extends object> = {
    [K in keyof T as T[K] extends undefined ? never : K]: T[K]
}

//// Main ////

/**
 * Get a shallow copy of the input object that only contains
 * defined keys
 */
function defined<T extends object>(input: T): Defined<T> {
    const output = {} as T
    for (const key in input) {
        if (input[key] !== nil) output[key] = input[key]
    }

    return output as Defined<T>
}

const isDefined = <T>(input: T): input is Exclude<T, nil> => !isNil(input)

//// Exports ////

export { defined, isDefined, Defined }
