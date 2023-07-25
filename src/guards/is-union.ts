import { AnyTypeGuard, TypeGuard, TypesOf } from '../func'

export const isUnion =
    <T extends AnyTypeGuard[]>(...types: T): TypeGuard<TypesOf<T>[number]> =>
    (i: unknown): i is TypesOf<T>[number] =>
        types.some(type => type(i))
