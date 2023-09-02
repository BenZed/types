import { isNumber, isShapeOf, isString } from '.'

import { hasStaticTypeGuard, isStruct, struct } from './struct'

import { test, expect, describe } from '@jest/globals'

//// Tests ////

@struct
class Vector {
    static readonly is = isShapeOf<Vector>({
        x: isNumber,
        y: isNumber
    })

    x = 0
    y = 0
}

describe('instanceof override', () => {
    test('any object fulfilling the contract is an instance', () => {
        const vectorJson = {
            x: 1,
            y: 1
        }
        expect(vectorJson instanceof Vector).toBe(true)
    })
})

test('decorated classes must have is method', () => {
    expect(() => {
        // @ts-expect-error Must have 'is' type guard
        @struct
        class NotAStruct {}
        void NotAStruct
    }).toThrow('require a static type guard')
})

test(isStruct.name, () => {
    class Foo {}
    expect(isStruct(Vector)).toBe(true)
    expect(isStruct(Foo)).toBe(false)
})

test(hasStaticTypeGuard.name, () => {
    class Bar {}

    const obj = { is: isShapeOf({ boo: isString }) }

    expect(hasStaticTypeGuard(Vector)).toBe(true)
    expect(hasStaticTypeGuard(Bar)).toBe(false)
    expect(hasStaticTypeGuard(obj)).toBe(true)
})
