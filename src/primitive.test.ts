import {
    Falsy,
    isBigInt,
    isBoolean,
    isFalsy,
    isFinite,
    isNumber,
    isPrimitive,
    isString,
    isSymbol,
    isTruthy,
    Truthy
} from './primitive'
import { it, expect, describe } from '@jest/globals'

const value: unknown = {}

describe('falsy', () => {
    it('Falsy is a union of all falsy values', () => {
        false satisfies Falsy
        0 satisfies Falsy
        '' satisfies Falsy
        null satisfies Falsy
        undefined satisfies Falsy
    })

    it(isFalsy, () => {
        if (isFalsy(value)) value satisfies Falsy
    })
})

describe('Truthy', () => {
    it(isTruthy, () => {
        if (isTruthy(value)) value satisfies Truthy
    })
})

describe('Primitive', () => {
    it(isPrimitive, () => {
        for (const primitive of [null, undefined, 'string', 1000, true])
            expect(isPrimitive(primitive)).toEqual(true)
    })
})

it(isString, () => {
    expect(isString('string')).toBe(true)
    if (isString(value)) value satisfies string
})

it(isNumber, () => {
    expect(isNumber(100)).toBe(true)
    if (isNumber(value)) value satisfies number
})

it(isBoolean, () => {
    expect(isBoolean(true)).toBe(true)
    if (isBoolean(value)) value satisfies boolean
})

it(isBigInt, () => {
    expect(isBigInt(BigInt(10))).toBe(true)
    if (isBigInt(value)) value satisfies bigint
})

it(isSymbol, () => {
    expect(isSymbol(Symbol())).toBe(true)
    if (isSymbol(value)) value satisfies symbol
})

describe(isString, () => {
    it('should return true for string inputs', () => {
        expect(isString('hello')).toBe(true)
        expect(isString('world')).toBe(true)
        expect(isString('')).toBe(true)
    })

    it('should return false for non-string inputs', () => {
        expect(isString(123)).toBe(false)
        expect(isString(true)).toBe(false)
        expect(isString(undefined)).toBe(false)
        expect(isString(null)).toBe(false)
        expect(isString({})).toBe(false)
    })
})

describe(isNumber, () => {
    it('should return true for number inputs', () => {
        expect(isNumber(123)).toBe(true)
        expect(isNumber(0)).toBe(true)
        expect(isNumber(-3.14)).toBe(true)
    })

    it('should return false for non-number inputs', () => {
        expect(isNumber('123')).toBe(false)
        expect(isNumber(true)).toBe(false)
        expect(isNumber(undefined)).toBe(false)
        expect(isNumber(null)).toBe(false)
        expect(isNumber({})).toBe(false)
    })

    it('should return false for NaN', () => {
        expect(isNumber(NaN)).toBe(false)
    })
})

describe(isBoolean, () => {
    it('should return true for boolean inputs', () => {
        expect(isBoolean(true)).toBe(true)
        expect(isBoolean(false)).toBe(true)
    })

    it('should return false for non-boolean inputs', () => {
        expect(isBoolean(123)).toBe(false)
        expect(isBoolean('true')).toBe(false)
        expect(isBoolean(undefined)).toBe(false)
        expect(isBoolean(null)).toBe(false)
        expect(isBoolean({})).toBe(false)
    })
})

describe(isBigInt, () => {
    it('should return true for bigint inputs', () => {
        expect(isBigInt(BigInt(123))).toBe(true)
        expect(isBigInt(BigInt('12345678901234567890'))).toBe(true)
    })

    it('should return false for non-bigint inputs', () => {
        expect(isBigInt(123)).toBe(false)
        expect(isBigInt('123')).toBe(false)
        expect(isBigInt(undefined)).toBe(false)
        expect(isBigInt(null)).toBe(false)
        expect(isBigInt({})).toBe(false)
    })
})

describe(isPrimitive, () => {
    it('should return true for primitive inputs', () => {
        expect(isPrimitive(true)).toBe(true)
        expect(isPrimitive(123)).toBe(true)
        expect(isPrimitive('hello')).toBe(true)
        expect(isPrimitive(null)).toBe(true)
        expect(isPrimitive(undefined)).toBe(true)
        expect(isPrimitive(BigInt(123))).toBe(true)
        expect(isPrimitive(Symbol())).toBe(true)
    })

    it('should return false for non-primitive inputs', () => {
        expect(isPrimitive({})).toBe(false)
        expect(isPrimitive([])).toBe(false)
        expect(
            isPrimitive(() => {
                /**/
            })
        ).toBe(false)
    })
})

describe(isFinite, () => {
    it('should return true for finite numbers', () => {
        expect(isFinite(1)).toBe(true)
        expect(isFinite(-1)).toBe(true)
    })

    it('should return false for infinite and NaN values', () => {
        expect(isFinite(Infinity)).toBe(false)
        expect(isFinite(-Infinity)).toBe(false)
        expect(isFinite(NaN)).toBe(false)
    })
})
