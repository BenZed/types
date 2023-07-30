import { isRecord } from '.'

import { it, expect, describe } from '@jest/globals'

describe(isRecord.name, () => {
    it('should return true for a plain object', () => {
        const input = { a: 1, b: 'two', c: [3] }
        expect(isRecord(input)).toBe(true)
    })

    it('should return false for a Map object', () => {
        const input = new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3]
        ])
        expect(isRecord(input)).toBe(false)
    })

    it('should return false for an array', () => {
        const input = [1, 2, 3]
        expect(isRecord(input)).toBe(false)
    })
})
