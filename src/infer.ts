export type Infer<T, V = unknown> = T extends infer I
    ? I extends V
        ? I
        : never
    : never
