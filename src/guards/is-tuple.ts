import { Func, TypeGuard, TypesOf } from './is-func'
import { isArray } from './is-array'

export type TypeGuards = TypeGuard<unknown>[]

export type TupleGuardsForType<T extends readonly unknown[]> = T extends [
    infer T1,
    ...infer Tr
]
    ? Tr extends []
        ? [TypeGuard<T1>]
        : [TypeGuard<T1>, ...TupleGuardsForType<Tr>]
    : []

//// Main ////

export function isTuple<T extends TypeGuards>(
    ...types: T
): TypeGuard<TypesOf<T>>

export function isTuple<T extends readonly unknown[]>(
    ...types: TupleGuardsForType<T>
): TypeGuard<T>

export function isTuple(...types: Func[]) {
    return (input: unknown) =>
        isArray(input) &&
        input.length === types.length &&
        types.every((type, i) => type(input[i]))
}
