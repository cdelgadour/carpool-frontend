<template>
  <div class="card shadow-sm p-4">
    <h3 class="text-center mb-4">Registro de Vehiculo</h3>
    <form @submit.prevent="registerVehicle">
      <div class="container-fluid">
        <div class="row">

          <div class="col-md-6">

            <div class="m-1">
              <label class="form-label">Conductor</label>
              <input class="form-control" v-model="driver" disabled readonly type="text">
            </div>
            <div class="m-1">
              <label class="form-label">Placa</label>
              <input class="form-control" v-model="plate" type="text">
              <span class="text-danger" v-if="v$.plate.$error">La placa debe ser de 7 digitos.</span>
            </div>
            <div class="m-1">
              <label class="form-label">Marca</label>
              <select class="form-control" v-model="brandSelected" placeholder="Selecciona la marca del Vehiculo">
                <option v-for="brand in brandOptions" :value="brand.value">
                  {{ brand.text }}
                </option>
              </select>
              <span class="text-danger" v-if="v$.brandSelected.$error">Selecciona una marca.</span>
            </div>

          </div>
          <div class="col-md-6 ">
            <div class="m-1">
              <label class="form-label">Modelo</label>
              <select class="form-control" v-model="model" placeholder="Selecciona la marca del Vehiculo">
                <option v-for="model in modelsList" :value="model">
                  {{ model }}
                </option>
              </select>
            </div>

            <div class="m-1">
              <label class="form-label">Año</label>
              <input class="form-control" v-model="year" type="text">
              <span class="text-danger" v-if="v$.year.$error">Favor escribir un año valido. (YYYY)</span>
            </div>

          </div>
          <div class="d-flex flex-row-reverse mt-3">
            <button type="submit" class="btn btn-primary">Registrar</button>
          </div>

        </div>
      </div>

    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, maxValue, minLength, maxLength, not, sameAs, numeric, between } from '@vuelidate/validators'
export default defineComponent({
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      driver: 'Jose Ramon Romero',
      plate: '',
      year: '',
      model: '',
      modelsList: [],
      brandSelected: 0,
      brandOptions: [
        { text: 'Selecciona una marca', value: 0 },
        { text: 'BMW', value: 1 },
        { text: 'Mercedes', value: 2 },
        { text: 'Toyota', value: 3 },
        { text: 'Tesla', value: 4 }
      ]
    }
  },
  validations() {
    return {
      plate: { required, minLength: minLength(7), maxLenght: maxLength(7) },
      brandSelected: { required, not: not(sameAs(0)) },
      year: {
        required, numeric, between: between(1999, new Date().getFullYear()),
        minLength: minLength(4), maxLenght: maxLength(4)
      },
    }
  },
  methods: {
    async getModelsByBrand() {
      const brand = this.brandOptions.find(x => x.value === this.brandSelected)?.text;

      await this.$axios(`https://api.api-ninjas.com/v1/cars?limit=50&make=${brand}`, {
        method: "GET",    
        headers: {
          "X-Api-Key": "UQAKcCOf5tgZSvN9xgLJEw==acQot96MSogkEvhD",
        },
        responseType: "json",
      }).then((result) => {
        const data = result.data;

        try{
          let brandModels = data.map((car: { model: any; }) => car.model);
          this.modelsList = brandModels;
        }
        catch(error){
          console.error("Error: ", error)
        }

      }).catch((error) => {
        console.error("Error: ", error.responseText);
      });
    },
    async registerVehicle() {

      const isValid = await this.v$.$validate();
      if (!isValid) return;

      const vehicleDTO = {
        driver: this.driver,
        plate: this.plate,
        year: this.year,
        model: this.model,
        brand: this.brandSelected
      }
    },
  },
  watch: {
    brandSelected() {
      this.getModelsByBrand();
    },
  }
})
</script>

<style></style>