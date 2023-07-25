import { it, test, expect, describe } from '@jest/globals'

import {
    isJson,
    isJsonArray,
    isJsonPrimitive,
    isJsonRecord,
    isJsonShape
} from './json'

import { isBoolean, isNumber, isString } from './primitive'

//// Tests ////

test('isJsonPrimitive', () => {
    expect(isJsonPrimitive('hello')).toBe(true)
    expect(isJsonPrimitive(42)).toBe(true)
    expect(isJsonPrimitive(true)).toBe(true)
    expect(isJsonPrimitive(false)).toBe(true)
    expect(isJsonPrimitive(null)).toBe(true)
})

test('isJsonPrimitive returns false for non-JSON primitives', () => {
    expect(isJsonPrimitive(Symbol())).toBe(false)
    expect(isJsonPrimitive(BigInt(123))).toBe(false)
    expect(isJsonPrimitive([])).toBe(false)
    expect(isJsonPrimitive({})).toBe(false)
    expect(isJsonPrimitive(undefined)).toBe(false)
})

describe('isJsonObject', () => {
    test('isJsonObject returns true for an object with string and number properties', () => {
        expect(isJsonRecord({ name: 'John', age: 30 })).toBe(true)
    })

    test('isJsonObject returns true for an object with string, number, boolean and null properties', () => {
        expect(
            isJsonRecord({
                name: 'John',
                age: 30,
                isMarried: true,
                address: null
            })
        ).toBe(true)
    })

    test('isJsonObject returns false for a non-object input', () => {
        expect(isJsonRecord('John')).toBe(false)
        expect(isJsonRecord(30)).toBe(false)
        expect(isJsonRecord(true)).toBe(false)
        expect(isJsonRecord(undefined)).toBe(false)
        expect(isJsonRecord(null)).toBe(false)
    })

    test('isJsonObject returns false for an array input', () => {
        expect(isJsonRecord([1, 2, 3])).toBe(false)
    })

    test('isJsonObject returns false for an object with non-json values', () => {
        expect(
            isJsonRecord({
                name: 'John',
                age: 30,
                isMarried: true,
                data: parseInt
            })
        ).toBe(false)
    })
})

describe('isJsonArray', () => {
    it('should return true for an empty array', () => {
        expect(isJsonArray([])).toBe(true)
    })

    it('should return true for an array of primitives', () => {
        expect(isJsonArray([1, 'two', true, null])).toBe(true)
    })

    it('should return true for an array of objects', () => {
        expect(isJsonArray([{ a: 1 }, { b: 'two' }, { c: true }])).toBe(true)
    })

    it('should return false for a non-array object', () => {
        expect(isJsonArray({ a: 1 })).toBe(false)
    })

    it('should return false for a non-array primitive', () => {
        expect(isJsonArray('not an array')).toBe(false)
    })

    it('should return false for null', () => {
        expect(isJsonArray(null)).toBe(false)
    })
})

test('isJson returns true for a JSON primitive', () => {
    expect(isJson('foo')).toBe(true)
    expect(isJson(123)).toBe(true)
    expect(isJson(true)).toBe(true)
    expect(isJson(null)).toBe(true)
})

test('isJson returns true for a JSON array', () => {
    expect(isJson(['foo', 123, true, null])).toBe(true)
    expect(isJson([{ foo: 'bar' }, { baz: 123 }])).toBe(true)
})

test('isJson returns true for a JSON object', () => {
    expect(isJson({ foo: 'bar', baz: 123 })).toBe(true)
    expect(isJson({ foo: ['bar', 'baz'] })).toBe(true)
})

test('isJson returns false for non-JSON objects', () => {
    expect(isJson(Symbol(''))).toBe(false)
    expect(
        isJson(function () {
            /**/
        })
    ).toBe(false)
    expect(isJson(/abc/)).toBe(false)
})

describe('isJsonShape', () => {
    const validJsonShape = {
        name: isString,
        age: isNumber,
        isAlive: isBoolean,
        hobbies: isJsonArray
    }

    const invalidJsonShape = {
        name: isString,
        age: isString,
        isAlive: isBoolean,
        hobbies: isJsonArray
    }

    it('returns true for valid json shape', () => {
        expect(
            isJsonShape(validJsonShape)({
                name: 'John',
                age: 30,
                isAlive: true,
                hobbies: ['reading', 'swimming']
            })
        ).toBe(true)
    })

    it('returns false for invalid json shape', () => {
        expect(
            isJsonShape(invalidJsonShape)({
                name: 'John',
                age: '30',
                isAlive: true,
                hobbies: [Symbol(), 'swimming']
            })
        ).toBe(false)
    })
})
