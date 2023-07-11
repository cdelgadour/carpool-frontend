import { createStore, type ActionContext } from 'vuex'
import type { Brand, LoggedInUser, Model, VehicleWrite, VehicleRead, Rate, Payments, DriverRequests, NamedChoices, Trip, TripDetail } from './models/CommonModels';
import APIService from './service';
import DriverService from './services/vehicle.service';

const requestDecisions: NamedChoices[] = [
    {
        id: '1',
        name: 'Rechazado'
    },
    {
        id: '2',
        name: 'Aprobado'
    },
]

const TripStatus: NamedChoices[] = [
    {
        id: '1',
        name: 'Pendiente'
    },
    {
        id: '2',
        name: 'En curso'
    },
    {
        id: '3',
        name: 'Finalizado'
    },
    {
        id: '5',
        name: 'Cancelado'
    },
]

interface AppState {
    brands: Brand[],
    models: Model[],
    user: LoggedInUser,
    vehiclesWrite: VehicleWrite[],
    vehiclesRead: VehicleRead[],
    driverRates: Rate[],
    driverPayments: Payments[],
    driverRequests: DriverRequests[],
    driverDecisionChoices: NamedChoices[]
    interruptGet: boolean,
    trips: Trip[],
    loadedCreateRouteMap: boolean,
    tripDetail: TripDetail[]
}

const initialState = {
    brands: [],
    models: [],
    user: {} as LoggedInUser,
    vehiclesWrite: [],
    vehiclesRead: [],
    driverRates: [],
    driverPayments: [],
    driverRequests: [],
    driverDecisionChoices: requestDecisions,
    interruptGet: false,
    trips: [],
    loadedCreateRouteMap: false,
    tripDetail: []
} as AppState

const apiService = new APIService();
const driverService = new DriverService();

