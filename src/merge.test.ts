import { append } from './merge'
import { it, expect, describe } from '@jest/globals'

//// Tests ////

describe('append', () => {
    it('mutates a', () => {
        const a = { foo: '100' }
        expect(append(a, {})).toBe(a)
    })

    it('adds types from b that are no on a', () => {
        const a = { foo: '100' }
        const b = { bar: 100 }
        const c = append(a, b)

        expect(c).toHaveProperty('bar', 100)
        c satisfies { foo: string; bar: number }
    })

    it('ignores types from b that are on a', () => {
        const a = { foo: 2 }
        const b = { foo: 'string' }
        const c = append(a, b)

        expect(c).toEqual({ foo: 2 })
        c satisfies { foo: number }
    })

    it('works with symbols', () => {
        const $$foo = Symbol('foo')
        const $$bar = Symbol('foo')

        const a = { [$$foo]: 1 }
        const b = { [$$bar]: 2 }

        const c = append(a, b)
        expect(c).toEqual({ [$$foo]: 1, [$$bar]: 2 })
        c satisfies { [$$foo]: number; [$$bar]: number }
    })
})
