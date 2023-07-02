<template>
    <div>
        <h3 class="text-center mb-4">Viajes</h3>
        <div class="container-fluid">
            <div class="row card shadow-sm p-3 mb-2" v-for="request in tripsExample" :key="request.id">
                <div class="col-md-6 text-start align-items-center">
                    <div class="my-1">
                        <p class="mb-0"><strong>
                                <fa color="green" :icon="['fa', 'taxi']" /> | Viaje #{{ request.id }}
                            </strong></p>
                        <p class="mb-0"><strong>
                                <fa color="green" :icon="['fa', 'location-dot']"/> | Tipo Viaje: {{ request.trip_type == 1
                                    ? "Hacia UNPHU" : "Desde UNPHU" }}
                            </strong></p>
                        <p class="mb-0"><strong>
                                <fa color="green" :icon="['fa', 'circle-question']" /> | Estado: {{
                                    selectedStatus(request.status) }}
                            </strong></p>
                        <p>
                            <fa color="green" :icon="['fa', 'calendar-days']" /> | Fecha: {{
                                request.created_at }}
                        </p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="m-1 text-end">
                        <button class="btn btn-outline-success btn-sm" @click="showDetails(request.id)">Ver
                            Detalles</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { mapGetters, mapState } from 'vuex';
import type { Trip } from '@/models/CommonModels';

export default defineComponent({
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            tripsExample: [{
                avaible_seats: 4,
                comleted_at: '2023-05-01',
                created_at: '2023-04-30',
                created_by: 1,
                driver: 1,
                id: 1,
                started_at: '2023-05-01',
                status: 5,
                trip_type: 1,
                updated_at: '2023-05-01',
                updated_by: 1
            }],
            tripStatus: [
                { key: 1, value: 'En cola' },
                { key: 2, value: 'Iniciado' },
                { key: 3, value: 'Finalizado' },
                { key: 5, value: 'Cancelado' }
            ]
        }
    },
    computed: {
        filteredTrips() {

        }
    },
    methods: {
        selectedStatus(id: number) {
            if (id) return this.tripStatus.find(item => item.key === id)?.value;
            return 'En cola'
        },
        showDetails(routeId: number) {
            this.$router.push({ name: 'DriverRequestDetail', params: { id: routeId } })
        }
    },
})
</script>