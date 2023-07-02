<template>
  <div class="card shadow-sm p-4">
    <div class="row mb-3">
      <div class="col-6">
        <button class="btn btn-outline-success btn-sm" @click="goBack">
          <fa :icon="['fas', 'arrow-left']" />
        </button>
      </div>
    </div>
    <h3 class="text-center mb-4">{{ buttonMsg == 'Registrar' ? 'Registro de Vehículo' : 'Actualizar Vehículo'}}</h3>
    <form @submit.prevent="register">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="m-1 mt-0">
              <label class="form-label">Placa</label>
              <input class="form-control" v-model="vehicle.plate" @input="convertToUpperCase" type="text" :disabled="buttonMsg === 'Actualizar'">
              <span class="text-danger" v-if="displayFieldError && v$.vehicle.plate.$invalid">La placa debe ser de 7
                caracteres.</span>
            </div>
            <div class="m-1">
              <label class="form-label">Marca</label>
              <select class="form-control" v-model="vehicle.brand" placeholder="Selecciona la marca del Vehiculo">
                <option v-for="brand in brands" :value="brand.id" :key="brand.id">
                  {{ brand.name }}
                </option>
              </select>
              <span class="text-danger" v-if="displayFieldError && v$.vehicle.brand.$invalid">Selecciona una marca.</span>

              <div class="m-1">
                <label class="form-label">Modelo</label>
                <select class="form-control" v-model="vehicle.model" placeholder="Selecciona la marca del Vehiculo">
                  <option v-for="model in selectedModels" :value="model.id" :key="model.id">
                    {{ model.name }}
                  </option>
                </select>
                <span class="text-danger" v-if="displayFieldError && v$.vehicle.model.$invalid">Seleccionar un
                  modelo.</span>
              </div>

            </div>

          </div>
          <div class="col-md-6 ">

            <div class="m-1">
              <label class="form-label">Año</label>
              <input class="form-control" v-model="vehicle.year" type="text">
              <span class="text-danger" v-if="displayFieldError && v$.vehicle.year.$invalid">Favor escribir un año válido
                a partir del 1999 (YYYY)</span>
            </div>

            <div class="m-1">
              <label class="form-label" for="color">Color</label>
              <select class="form-control" id="color" name="color" v-model="vehicle.color"
                style="max-height: 200px; overflow-y: auto;">
                <option v-for="(colorName) in colorOptions" :key="colorName">{{ colorName }}
                </option>
              </select>
              <span class="text-danger" v-if="displayFieldError && v$.vehicle.color.$invalid">Please select a valid
                color.</span>
            </div>

            <div class="m-1">
              <label class="form-label">Cantidad de asientos</label>
              <input class="form-control" v-model="vehicle.seats" type="number">
              <span class="text-danger" v-if="displayFieldError && v$.vehicle.seats.$invalid">Campo requerido.</span>
            </div>

            <div class="m-1 mt-3">
              <div class="form-check">
                <input class="form-check-input" v-model="vehicle.default_vehicle" type="checkbox" id="check1" name="option1" value="something" checked>
                <label class="form-check-label">Vehículo por defecto</label>
              </div>
            </div>

          </div>
          <div class="d-flex flex-row-reverse mt-3">
            <button type="submit" class="btn btn-success">{{ buttonMsg }}</button>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, numeric, between, alpha } from '@vuelidate/validators'
import { mapGetters } from 'vuex';
import type { Model, VehicleWrite, Brand, VehicleRead } from '@/models/CommonModels';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      vehicle: { default_vehicle: false } as VehicleWrite,
      buttonMsg: 'Registrar',
      displayFieldError: false,
      colorOptions: [
        "Rojo",
        "Azul",
        "Verde",
        "Amarillo",
        "Negro",
        "Blanco",
        "Gris"
      ]
    }
  },
  computed: {
    ...mapGetters({
      brands: 'getVehicleBrands',
      models: 'getVehicleModels',
      user: 'getUserData',
      vehicles: 'getUserVehicles',
    }),
    selectedModels() {
      if (this.vehicle.brand) {
        return this.models.filter((model: Model) => {
          if (typeof this.vehicle.brand == 'number') {
            return model.brand == this.vehicle.brand;
          }
          return model.brand.toString() == this.vehicle.brand;
        });
      }
      return [];
    },
    isValid() {
      return !this.v$.vehicle.$invalid
    }
  },
  validations: {
    vehicle: {
      plate: { required, minLength: minLength(7), maxLenght: maxLength(7) },
      brand: { required },
      model: { required },
      year: {
        required, numeric, between: between(1999, new Date().getFullYear()),
        minLength: minLength(4), maxLenght: maxLength(4)
      },
      color: { required, alpha },
      seats: { required }
    }
  },
  methods: {
    convertToUpperCase() {
      this.vehicle.plate = this.vehicle.plate.toUpperCase();
    },
    goBack() {
      this.$router.push({ name: 'Vehicles' })
    },
    isCompleted() {
      if (!this.isValid) {
        this.displayFieldError = true;
      }
      return this.isValid
    },
    register() {
      if (this.isCompleted()) {
        const data = {
          ...this.vehicle,
          driver: this.user.driver,
        }
        
        this.buttonMsg !== 'Registrar' ?  this.$store.dispatch('updateVehicle', data) : this.$store.dispatch('createVehicle', data);
        
        setTimeout(() => {
          this.clearData();
          this.$router.push({ 'name': 'Vehicles' });
        }, 500);
      }
    },
    clearData() {
      this.vehicle = {} as VehicleWrite;
      this.displayFieldError = false;
      this.v$.$reset();
    }
  },
  mounted() {
    this.v$.$reset();
    const vehicleId = this.$route.params.vehicleId;

    if (vehicleId) {
      const vehicleToEdit = this.vehicles.find((x: VehicleRead) => x.plate == vehicleId);
      if (vehicleToEdit) {
        this.vehicle = {
          id: vehicleToEdit.id,
          brand: vehicleToEdit.brand.id,
          seats: vehicleToEdit.seats,
          model: vehicleToEdit.model.id,
          plate: vehicleToEdit.plate,
          year: vehicleToEdit.year,
          color: vehicleToEdit.color,
          created_at: vehicleToEdit.created_at,
          default_vehicle: vehicleToEdit.default_vehicle
        };
        this.buttonMsg = 'Actualizar'
      }
    }
    const vehicleToEdit = false;
  }
})
</script>