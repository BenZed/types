import { TypeGuard } from './is-func'
import { isGenericObject } from '../generic'

//// Main ////

export const isRecord = <K extends string | number | symbol, V = unknown>(
    i: unknown
): i is Record<K, V> => isGenericObject(i)

// TODO add key type guard
export const isRecordOf =
    <K extends string | number | symbol, V>(
        type: TypeGuard<V>
    ): TypeGuard<Record<K, V>> =>
    (i: unknown): i is Record<K, V> => {
        if (!isRecord(i)) return false

        for (const k in i) {
            if (!type(i[k])) return false
        }

        return true
    }
