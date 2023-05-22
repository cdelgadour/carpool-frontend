export interface Brand {
    id: number,
    name: string
}

export interface Model {
    id: number,
    name: string,
    brand: string
}

export interface Vehicle {
    plate: string,
    year: string,
    model: string,
    brand: string
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