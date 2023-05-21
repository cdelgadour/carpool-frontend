import axios from 'axios';
import { createStore, type ActionContext } from 'vuex'
import type { Brand, LoggedInUser, Model, Vehicle } from './models/CommonModels';
import APIService from './service';
import DriverService from './services/vehicle.service';

interface AppState {
    brands: Brand[],
    models: Model[],
    user: LoggedInUser,
    vehicles: Vehicle[]
}

const apiService = new APIService();
const driverService = new DriverService();

export default createStore({
    state() {
        return {
            brands: [],
            models: [],
            user: {} as LoggedInUser,
            vehicles: [] 
        } as AppState
    },
    getters: {
        getVehicleBrands(state) : Brand[] {
            return state.brands
        },
        getVehicleModels(state) : Model[] {
            return state.models
        },
        getUserVehicles(state) : Vehicle[] {
            return state.vehicles
        },
        getUserData(state) : LoggedInUser {
            return state.user
        },
    },
    mutations: {
        SET_VEHICLE_BRANDS(state: AppState, data: Brand[]) {
            state.brands = data
        },
        SET_VEHICLE_MODELS(state: AppState, data: Model[]) {
            state.models = data
        },
        GET_USER_VEHICLES(state: AppState, data: Vehicle[]) {
            state.vehicles = data
        },
        ADD_NEW_VEHICLE(state: AppState, data: Vehicle) {
            state.vehicles.push(data)
        },
        SET_USER_DATA(state: AppState, data: LoggedInUser) {
            state.user = data
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
            try {
                let response = await apiService.get('api/vehicles/')
                context.commit('GET_USER_VEHICLES', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
        async createVehicle(context: ActionContext<AppState, AppState>, data: Vehicle) {
            try {
                let response = await apiService.post('api/vehicles/', data)
                context.commit('ADD_NEW_VEHICLE', response.data)
            } catch (error) {
                console.log(error)
            }            
        },
    }
})