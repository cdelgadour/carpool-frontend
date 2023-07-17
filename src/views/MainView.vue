<template>
    <div>
        <h2>Bienvenido</h2>
        <p>¿Qué deseas hacer?</p>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mt-3 mb-4" v-if="isDriver">
                    <button class="search-bttn p-4" @click="goTo('DriverCreateRoute')">
                        <fa :icon="['fas', 'car']" style="color: var(--unphu-blue)" size="2xl"/><br>
                        <p class="mb-0 mt-2">Programar un viaje</p>
                    </button>
                </div>
                <div class="col-12 text-center mb-4">
                    <button class="create-bttn p-4" @click="goTo('DriverRouteList')">
                        <fa :icon="['fas', 'map']" style="color: var(--unphu-green)" size="2xl"/><br>
                        <p class="mb-0 mt-2">Ver viajes agendados</p>
                    </button>
                </div>
                <div class="col-12 text-center mb-4">
                    <button class="search-bttn p-4" @click="goTo('SearchRouteList')">
                        <fa class="create-icon" :icon="['fas', 'search']" style="color: var(--unphu-blue)" size="2xl"/><br>
                        <p class="mb-0 mt-2">Buscar un carpool</p>
                    </button>
                </div>
                <div class="col-12 text-center mb-4">
                    <button class="create-bttn p-4" @click="goTo('DriverPayments')">
                        <fa :icon="['fas', 'money-bill']" style="color: var(--unphu-green)" size="2xl"/><br>
                        <p class="mb-0 mt-2">Ver pagos</p>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="activeTrip" @click="goToActiveTrip" class="current-trip text-center p-3 animate__animated animate__pulse">
            <p>Ya ha iniciado un viaje al que perteneces!</p>
            <p><strong>Ir a viaje en curso</strong></p>
        </div>
    </div>
</template>

<script lang="ts">
import type { Trip, TripDetail } from '@/models/CommonModels';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    data() {
        return {
            selectedTripDetail: null,
            selectedTrip: null
        }
    },
    computed: {
        ...mapGetters({
            isDriver: 'getIsDriver',
            userTrips: 'getUserTrips',
            driverTrips: 'getDriverTrips'
        }),
        activeTrip() {
            if (this.userTrips && this.driverTrips) {
                const trips = this.driverTrips.filter((t: Trip) => t.status == 2).map((t: Trip) => t.id);
                const userTrips = this.userTrips.filter((t: TripDetail) => trips.includes((t.trip as any).id))
                
                if (userTrips.length > 0) {
                    this.selectedTripDetail = this.userTrips.find((t: TripDetail) => userTrips[0].id);
                    this.$store.commit('SET_SELECTED_USER_TRIP_DETAIL', this.selectedTripDetail);
                    this.selectedTrip = userTrips[0].trip.id;
                }
                return userTrips.length > 0
            }
            return false
        }
    },
    mounted() {
        this.$store.dispatch('getDriverTrips');
        this.$store.dispatch('getUserTrips');
        this.$store.commit('SET_IS_LOADING', false)
        this.$store.commit('SET_SUCCESS_MODAL', false);
    },  
    methods: {
        goToActiveTrip() {
            this.$router.push({ name: 'UserActiveTrip', params: { id: this.selectedTrip }})
        },
        goTo(routeName: string) {
            this.$router.push({ name: routeName})
        }
    }
})
</script>



<style scoped>

.create-bttn {
    background-color: white;
    border: 1px solid var(--unphu-green);
    color: var(--unphu-green);
}
.current-trip {
    color: white;
    border: 1px solid var(--unphu-green);
    background-color: var(--unphu-green);
    border-radius: 5px;
    animation-iteration-count: infinite;
    cursor: pointer;
}
.current-trip > p{
    margin: 0;
}
.search-bttn {
    background-color: white;
    border: 1px solid var(--unphu-blue);
    color: var(--unphu-blue);
}

button {
    width: 300px;
    color: white;
    border: 0;
    box-shadow: 1px 1px 8px 1px #00000061;
    border-radius: 5px
}
</style>
