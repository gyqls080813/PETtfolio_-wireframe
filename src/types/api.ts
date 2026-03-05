/**
 * Base formatting for API responses wrappers.
 */
export interface BaseResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: {
        code: string;
        details: unknown;
    };
}

/**
 * Standard pagination request/response definition
 */
export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResponse<T> extends BaseResponse<T[]> {
    total: number;
    page: number;
    limit: number;
}
