import { isPromise } from '.'

import { it, expect, describe } from '@jest/globals'

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
