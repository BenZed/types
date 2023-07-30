import { isOptional } from '.'

import { isBoolean, isNumber, isString } from '../primitive'

import { it, expect, describe } from '@jest/globals'

describe(isOptional.name, () => {
    it('should return true for undefined', () => {
        const isOptionalString = isOptional(isString)
        expect(isOptionalString(undefined)).toBe(true)
    })

    it('should return true for the type guarded by its argument', () => {
        const isOptionalNumber = isOptional(isNumber)
        expect(isOptionalNumber(42)).toBe(true)
    })

    it('should return false for any other value', () => {
        const isOptionalBoolean = isOptional(isBoolean)
        expect(isOptionalBoolean(false)).toBe(true)
        expect(isOptionalBoolean('foo')).toBe(false)
        expect(isOptionalBoolean({})).toBe(false)
    })
})
