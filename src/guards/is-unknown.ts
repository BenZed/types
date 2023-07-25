export const isUnknown = (input: unknown): input is unknown =>
    void input ?? true
