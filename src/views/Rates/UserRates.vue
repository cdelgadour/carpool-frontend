<template>
    <div>
        <h2>Reseñas</h2>
        <div v-if="!selectedRate">
            <div class="card shadow-sm mb-2" v-for="rate in rates" :key="rate.id">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-start align-items-center">
                            <div class="m-1">
                                <b>{{ rate.date }}</b>
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
                                <h3>{{ selectedRate.date }}</h3>
                                <p>{{ selectedRate.comment }}</p>
                                <span v-for="r in selectedRate.rate">&#11088;</span>
                            </div>
                            <button class="btn btn-outline-dark btn-sm m-2" @click="goBack">Volver</button>
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

export default defineComponent({
    data() {
        return {
            rates: [
                { id: 1, rate: 5, comment: 'excelente', date: '2023-02-31' },
                { id: 2, rate: 1, comment: 'pone musica mala', date: '2022-04-21' },
                { id: 3, rate: 4, comment: 'buen servicio', date: '2023-01-01' },
            ],
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
    },
    // computed: {
    //     ...mapGetters({
    //         DriverRates: 'getDriverRates'
    //     }),
    // },
    // mounted() {
    //     this.$store.dispatch('getDriverRates');
    //     console.log(this.$store)
    // }
});
</script>
  