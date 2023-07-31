import { AnyTypeGuard, TypeGuard, TypesOf } from './is-func'

export const isUnion =
    <T extends AnyTypeGuard[]>(...types: T): TypeGuard<TypesOf<T>[number]> =>
    (i: unknown): i is TypesOf<T>[number] =>
        types.some(type => type(i))
