import { isFunc, isClass } from './is-func'
import { test, expect } from '@jest/globals'

test(isFunc.name, () => {
    expect(isFunc(() => 'foo')).toBe(true)
    expect(isFunc('foo')).toBe(false)
})

test(isClass.name, () => {
    expect(isClass(() => 'foo')).toBe(false)
    expect(isClass('foo')).toBe(false)
    expect(isClass({})).toBe(false)
    expect(isClass(function () {})).toBe(false)

    const Ace = () => {}
    expect(!!Ace.prototype).toBe(false)
    expect(isClass(Ace)).toBe(false)

    class Base {}
    expect(isClass(Base)).toBe(true)

    function Case() {}
    expect(isClass(Case)).toBe(true)

    function race() {}
    expect(isClass(race)).toBe(false)

    class whoops {}
    expect(isClass(whoops)).toBe(false) // be warned
})
