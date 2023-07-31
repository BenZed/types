import { isArrayOf, isShape } from '.'

import { isNumber, isString } from '../primitive'

import { test, it, expect, describe } from '@jest/globals'

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

    test('explicit typing', () => {
        class Vector {
            x = 0
            y = 0
        }

        const isVector = isShape<Vector>({
            x: isNumber,
            y: isNumber
        })

        expect(isVector({ x: 0, y: 0 })).toBe(true)

        const vJson = { x: 0, y: 0 }
        if (isVector(vJson)) vJson satisfies Vector
    })

    test('catches symbols in shapes', () => {
        const key = Symbol('key')

        const hasSymbolicKey = isShape({
            name: isString,
            [key]: isNumber
        })

        expect(hasSymbolicKey({ [key]: 0, name: 'zero' })).toBe(true)
        expect(hasSymbolicKey({ name: 'one' })).toBe(false)
    })
})