export default createStore({
    state() {
        return {...initialState}
    },
    getters: {
        getVehicleBrands(state) : Brand[] {
            return state.brands
        },
        getVehicleModels(state) : Model[] {
            return state.models
        },
        getUserVehicles(state) : VehicleRead[] {
            return state.vehiclesRead
        },
        getUserData(state) : LoggedInUser {
            return state.user
        },
        getDriverRates(state) : Rate[] {
            return state.driverRates
        },
        getDriverPayments(state) : Payments[] {
            return state.driverPayments
        },
        getDriverRequests(state) : DriverRequests[] {
            return state.driverRequests
        },
        getDriverDecisionChoices(state) : NamedChoices[] {
            return state.driverDecisionChoices
        },
        getDriverTrips(state) : Trip[] {
            return state.trips
        },
        getTripStatus() : NamedChoices[] {
            return TripStatus
        },
        getIsDriver(state) : boolean {
            return state.user.driver != "" 
        },
    },
    mutations: {
        RESET_STATE(state: AppState) {
            Object.assign(state, {...initialState})
        },
        SET_VEHICLE_BRANDS(state: AppState, data: Brand[]) {
            state.brands = data
        },
        SET_VEHICLE_MODELS(state: AppState, data: Model[]) {
            state.models = data
        },
        SET_LOADED_CREATE_ROUTE_MAP(state: AppState) {
            state.loadedCreateRouteMap = true;
        },
        GET_USER_VEHICLES(state: AppState, data: VehicleRead[]) {
            state.vehiclesRead = data
        },
        ADD_NEW_VEHICLE(state: AppState, data: VehicleWrite) {
            state.vehiclesWrite.push(data)
        },
        SET_TRIPS(state: AppState, data: Trip[]) {
            state.trips = data
        },
        ADD_NEW_TRIP(state: AppState, data: Trip) {
            state.trips.push(data)
        },
        SET_TRIP_DETAIL(state: AppState, data: TripDetail[]) {
            state.tripDetail = data
        },
        ADD_NEW_TRIP_DETAIL(state: AppState, data: TripDetail) {
            state.tripDetail.push(data)
        },
        DELETE_TRIP(state: AppState, id: number) {
            state.trips = state.trips.filter((x) => x.id != id)
        },
        UPDATE_VEHICLE(state: AppState, data: VehicleWrite) {
            state.vehiclesWrite.push(data)
        },
        DELETE_VEHICLE(state: AppState, data: string) {
            state.vehiclesWrite.filter((x) => x.id != data)
        },
        SET_USER_DATA(state: AppState, data: LoggedInUser) {
            state.user = data
        },
        GET_DRIVER_RATES(state: AppState, data: Rate[]) {
            state.driverRates = data
        },
        GET_DRIVER_PAYMENTS(state: AppState, data: Payments[]) {
            state.driverPayments = data
        },
        GET_DRIVER_REQUESTS(state: AppState, data: DriverRequests[]) {
            state.driverRequests = data
        },
        SET_INTERRUPT_LOAD(state: AppState) {
            state.interruptGet = !state.interruptGet
        }
    },
    actions: {
        async getUserData(context: ActionContext<AppState, AppState>) {
            try {
                const response = await apiService.get('api/me/');    
                context.commit('SET_USER_DATA', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getTwoFactor(context: ActionContext<AppState, AppState>) {
            try {
                const response = await apiService.post('api/users/two_factor/', {});    
                return response.data
            } catch (error) {
                console.log(error)
            }
        },
        async fetchBrands(context: ActionContext<AppState, AppState>) {
            try {
                const response = await apiService.get('api/vehicles/brands/');    
                context.commit('SET_VEHICLE_BRANDS', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async fetchModels(context: ActionContext<AppState, AppState>) {
            try {
                const response = await apiService.get('api/vehicles/models/');    
                context.commit('SET_VEHICLE_MODELS', response.data)
            } catch (error) {
                console.log(error)
            }
        },
        async getUserVehicles(context: ActionContext<AppState, AppState>) {
            const driverId = context.state.user.driver;

            try {
                let response = await apiService.get(`api/driver/${driverId}/vehicles/`)
                context.commit('GET_USER_VEHICLES', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async createVehicle(context: ActionContext<AppState, AppState>, data: VehicleWrite) {
            try {
                let response = await apiService.post('api/vehicles/', data)
                context.commit('ADD_NEW_VEHICLE', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async createTrip(context: ActionContext<AppState, AppState>, data: Trip) {
            try {
                let response = await apiService.post('api/trips/', data)
                context.commit('ADD_NEW_TRIP', response.data)
                return true
            } catch (error) {
                console.log(error)
                return false
            }            
        },
        async createTripDetail(context: ActionContext<AppState, AppState>, data: TripDetail) {
            try {
                let response = await apiService.post('api/trips-detail/', data)
                context.commit('ADD_NEW_TRIP_DETAIL', response.data)
                return true
            } catch (error) {
                console.log(error)
                return false
            }            
        },
        async updateVehicle(context: ActionContext<AppState, AppState>, data: VehicleWrite) {
            try {
                let response = await apiService.patch('api/vehicles/', data, data.id)
                context.commit('UPDATE_VEHICLE', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async deleteVehicle(context: ActionContext<AppState, AppState>, data: string) {
            try {
                let response = await apiService.delete('api/vehicles/', data)
                context.commit('DELETE_VEHICLE', data)

            } catch (error) {
                console.log(error)
            }
        },
        async requestAsDriver(context: ActionContext<AppState, AppState>, data: VehicleWrite) {
            const userId = context.state.user.id;

            try {
                let response = await apiService.get(`api/users/${userId}/driver_request/`)
            } catch (error) {
                console.log(error)
            }            
        },
        async getDriverRates(context: ActionContext<AppState, AppState>) {
            const driverId = context.state.user.driver;

            try {
                let response = await apiService.get(`api/driver/${driverId}/rates/`)
                context.commit('GET_DRIVER_RATES', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async getDriverPayments(context: ActionContext<AppState, AppState>) {
            const driverId = context.state.user.driver;
            
            try {
                let response = await apiService.get(`api/driver/${driverId}/payments/`)
                context.commit('GET_DRIVER_PAYMENTS', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async getDriverTrips(context: ActionContext<AppState, AppState>) {
            const driverId = context.state.user.driver;
            
            try {
                let response = await apiService.get(`api/trips/`)
                context.commit('SET_TRIPS', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async getDriverRequests(context: ActionContext<AppState, AppState>) {
            try {
                let response = await apiService.get(`api/admin/driver-requests/`)
                context.commit('GET_DRIVER_REQUESTS', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async decideOnRequest(context: ActionContext<AppState, AppState>, data: { id: string, decision: string }) {
            try {
                let response = await apiService.patch(`api/admin/driver-requests/`, { decision: data.decision  }, data.id)
                const existingRequest = context.getters.getDriverRequests.filter((req: DriverRequests) => req.id != data.id);
                existingRequest.push(response.data);
                context.commit('GET_DRIVER_REQUESTS', existingRequest);
            } catch (error) {
                console.log(error)
            }            
        }
    }
})