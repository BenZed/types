import { isPromise } from 'util/types'
import { TypeGuard } from '../func'
import {
    isArray,
    isArrayLike,
    isArrayOf,
    isArrayLikeOf,
    isRecord,
    isObject,
    isIterable,
    isRecordOf,
    isUnknown,
    isShape,
    isTuple,
    isUnion,
    isIntersection,
    isOptional,
    isKeyed
} from '../guards'

import { isBoolean, isNumber, isString, isSymbol } from '../primitive'

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

describe(isRecordOf.name, () => {
    test('returns true when given a record of the specified type', () => {
        const record = { a: 'foo', b: 'bar', c: 'baz' }
        expect(isRecordOf(isString)(record)).toBe(true)
    })

    test('returns false when given a record with invalid values', () => {
        const record = { a: 'foo', b: 42, c: 'baz' }
        expect(isRecordOf(isString)(record)).toBe(false)
    })

    test('returns false when given a non-record input', () => {
        const input = 'foo'
        expect(isRecordOf(isString)(input)).toBe(false)
    })

    it('should return true for a record with string keys and array values of numbers', () => {
        const input = { a: [1, 2, 3], b: [4, 5, 6] }
        const isNumberArray = isArrayOf(isNumber)
        const isRecordOfNumberArray = isRecordOf(isNumberArray)

        expect(isRecordOfNumberArray(input)).toBe(true)
    })
})

describe(isPromise.name, () => {
    it('should return true if input is a promise', () => {
        expect(isPromise(Promise.resolve())).toBe(true)
        expect(
            isPromise(
                new Promise(() => {
                    /**/
                })
            )
        ).toBe(true)
    })

    it('should return false if input is not a promise', () => {
        expect(isPromise({})).toBe(false)
        expect(isPromise(null)).toBe(false)
        expect(isPromise(undefined)).toBe(false)
    })
})

describe(isUnknown.name, () => {
    it('should always return true', () => {
        expect(isUnknown({})).toBe(true)
        expect(isUnknown(null)).toBe(true)
        expect(isUnknown(undefined)).toBe(true)
    })
})

describe(isShape.name, () => {
    it('should pass if the input object matches the expected shape', () => {
        const testObject = {
            name: 'John Doe',
            age: 42,
            email: 'johndoe@example.com'
        }

        const testTypeGuard = isShape({
            name: isString,
            age: isNumber,
            email: isString
        })

        expect(testTypeGuard(testObject)).toBe(true)
    })

    it('should fail if the input object does not match the expected shape', () => {
        const testObject = {
            name: 'John Doe',
            age: 42,
            email: 12345
        }

        const testTypeGuard = isShape({
            name: isString,
            age: isNumber,
            email: isString
        })

        expect(testTypeGuard(testObject)).toBe(false)
    })

    test('isShape returns true for an object with the correct shape', () => {
        const input = { name: 'John', age: 30, hobbies: ['reading', 'writing'] }
        const shape = {
            name: isString,
            age: isNumber,
            hobbies: isArrayOf(isString)
        }
        expect(isShape(shape)(input)).toBe(true)
    })
})

describe(isTuple.name, () => {
    type MyTuple = [string, number, { foo: string; bar: number }[]]

    const isMyTuple: TypeGuard<MyTuple> = isTuple(
        isString,
        isNumber,
        isArrayOf(isShape({ foo: isString, bar: isNumber }))
    )

    test('should return true for a valid tuple', () => {
        const tuple: MyTuple = ['hello', 42, [{ foo: 'world', bar: 23 }]]
        expect(isMyTuple(tuple)).toBe(true)
    })

    test('should return false for an invalid tuple', () => {
        // @ts-expect-error It's an invalid tuple
        const tuple: MyTuple = ['hello', 'world', [{ foo: 'world', bar: 23 }]]
        expect(isMyTuple(tuple)).toBe(false)
    })
})

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

describe(isIntersection.name, () => {
    test('returns true if the input satisfies all type guards in the intersection', () => {
        const guard1 = isShape({ a: isNumber })
        const guard2 = isShape({ b: isString })
        const guard3 = isShape({ c: isRecord })

        const input = {
            a: 42,
            b: 'hello',
            c: { d: true }
        }

        expect(isIntersection(guard1, guard2, guard3)(input)).toBe(true)
    })

    test('returns false if the input does not satisfy one of the type guards in the intersection', () => {
        const guard1 = isShape({ a: isNumber })
        const guard2 = isShape({ b: isString })
        const guard3 = isShape({ c: isRecord })

        const input = {
            a: 42,
            b: 'hello',
            c: 'world'
        }

        expect(isIntersection(guard1, guard2, guard3)(input)).toBe(false)
    })
})

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

describe(isKeyed.name, () => {
    it('should return true when the object has the expected keys', () => {
        const person: unknown = {
            name: 'John',
            age: 30,
            occupation: 'Programmer'
        }
        expect(isKeyed('name', 'age', 'occupation')(person)).toBe(true)

        const car: unknown = {
            make: 'Toyota',
            model: 'Corolla',
            year: 2020,
            color: 'white'
        }
        expect(isKeyed('make', 'model', 'year', 'color')(car)).toBe(true)
    })

    it('should return false when the object is missing one or more keys', () => {
        const person: unknown = { name: 'John', age: 30 }
        expect(isKeyed('name', 'age', 'occupation')(person)).toBe(false)

        const car: unknown = { make: 'Toyota', model: 'Corolla', year: 2020 }
        expect(isKeyed('make', 'model', 'year', 'color')(car)).toBe(false)
    })

    it('should return false when the input is not an object', () => {
        const notAnObject: unknown = 'hello world'
        expect(isKeyed('name', 'age', 'occupation')(notAnObject)).toBe(false)
    })
})
