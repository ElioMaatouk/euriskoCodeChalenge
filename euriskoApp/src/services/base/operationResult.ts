export interface Result<T> {
    data: T | undefined;
    success: boolean;
    error: string | undefined;
}

export function success<T>(data: T | undefined): Result<T> {
    return {
        data,
        success: true,
        error: undefined
    };
}

export function failed<T>(error: string | undefined): Result<T> {
    return {
        data: undefined,
        success: false,
        error,
    };
}

export default {
    success,
    failed
};