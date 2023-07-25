import { Empty, isEmpty } from './empty'

import { it, expect } from '@jest/globals'

it('isEmpty', () => {
    expect(isEmpty({})).toBe(true)
})

it('is not empty', () => {
    expect(isEmpty({ foo: 'bar' })).toBe(false)
})

it('Empty type', () => {
    const value: unknown = null
    if (isEmpty(value)) value satisfies Empty
})
