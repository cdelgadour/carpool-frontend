<template>
    <div>
        <h2>Reseñas</h2>
        <div v-if="!selectedRate">
            <div class="card shadow-sm mb-2" v-for="rate in driverRates" :key="rate.id">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-start align-items-center">
                            <div class="m-1">
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

        <div v-if="selectedRate">
            <div class="card shadow-sm">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 text-start">
                            <div class="m-1">
                                <h3>{{ formatDate(selectedRate.date) }}</h3>
                                <i>"{{ selectedRate.comment }}"</i>
                                <br/>
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
            selectedRate: null as Rate | null
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
    },
    mounted() {
        this.$store.dispatch('getDriverRates');
    }
});
</script>
  