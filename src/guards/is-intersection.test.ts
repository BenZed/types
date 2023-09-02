import { isIntersection } from './is-intersection'

import { isNumber, isString } from '../primitive'

import { test, expect, describe } from '@jest/globals'
import { isShapeOf } from './is-shape-of'
import { isRecord } from './is-record'

describe(isIntersection.name, () => {
    test('returns true if the input satisfies all type guards in the intersection', () => {
        const guard1 = isShapeOf({ a: isNumber })
        const guard2 = isShapeOf({ b: isString })
        const guard3 = isShapeOf({ c: isRecord })

        const input = {
            a: 42,
            b: 'hello',
            c: { d: true }
        }

        expect(isIntersection(guard1, guard2, guard3)(input)).toBe(true)
    })

    test('returns false if the input does not satisfy one of the type guards in the intersection', () => {
        const guard1 = isShapeOf({ a: isNumber })
        const guard2 = isShapeOf({ b: isString })
        const guard3 = isShapeOf({ c: isRecord })

        const input = {
            a: 42,
            b: 'hello',
            c: 'world'
        }

        expect(isIntersection(guard1, guard2, guard3)(input)).toBe(false)
    })
})
