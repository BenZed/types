import { isFunc, Class, AbstractClass } from './guards'

//// Types ////

interface StaticTypeGuard {
    is(input: unknown): input is object
}

type Struct = Class & StaticTypeGuard
type AbstractStruct = AbstractClass & StaticTypeGuard

//// Helper ////

function isStruct(c: Class): c is Struct
function isStruct(c: AbstractClass): c is AbstractStruct
function isStruct(c: Class | AbstractClass): boolean {
    return isFunc(c) && 'is' in c && isFunc(c.is)
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

export { struct, isStruct, StaticTypeGuard, Struct, AbstractStruct }
