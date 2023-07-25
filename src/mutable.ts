//
export type Mutable<T> = T extends object
    ? T extends Array<infer U> | Readonly<Array<infer U>>
        ? Mutable<U>[]
        : { -readonly [K in keyof T as K]: Mutable<T[K]> }
    : T
