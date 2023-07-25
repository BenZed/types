import { TypeGuard, TypeOf } from './func'
import {
    isArrayOf,
    isIntersection,
    isRecordOf,
    isShape,
    isUnion
} from './guards'
import { Infer } from './infer'
import { nil } from './nil'
import { isBoolean, isEqual, isNumber, isString } from './primitive'

//// Types ////

export type JsonPrimitive = null | string | number | boolean

export type JsonRecord =
    | { [k: string]: Json | nil }
    | { readonly [k: string]: Json | nil }

export type JsonArray = Json[] | readonly Json[]

export type Json = JsonPrimitive | JsonArray | JsonRecord

export type JsonShapeInput = Record<string, TypeGuard<unknown>>
export type JsonShapeOutput<T extends JsonShapeInput> = Infer<
    {
        [K in keyof T]: TypeOf<T[K]>
    },
    JsonRecord
>

//// Guards ////

export const isJsonPrimitive: (input: unknown) => input is JsonPrimitive =
    isUnion(isString, isNumber, isBoolean, isEqual(null))

export const isJsonRecord = (input: unknown): input is JsonRecord =>
    isRecordOf(isJson)(input)

export const isJsonArray = (input: unknown): input is JsonArray =>
    isArrayOf(isJson)(input)

export const isJson: (input: unknown) => input is Json = isUnion(
    isJsonArray,
    isJsonRecord,
    isJsonPrimitive
)

export const isJsonShape = <T extends JsonShapeInput>(
    shape: T
): TypeGuard<JsonShapeOutput<T>> =>
    isIntersection(isJsonRecord, isShape(shape)) as TypeGuard<
        JsonShapeOutput<T>
    >
