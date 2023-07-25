import { isObject } from './is-object'

export function isKeyed<K extends PropertyKey[]>(
    ...keys: K
): (input: unknown) => input is Record<K[number], unknown> {
    return (input: unknown): input is Record<K[number], unknown> =>
        isObject(input) && keys.every(key => key in input)
}
