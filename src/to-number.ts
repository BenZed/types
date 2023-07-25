/**
 * Convert a type to a numeric
 */
export type ToNumber<N, ELSE extends number = 0> = N extends number
    ? N
    : N extends `${infer N extends number}`
    ? N
    : N extends bigint
    ? ToNumber<`${N}`, ELSE>
    : N extends boolean
    ? N extends true
        ? 1
        : 0
    : ELSE
