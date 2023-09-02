import { Intersect } from './merge'

/* eslint-disable 
    @typescript-eslint/no-explicit-any
*/

/**
 * Make specific keys of a type required
 */
export type PartialRequire<T, K extends keyof T> = Intersect<
    [
        {
            [Tk in keyof T as Tk extends K ? Tk : never]-?: T[Tk]
        },
        {
            [Tk in keyof T as Tk extends K ? never : Tk]: T[Tk]
        }
    ]
>

/**
 * Make specific keys of a type optional.
 */
export type PartialOptional<T, K extends keyof T> = Intersect<
    [
        {
            [Tk in keyof T as Tk extends K ? never : Tk]: T[Tk]
        },
        {
            [Tk in keyof T as Tk extends K ? Tk : never]?: T[Tk]
        }
    ]
>
