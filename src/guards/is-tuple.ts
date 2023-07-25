import { TypeGuard } from '../func'
import { isArray } from './is-array'

export type TupleInput = TypeGuard<unknown>[]
export type TupleOutput<T extends TupleInput> = T extends [
    infer T1,
    ...infer Tr
]
    ? T1 extends TypeGuard<infer O>
        ? Tr extends TupleInput
            ? [O, ...TupleOutput<Tr>]
            : [O]
        : []
    : []

export const isTuple =
    <T extends TupleInput>(...types: T): TypeGuard<TupleOutput<T>> =>
    (input: unknown): input is TupleOutput<T> =>
        isArray(input) &&
        input.length === types.length &&
        types.every((type, i) => type(input[i]))
