import { createStore, type ActionContext } from 'vuex'
import type { Brand, Model, Vehicle } from './models/CommonModels';
import APIService from './service';

interface AppState {
    brands: Brand[],
    models: Model[]
}

const apiService = new APIService();

export default createStore({
    state() {
        return {
            brands: [],
            models: []
        } as AppState
    },
    getters: {
        getVehicleBrands(state) : Brand[] {
            return state.brands
        },
        getVehicleModels(state) : Model[] {
            return state.models
        }
    },
    mutations: {
        SET_VEHICLE_BRANDS(state: AppState, data: Brand[]) {
            state.brands = data
        },
        SET_VEHICLE_MODELS(state: AppState, data: Model[]) {
            state.models = data
        }
    },
    actions: {
        async getUserData(context: ActionContext<AppState, AppState>) {
            try {
                const response = await apiService.get('users/data/');    
                console.log(response);
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
        async createVehicle(context: ActionContext<AppState, AppState>, data: Vehicle) {
            try {
                const response = await apiService.post('api/vehicles/', data);    
                console.log(response.data);
                // context.commit('SET_VEHICLE_MODELS', response.data)
            } catch (error) {
                console.log(error)
            }
        },
    }
})