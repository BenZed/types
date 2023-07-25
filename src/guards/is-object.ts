import { isFunc } from '../func'

export const isObject = <T extends object = object>(
    input: unknown
): input is T => isFunc(input) || (input !== null && typeof input === 'object')
