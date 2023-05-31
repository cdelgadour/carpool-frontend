<template>
    <div class="">
    <h3 class="text-center mb-4">Solicitudes</h3>
    <div class="container-fluid">
      <div class="row card shadow-sm p-4 mb-4" v-for="request in driverRequests" :key="request.id">
        <div class="col-md-6 text-start align-items-center">
          <div class="my-1">
            <p class="mb-0"><strong>Solicitud #{{ request.id }}</strong></p>
            <p class="mb-0"><strong>Conductor</strong></p>
            <p>Fecha: {{ formattedDate(request.created_at) }}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="m-1 text-end">
            <button class="btn btn-outline-dark btn-sm" @click="showDetails(request.id)">Ver Detalles</button>
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

export default defineComponent({
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            disableSendButton: false
        }
    },
    computed: {
        ...mapGetters({
            driverRequests: 'getDriverRequests'
        }),
    },
    methods: {
        formattedDate(date: string) {
            return date.substring(0, 10);
        },
        registerDriver(){
            this.$store.dispatch('requestAsDriver').then(() => {
                this.disableSendButton = true;
            })  
        },
        showDetails(routeId: string) {
            this.$router.push({ name: 'DriverRequestDetail', params: { id: routeId }})
        }
    },
    mounted() {
        this.$store.dispatch('getDriverRequests');
    }
})
</script>