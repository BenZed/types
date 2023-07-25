export const isPromise = <T>(input: unknown): input is Promise<T> =>
    input instanceof Promise

export const isAsync = isPromise //
