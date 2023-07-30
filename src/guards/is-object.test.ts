import { isObject } from '.'

import { it, expect, describe } from '@jest/globals'

describe(isObject.name, () => {
    it('should return true for a plain object', () => {
        const input = { a: 1, b: 'two', c: [3] }
        expect(isObject(input)).toBe(true)
    })

    it('should return true for a function', () => {
        const input = () => {
            /**/
        }
        expect(isObject(input)).toBe(true)
    })

    it('should return false for a primitive', () => {
        const input = 42
        expect(isObject(input)).toBe(false)
    })
})
