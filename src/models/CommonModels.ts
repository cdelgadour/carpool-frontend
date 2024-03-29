export interface Brand {
    id: number,
    name: string
}

export interface Model {
    id: string,
    name: string,
    brand: number
}

export interface VehicleRead {
    id: string,
    plate: string,
    year: string,
    model: Model,
    brand: Brand,
    created_at: string,
    color: string,
    seats: string,
    default_vehicle: boolean
}

export interface VehicleWrite {
    id: string,
    plate: string,
    year: string,
    model: string,
    brand: string,
    created_at: string,
    color: string,
    seats: string,
    default_vehicle: boolean
}

export interface LoggedInUser {
    id: string,
    driver: string,
    email: string,
    driverRequest: string,
    is_admin: boolean
}

export interface DriverRequests {
    id: string,
    user: LoggedInUser,
    status: string,
    decision: string
}

export interface Trip {
    avaible_seats: number,
    comleted_at: string,
    created_at: string,
    created_by: number,
    driver: number,
    id: number,
    started_at: string,
    status: number,
    trip_type: number,
    updated_at: string,
    updated_by: number,
    scheduled_date: Date
}

export interface TripDetail {
    id: string,
    trip: string,
    pickup_place: any,
    destination: string
    preferences: string,
    code: string,
    input_code: Boolean,
    user: string
    amount_payed: Number,
    payment_date: Date,
    payment_status: Number
}

export interface Rate {
    trip: Trip,
    rate: string,
    comment: string,
    date: string,
    status: string,
    driver: number,
    id: number
}

export interface Payments {
    amount: string
    payment_date: string
}

export interface NamedChoices {
    id: string,
    name: string
}

export interface AddressSuggestionProperties {
    address: string,
    category: string,
    foursquare: string,
    landmark: boolean
}

export interface AddressSuggestion {
    center: number[],
    place_name: string;
    id: string,
    text: string,
    properties: AddressSuggestionProperties
}

export interface SelectedPoint {
    type: string,
    geometry: {
        coordinates: number[],
        type: string
    },
    properties: {
        id: string
    }
}

export interface Route {
    distance: number,
    duration: number,
    geometry: string
}