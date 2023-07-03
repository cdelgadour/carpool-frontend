<template>
    <div>
        <h3 class="text-center mb-4">Reseñas</h3>
        <div class="card shadow-sm mb-2 p-3" id="filters">
            Filtrar por Estrellas
            <select class="form-select" v-model="selectedStarFilter">
                <option value="">Todas</option>
                <option v-for="star in stars" :value="star" :key="star">{{ star }} Estrella(s)</option>
            </select>
        </div>
        <div class="text-center mt-5" v-if="driverRates.length === 0">
            <h4 class="text-danger mb-4">No ha recibido ninguna reseña.</h4>
            <img style="height: 12rem;" src="~@/assets/404.jpg" />
        </div>
        <div v-if="!selectedRate">
            <div class="row">
                <div class="col-12">
                    <div class="card p-2 shadow-sm mb-3" v-for="rate in filteredDriverRates" :key="rate.id">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-6 text-start align-items-center">
                                    <div class="m-1">
                                        <p class="mb-0"><strong>Viaje #{{ rate.trip.id }}</strong></p>
                                        <b>{{ formatDate(rate.date) }}</b>
                                        <br />
                                        <i>"{{ rate.comment }}"</i>
                                        <div class="text-start">
                                            <span v-for="r in rate.rate">&#11088;</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="m-1 text-end">
                                        <button class="btn btn-outline-dark btn-sm" @click="showDetails(rate)">Ver Detalles</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="selectedRate">
            <div class="card shadow-sm">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 text-start">
                            <div class="m-1">
                                <h3>{{ formatDate(selectedRate.date) }}</h3>
                                <i>"{{ selectedRate.comment }}"</i>
                                <br />
                                <span v-for="r in selectedRate.rate">&#11088;</span>
                                <hr />
                                <p>Detalles del Viaje</p>
                                <ul>
                                    <li><b>Fecha de Inicio:</b> <label>{{ formatDate(selectedRate.trip.started_at)
                                    }}</label></li>
                                    <li><b>Fecha de Fin:</b> <label>{{ formatDate(selectedRate.trip.comleted_at) }}</label>
                                    </li>
                                    <li><b>Tipo de Viaje:</b> <label>{{ selectedRate.trip.trip_type == 1 ? 'Hacia la UNPHU'
                                        : 'Desde la UNPHU' }}</label></li>
                                </ul>
                            </div>
                            <button class="btn btn-outline-dark btn-sm m-2" @click="goBack">
                                <fa :icon="['fas', 'arrow-left']" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import type { Rate } from '@/models/CommonModels';
import { mapGetters } from 'vuex';
import { CommonUtils } from '@/utils/CommonUtils';

export default defineComponent({
    data() {
        return {
            selectedRate: null as Rate | null,
            selectedStarFilter: '',
            stars: [5, 4, 3, 2, 1] 
        };
    },
    methods: {
        showDetails(rate: any) {
            this.selectedRate = rate;
        },
        goBack() {
            this.selectedRate = null;
        },
        formatDate(date: string) {
            return CommonUtils.formatDate(date);
        }
    },
    computed: {
        ...mapGetters({
            driverRates: 'getDriverRates'
        }),
        filteredDriverRates() {
            if (!this.selectedStarFilter) {
                return this.driverRates;
            } else {
                const selectedRating = parseInt(this.selectedStarFilter);
                return this.driverRates.filter((rate: { rate: string; }) => parseInt(rate.rate) === selectedRating);
            }
        }
    },
    mounted() {
        this.$store.dispatch('getDriverRates');
    }
});
</script>
  