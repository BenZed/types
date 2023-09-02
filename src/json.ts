import { TypeGuard, TypeOf } from './guards'
import {
    isArrayOf,
    isIntersection,
    isRecordOf,
    isShapeOf,
    isUnion
} from './guards'
import { Infer } from './infer'
import { isBoolean, isEqual, isNumber, isString } from './primitive'

//// Types ////

export type JsonPrimitive = null | string | number | boolean

export type JsonRecord = { [k: string]: Json }

export type JsonArray = Json[]

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
    isIntersection(isJsonRecord, isShapeOf(shape)) as TypeGuard<
        JsonShapeOutput<T>
    >
