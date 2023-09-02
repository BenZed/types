import { isKeyed } from './is-keyed'

import { it, expect, describe } from '@jest/globals'

describe(isKeyed.name, () => {
    it('should return true when the object has the expected keys', () => {
        const person: unknown = {
            name: 'John',
            age: 30,
            occupation: 'Programmer'
        }
        expect(isKeyed('name', 'age', 'occupation')(person)).toBe(true)

        const car: unknown = {
            make: 'Toyota',
            model: 'Corolla',
            year: 2020,
            color: 'white'
        }
        expect(isKeyed('make', 'model', 'year', 'color')(car)).toBe(true)
    })

    it('works on symbols', () => {
        const $$key = Symbol('key')

        const obj = { [$$key]: undefined }

        expect(isKeyed($$key)(obj)).toBe(true)
    })

    it('should return false when the object is missing one or more keys', () => {
        const person: unknown = { name: 'John', age: 30 }
        expect(isKeyed('name', 'age', 'occupation')(person)).toBe(false)

        const car: unknown = { make: 'Toyota', model: 'Corolla', year: 2020 }
        expect(isKeyed('make', 'model', 'year', 'color')(car)).toBe(false)
    })

    it('should return false when the input is not an object', () => {
        const notAnObject: unknown = 'hello world'
        expect(isKeyed('name', 'age', 'occupation')(notAnObject)).toBe(false)
    })
})
