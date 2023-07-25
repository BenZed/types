import { Func } from './func'

/**
 * Get a compiled contract of a given type.
 */
export type Compile<T, E = void, R extends boolean = true> = T extends E
    ? T
    : T extends Map<infer K, infer V>
    ? R extends true
        ? Map<Compile<K, E, R>, Compile<V, E, R>>
        : Map<K, V>
    : T extends Set<infer V>
    ? Set<V>
    : T extends Promise<infer A>
    ? R extends true
        ? Promise<Compile<A, E, R>>
        : Promise<A>
    : T extends object
    ? T extends Date | RegExp | Func | Error
        ? T
        : T extends infer O
        ? { [K in keyof O]: R extends true ? Compile<O[K], E, R> : O[K] }
        : never
    : T
