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
                <p class="mt-4">En breve, obtendrás el pago de parte los pasajeros</p>
                <p class="mb-3">Puedes dejar la reseña de ellos más abajo</p>
            </div>
            <div class="col-1"></div>
        </div>
        <hr class="mb-4">
        <div class="row">
            <div class="col-5">
                <strong>Francis Nuñez</strong>
            </div>
            <div class="col-2"></div>
            <div class="col-5 text-end">
                <button @click="getCheckoutUrl" class="btn btn-success">Reseñar</button>
            </div>
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