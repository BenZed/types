import { isObject } from './guards'

//// Helper ////

function _omit(input: object, ...keys: (symbol | string)[]): object {
    const output: object = {}

    const namesAndSymbols = [
        ...Object.getOwnPropertyNames(input),
        ...Object.getOwnPropertySymbols(input)
    ]

    for (const nameOrSymbol of namesAndSymbols) {
        const key = nameOrSymbol as keyof typeof input
        if (!keys.includes(key)) output[key] = input[key]
    }

    return output
}

//// Main ////

export function omit<T extends object, Tk extends (keyof T)[]>(
    input: T,
    ...keys: Tk
): Omit<T, Tk[number]>
export function omit<T extends object, Tk extends (keyof T)[]>(
    ...keys: Tk
): (input: T) => Omit<T, Tk[number]>
export function omit(...input: unknown[]): unknown {
    return isObject(input[0])
        ? _omit(...(input as [object, ...(symbol | string)[]]))
        : (i: object) => _omit(i, ...(input as (symbol | string)[]))
}
