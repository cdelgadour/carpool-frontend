export interface LoginResponse {
    data: {
        access: string,
        refresh: string
    },
    status: number,
    statusText: string
}

export default class BaseServiceResponse<T> {
    constructor(
        public statusCode: number,
        public entity: T,
        public message: string
    ) {}
}