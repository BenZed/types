import { AnyTypeGuard, TypeGuard, TypesOf } from './is-func'
import { Intersect } from '../merge'

//// Exports ////

export const isIntersection =
    <T extends AnyTypeGuard[]>(...types: T): TypeGuard<Intersect<TypesOf<T>>> =>
    (i: unknown): i is Intersect<TypesOf<T>> =>
        types.every(type => type(i))
