import { isUnknown } from '.'

import { it, expect, describe } from '@jest/globals'

describe(isUnknown.name, () => {
    it('should always return true', () => {
        expect(isUnknown({})).toBe(true)
        expect(isUnknown(null)).toBe(true)
        expect(isUnknown(undefined)).toBe(true)
    })
})
