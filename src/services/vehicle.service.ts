import type { Vehicle } from "@/models/CommonModels"
import APIService from "@/service"

export default class DriverService extends APIService {
    public CreateVehicle(data: Vehicle) {
        return this.post<Vehicle, Vehicle>('api/vehicles/', data)
    }
}