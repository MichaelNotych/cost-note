export interface BaseResponse {
    success: boolean;
    data?: any;
    error?: boolean;
    message?: string;
}