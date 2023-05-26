export interface Brand {
    id: number,
    name: string
}

export interface Model {
    id: number,
    name: string,
    brand: number
}

export interface VehicleRead {
    plate: string,
    year: string,
    model: Model,
    brand: Brand,
    created_at: string,
    color: string,
    seats: string
}

export interface VehicleWrite {
    plate: string,
    year: string,
    model: string,
    brand: string,
    created_at: string,
    color: string,
    seats: string
}

export interface LoggedInUser {
    id: string,
    driver: string,
    email: string
}

export interface Rate {
    trip_detail: string,
    rate: string,
    comment: string,
    date: string,
    status: string
}

export interface Payments {
    amount: string
    payment_date: string
}