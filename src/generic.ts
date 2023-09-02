import { isUnionOf } from './guards/is-union-of'
import { isEqual } from './primitive'

//// EsLint ////
/* eslint-disable 
    @typescript-eslint/no-explicit-any,
*/

/**
 * Generic object
 */
export type GenericObject = Record<string | symbol | number, unknown>

export const isGenericObject = (i: unknown): i is GenericObject =>
    !!i && isGenericPrototype(Object.getPrototypeOf(i))

//// Helper ////

const isGenericPrototype = isUnionOf(
    isEqual(null),
    isEqual(Object.prototype as any)
)
