import { isUnion } from '.'

import { isNumber, isString } from '../primitive'

import { test, expect, describe } from '@jest/globals'

describe(isUnion.name, () => {
    test('should return true for values that match the first type guard', () => {
        const union = isUnion(isString, isNumber)
        expect(union('hello')).toBe(true)
        expect(union(42)).toBe(true)
    })

    test('should return true for values that match the second type guard', () => {
        const union = isUnion(isString, isNumber)
        expect(union(42)).toBe(true)
        expect(union('hello')).toBe(true)
    })

    test('should return false for values that match neither type guard', () => {
        const union = isUnion(isString, isNumber)
        expect(union(true)).toBe(false)
        expect(union(undefined)).toBe(false)
    })
})
