import { isFunc } from './func'
import { test, expect } from '@jest/globals'

test('isFunc()', () => {
    expect(isFunc(() => 'foo')).toBe(true)
})
