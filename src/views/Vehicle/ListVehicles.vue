<template>
  <div class="card shadow-sm p-4">
    <h3 class="text-center mb-4">Mis Vehículos</h3>
    <button @click="register" type="submit" class="btn btn-primary">Registrar Vehiculo</button>
    <p>
      List Vehicles
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { mapGetters } from 'vuex';

export default defineComponent({
  setup() {
    return { v$: useVuelidate() }
  },
  methods: {
    register(){
            this.$router.push({'name': 'RegisterVehicle'});
    },
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