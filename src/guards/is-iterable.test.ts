import { isIterable } from './is-iterable'

import { it, expect, describe } from '@jest/globals'

describe(isIterable.name, () => {
    it('should return true for an array', () => {
        const input = [1, 2, 3]
        expect(isIterable(input)).toBe(true)
    })

    it('should return true for a string', () => {
        const input = 'hello'
        expect(isIterable(input)).toBe(true)
    })

    it('should return true for a Set', () => {
        const input = new Set([1, 2, 3])
        expect(isIterable(input)).toBe(true)
    })

    it('should return false for a number', () => {
        const input = 42
        expect(isIterable(input)).toBe(false)
    })
})
