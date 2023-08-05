import { isFunc, Class, AbstractClass, isObject } from './guards'

//// EsLint ////
/* eslint-disable 
    @typescript-eslint/no-explicit-any,
*/

//// Types ////

interface StaticTypeGuard<I extends object = object> {
    is(input: unknown): input is I
}

type Struct<I extends object = object, A extends any[] = any> = Class<I, A> &
    StaticTypeGuard<I>

type AbstractStruct<
    I extends object = object,
    A extends any[] = any
> = AbstractClass<I, A> & StaticTypeGuard<I>

//// Helper ////

function isStruct(c: unknown): c is Struct
function isStruct<I extends object = object, A extends any[] = any>(
    c: Class<I, A>
): c is Struct<I, A>
function isStruct<I extends object = object, A extends any[] = any>(
    c: AbstractClass<I, A>
): c is AbstractStruct<I, A>
function isStruct(c: unknown): boolean {
    return isFunc(c) && hasStaticTypeGuard(c)
}

function hasStaticTypeGuard<I extends object = object>(
    i: unknown
): i is StaticTypeGuard<I> {
    return isObject(i) && 'is' in i && isFunc(i.is)
}

//// Decorator ////

/**
 * Decorate a class as a 'struct'
 *
 * A structural class overrides it's `instanceof` operator with a static
 * `is` type guard method.
 *
 * In this way, structs achieve type
 */
function struct<I extends Struct | AbstractStruct>(
    Struct: I,
    context: ClassDecoratorContext
) {
    // Validation
    context.addInitializer(() => {
        if (context.kind !== 'class')
            throw new Error(
                `${struct.name} may only be used to decorate classes.`
            )

        if (!isFunc(Struct.is))
            throw new Error(
                `${struct.name}s require a static type guard property named ${
                    'is' satisfies keyof I
                }`
            )
    })

    // Add hasInstance override
    Object.defineProperty(Struct, Symbol.hasInstance, {
        value(input: unknown) {
            return (this as Struct).is(input)
        }
    })
}

//// Exports ////

export {
    struct,
    isStruct,
    Struct,
    AbstractStruct,
    StaticTypeGuard,
    hasStaticTypeGuard
}
