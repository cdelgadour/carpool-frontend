export interface LoginResponse {
    data: {
        access: string,
        refresh: string
    },
    status: number,
    statusText: string
}