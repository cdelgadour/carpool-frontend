<template>
    <div class="container">
        <h3 class="mt-3 p-0 mx-0">Mis viajes agendados</h3>
        <div class="row">
            <div class="col-12 card mt-3" v-for="trip in trips" :key="trip.id" @click="goToDetail(trip.id)">
                <p>Viaje #{{ trip.id }}</p>
                <p>Tipo de Viaje: {{ trip.trip_type == 1 ? 'Hacia UNPHU' : 'Desde UNPHU'}}</p>
                <p>Fecha pautada: {{ trip.scheduled_date }}</p>
                <p>Estatus: <strong>Pendiente</strong></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    computed: {
        ...mapGetters({
            trips: 'getDriverTrips'
        })
    },
    mounted() {
        this.$store.dispatch('getDriverTrips')
    },
    methods: {
        goToDetail(id: string) {
            this.$router.push({ name: 'DriverDetailRoute', params: { id: id }})
        }
    }
})
</script>

<style scoped>

</style>