<template>
  <div class="card shadow-sm p-4" v-if="!selectedVehicle">
    <h3 class="text-center mb-4">Mis Vehículos</h3>
    <button @click="register" type="submit" class="btn btn-primary">Registrar Vehiculo</button>
    <div class="container-fluid">
      <div class="row" v-for="vehicle in vehicles" :key="vehicle.plate">
        <div class="col-md-6 text-start align-items-center">
          <hr />
          <div class="my-1">
            <p>{{ vehicle.brand.name }} {{ vehicle.model.name }}</p>
            <p>{{ vehicles.plate }}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="m-1 text-end">
            <button class="btn btn-outline-dark btn-sm" @click="showDetails(vehicle)">Ver Detalles</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selectedVehicle">
    <div class="card shadow-sm">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12 text-start">
            <div class="m-1">
              <h3>{{ selectedVehicle.brand.name }} {{ selectedVehicle.model.name }}, {{ selectedVehicle.year }}</h3>
              <ul>
                <li><b>Fecha de Registro:</b> <label>{{ formatDate(selectedVehicle.created_at) }}</label></li>
                <li><b>Placa:</b> <label>{{ selectedVehicle.plate }}</label></li>
                <li><b>Color:</b> <label>{{ selectedVehicle.color }}</label></li>
                <li><b>Cantidad de Asientos:</b> <label>{{ selectedVehicle.seats }}</label></li>
              </ul>
            </div>

            <button class="btn btn-outline-dark btn-sm m-2" @click="goBack">Volver</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { mapGetters } from 'vuex';
import type { VehicleRead } from '@/models/CommonModels';
import { CommonUtils } from '@/utils/CommonUtils';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      selectedVehicle: null as VehicleRead | null
    }
  },
  methods: {
    register() {
      this.$router.push({ 'name': 'RegisterVehicle' });
    },
    showDetails(vehicle: any) {
      this.selectedVehicle = vehicle;
    },
    goBack() {
      this.selectedVehicle = null;
    },
    formatDate(date: string) {
      return CommonUtils.formatDate(date);
    }
  },
  computed: {
    ...mapGetters({
      vehicles: 'getUserVehicles',
    }),
  },
  mounted() {
    this.$store.dispatch('getUserVehicles');
  }
})
</script>