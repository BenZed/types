/**
 * Use an always-true conditional type to take advantage of the fact that
 * conditionals distribute over unions. This creates a union of
 * entries for a given object.
 */
export type Entries<T extends object> = keyof T extends infer K
    ? K extends keyof T
        ? [key: K, value: T[K]]
        : never
    : never
