<template>
  <div class="card shadow-sm p-4" v-if="!selectedVehicle">
    <h3 class="text-center mb-4">Mis Vehículos</h3>
    <button @click="register" type="submit" class="btn btn-primary">Registrar Vehiculo</button>
    <div class="container-fluid">
      <div class="row" v-for="vehicle in vehicles" :key="vehicle.plate">
        <div class="col-md-6 text-start align-items-center">
          <hr />
          <div class="mb-4 text-center">
            <p>{{ vehicle.brand ? vehicle.brand.name : '' }} {{ vehicle.model ? vehicle.model.name : '' }}, {{
              vehicle.plate }}</p>
            <fa :color="getColor(vehicle.color)" class="fa-2xl"
              :icon="['fas', vehicle.seats == '4' ? 'car' : 'motorcycle']" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="m-1 text-end">
            <button class="btn btn-outline-dark btn-sm" @click="showDetails(vehicle)">
              <fa :icon="['fas', 'eye']" />
            </button>
            <button class="btn btn-outline-primary btn-sm" @click="edit(vehicle.plate)">
              <fa :icon="['fas', 'pencil']" />
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="showDetailsDelete(vehicle)">
              <fa :icon="['fas', 'trash']" />
            </button>
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
              <div class="text-center">
                <h3>{{ selectedVehicle.brand.name }} {{ selectedVehicle.model.name }}, {{ selectedVehicle.year }}</h3>
                <fa :color="getColor(selectedVehicle.color)" class="fa-2xl"
                  :icon="['fas', selectedVehicle.seats == '4' ? 'car' : 'motorcycle']" />
              </div>
              <ul>
                <li><b>Fecha de Registro:</b> <label>{{ formatDate(selectedVehicle.created_at) }}</label></li>
                <li><b>Placa:</b> <label>{{ selectedVehicle.plate }}</label></li>
                <li><b>Color:</b> <label>{{ selectedVehicle.color }}</label></li>
                <li><b>Cantidad de Asientos:</b> <label>{{ selectedVehicle.seats }}</label></li>
              </ul>
            </div>

            <button class="btn btn-outline-dark btn-sm m-2" @click="goBack">
              <fa :icon="['fas', 'arrow-left']" />
            </button>
            <button v-if="isDeleting && !showConfirmation" class="btn btn-danger btn-sm m-2"
              @click="showConfirmation = true">
              Eliminar
            </button>
            <div v-show="showConfirmation" class="m-2">
              <p>¿Está seguro que desea eliminar el vehículo?</p>
              <button class="btn btn-sm btn-danger" @click="confirmDeletion(selectedVehicle.id)">Sí</button>
              <button class="btn btn-sm btn-secondary" @click="cancelDeletion">No</button>
            </div>

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
import type { VehicleRead, VehicleWrite } from '@/models/CommonModels';
import { CommonUtils } from '@/utils/CommonUtils';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      selectedVehicle: null as VehicleRead | null,
      isDeleting: false,
      showModal: false,
      showConfirmation: false,
      isDeletingVisible: true,
    }
  },
  methods: {
    register() {
      this.$router.push({
        name: 'RegisterVehicle'
      });
    },
    edit(id: string) {
      this.$router.push({
        name: 'RegisterVehicle',
        params: { vehicleId: id }
      })
    },
    deleteVehicle(data: string) {
      this.$store.dispatch('deleteVehicle', data).then(() => {
        this.$store.dispatch('getUserVehicles');
        this.selectedVehicle = null;
      })
    },
    confirmDeletion(id: string) {
      this.deleteVehicle(id);
      this.showConfirmation = false;
      this.isDeletingVisible = false;
    },
    cancelDeletion() {
      this.showConfirmation = false;
    },
    showDetails(vehicle: VehicleRead) {
      this.selectedVehicle = vehicle;
    },
    showDetailsDelete(vehicle: VehicleRead) {
      this.selectedVehicle = vehicle;
      this.isDeleting = true;
    },
    goBack() {
      this.selectedVehicle = null;
    },
    formatDate(date: string) {
      return CommonUtils.formatDate(date);
    },
    getColor(color: string) {
      return CommonUtils.getEnglishColor(color);
    }
  },
  computed: {
    ...mapGetters({
      vehicles: 'getUserVehicles',
    }),
  },
  mounted() {
    this.$store.dispatch('getUserVehicles');
    this.$store.dispatch('fetchBrands');
    this.$store.dispatch('fetchModels');
  }
})
</script>