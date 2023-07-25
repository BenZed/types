import { defined } from './defined'
import { it, expect } from '@jest/globals'

const output = defined({ foo: 'string', bar: undefined })

it('defined()', () => {
    expect(output).toEqual({ foo: 'string' })
})

it('Defined', () => {
    output satisfies { foo: string }
})
