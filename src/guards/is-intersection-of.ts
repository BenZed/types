import { AnyTypeGuard, TypeGuard, TypesOf } from './is-func'
import { Intersect } from '../merge'

//// Exports ////

export const isIntersectionOf =
    <T extends AnyTypeGuard[]>(...types: T): TypeGuard<Intersect<TypesOf<T>>> =>
    (i: unknown): i is Intersect<TypesOf<T>> =>
        types.every(type => type(i))
