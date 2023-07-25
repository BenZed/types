import { TypeGuard } from '../func'
import { nil } from '../nil'

export const isOptional =
    <T>(isType: TypeGuard<T>): TypeGuard<T | nil> =>
    (i: unknown): i is T | nil =>
        i === nil || isType(i)
