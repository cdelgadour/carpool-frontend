<template>
    <div class="container">
        <div class="row">
            <span @click="goBack" class="mb-3">
                <fa :icon="['fas', 'chevron-left']" style="color: var(--unphu-blue)" size="xl"/><br>
            </span>
            <div class="col">
                <h3 class="p-0 mx-0 mb-0">Mis viajes</h3>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <div class="card px-3 py-3 mb-3" v-for="trip in userTrips" :key="trip.trip.id" @click="goToDetail(trip.trip.id, trip.id)">
                    <p class="mb-1"><strong>Viaje #{{ trip.trip.id }}</strong></p>
                    <p class="m-0"><strong>Tipo de Viaje:</strong> {{ trip.trip_type == 1 ? 'Hacia UNPHU' : 'Desde UNPHU'}}</p>
                    <p class="m-0"><strong>Fecha:</strong> {{ formattedDate(trip.trip.scheduled_date) }}</p>
                    <p class="m-0"><strong>Estatus:</strong> {{ trip.trip.status ? selectedDecisionChoice(trip.trip.status) : '' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { NamedChoices } from '@/models/CommonModels';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    computed: {
        ...mapGetters({
            trips: 'getDriverTrips',
            userTrips: 'getUserTrips',
            tripStatusList: 'getTripStatus'
        })
    },
    mounted() {
        this.$store.dispatch('getUserTrips')
        this.$store.dispatch('getDriverTrips')
        this.$store.commit('SET_SELECTED_USER_TRIP_DETAIL', null);
    },
    methods: {
        formattedDate(value: string) {
            return 'Fecha'
        },
        goBack() {
            this.$router.push({ name: 'MainView' })
        },
        goToDetail(id: string, detail_id: string) {
            const trip = this.userTrips.filter((t: any) => t.id == detail_id)[0];
            this.$store.commit('SET_SELECTED_USER_TRIP_DETAIL', trip.pickup_place);
            this.$router.push({ name: 'TripDetailRoute', params: { id: id }, query: { readOnly: 'true' }})
        },
        selectedDecisionChoice(id: string) {
            if (this.tripStatusList) {
                return this.tripStatusList.find((tripStatus: NamedChoices) => tripStatus.id == id).name;
            }
            return ''
        }
    }
})
</script>

<style scoped>

</style>