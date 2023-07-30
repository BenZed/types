import { isIntersection } from './is-intersection'

import { isNumber, isString } from '../primitive'

import { test, expect, describe } from '@jest/globals'
import { isShape } from './is-shape'
import { isRecord } from './is-record'

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
