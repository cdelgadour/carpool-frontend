<template>
    <div class="container pt-3">
        <h2 class="text-center mb-5">¡Has llegado a tu destino!</h2>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-8">
                <img style="width: 220px;" src="~@/assets/arrival.jpeg" alt="Animation" />
            </div>
            <div class="col-2"></div>
        </div>
        <div v-if="!hasPayed" class="row">
            <div class="col-1"></div>
            <div class="col text-center">
                <p class="mt-5"><strong>¡Esperamos que hayas tenido un excelente viaje!</strong></p>
                <p class="mb-4">Presiona el botón debajo para realizar tu pago</p>
                <button @click="getCheckoutUrl" class="btn btn-success">
                    Hacer pago
                </button>
            </div>
            <div class="col-1"></div>
        </div>
        <div v-else class="row">
            <div class="col-1"></div>
            <div class="col text-center">
                <p class="mb-4 mt-5">Ya has realizado tu pago!</p>
                <hr>
                <p class="mb-4">Presiona el botón debajo para dejar una reseña (opcional)</p>
                <button @click="goToReview" class="btn btn-success mb-4">
                    Hacer reseña
                </button>
                <br>
                <button @click="goToMain" class="btn btn-outline-success">
                    Saltar
                </button>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            hasPayed: false
        }
    },
    mounted() {
        this.$store.commit('SET_IS_LOADING', false);
        this.hasPayed = this.$route.query.payed ? true : false;
    },
    methods: {
        goToMain() {
            this.$router.push({name: 'MainView'});
        },
        goToReview() {
            this.$router.push({name: 'CreateReview'});
        },
        getCheckoutUrl() {
            this.$axios.get('api/checkout/').then(res => {
                const link = document.createElement('a')
                link.href = res.data.checkout_url;
                // link.target = '_blank'
                link.click();
            }).catch(err => console.log(err));
        }
    }
})
</script>