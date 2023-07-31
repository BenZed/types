import { isArrayOf, isShape, isTuple } from '.'

import { isNumber, isString } from '../primitive'

import { test, expect, describe } from '@jest/globals'

describe(isTuple.name, () => {
    type MyTuple = [string, number, { foo: string; bar: number }[]]

    const isMyTuple = isTuple(
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

    test('explicit type', () => {
        type Range = [number, number]

        const isRange = isTuple<Range>(isNumber, isNumber)
        expect(isRange([1, 1])).toBe(true)
    })
})
