import { isRecord } from './guards'

/**
 * Object with no properties
 */
export type Empty = { [key: string]: never }

export const isEmpty = (input: unknown): input is Empty => {
    if (!isRecord(input)) return false

    // if we've iterated through a single key
    // it must not be empty
    for (const key in input) return void key ?? false

    return true
}
