import { isArray, isArrayLike, isArrayOf, isArrayLikeOf } from '.'

import { isNumber, isString, isSymbol } from '../primitive'

import { test, it, expect, describe } from '@jest/globals'

describe(isArray.name, () => {
    it('should check if array', () => {
        expect(isArray([1, 2, 3])).toBe(true)
    })
    it('should check if not array', () => {
        expect(isArray({ a: 1, b: 2 })).toBe(false)
    })
    it('should check if array like', () => {
        expect(isArrayLike('test')).toBe(true)
    })
    it('should check if not array like', () => {
        expect(isArrayLike(NaN)).toBe(false)
    })
})

describe(isArrayOf.name, () => {
    test('valid array of numbers should pass', () => {
        const arr = [1, 2, 3]
        expect(isArrayOf(isNumber)(arr)).toBe(true)
    })

    test('valid array of strings should pass', () => {
        const arr = ['foo', 'bar', 'baz']
        expect(isArrayOf(isString)(arr)).toBe(true)
    })

    test('invalid array of numbers should fail', () => {
        const arr = [1, 2, '3']
        expect(isArrayOf(isNumber)(arr)).toBe(false)
    })

    test('invalid array of strings should fail', () => {
        const arr = ['foo', 'bar', 42]
        expect(isArrayOf(isString)(arr)).toBe(false)
    })

    test('empty array should pass', () => {
        const arr: number[] = []
        expect(isArrayOf(isNumber)(arr)).toBe(true)
    })

    test('non-array input should fail', () => {
        expect(isArrayOf(isNumber)('not an array')).toBe(false)
    })

    it('should check if array of type', () => {
        const isNumberArray = isArrayOf(isNumber)
        expect(isNumberArray([1, 2, 3])).toBe(true)
    })
    it('should check if not array of type', () => {
        const isNumberArray = isArrayOf(isNumber)
        expect(isNumberArray(['foo', 'bar'])).toBe(false)
    })
    it('should check if array like of type', () => {
        const isSymbolArrayLike = isArrayLikeOf(isSymbol)
        expect(isSymbolArrayLike(Object.keys(Symbol()))).toBe(true)
    })
    it('should check if not array like of type', () => {
        const isSymbolArrayLike = isArrayLikeOf(isSymbol)
        expect(isSymbolArrayLike(Object.keys('test'))).toBe(false)
    })
})

describe(isArrayLikeOf.name, () => {
    it('should return true for an array-like object that is a string', () => {
        const input = 'hello world'
        const typeGuard = isString
        expect(isArrayLikeOf(typeGuard)(input)).toBe(true)
    })

    it('should return true for an array-like object that contains only strings', () => {
        const input = ['hello', 'world']
        const typeGuard = isString
        expect(isArrayLikeOf(typeGuard)(input)).toBe(true)
    })

    it('should return false for an array-like object that contains a non-string value', () => {
        const input = ['hello', 42]
        const typeGuard = isString
        expect(isArrayLikeOf(typeGuard)(input)).toBe(false)
    })

    it('should return false for an object that is not array-like', () => {
        const input = { foo: 'bar' }
        const typeGuard = isString
        expect(isArrayLikeOf(typeGuard)(input)).toBe(false)
    })

    test('should return true if input is an array-like plain object of strings', () => {
        const input = { 0: 'foo', 1: 'bar', length: 2 }
        const result = isArrayLikeOf(isString)(input)
        expect(result).toBe(true)
    })
})
