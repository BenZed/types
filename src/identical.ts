/**
 * Retrieve conditional types if two input types are equal.
 */
export type Identical<T1, T2> =
    // This is some magician shit I got off the internet and did not write.
    (<T>() => T extends T1 ? 1 : 2) extends <T>() => T extends T2 ? 1 : 2
        ? true
        : false
