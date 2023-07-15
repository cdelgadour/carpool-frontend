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
    </div>
</template>

<script lang="ts">
import { faL } from '@fortawesome/free-solid-svg-icons';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    computed: {
        ...mapGetters({
            isDriver: 'getIsDriver'
        })
    },
    mounted() {
        this.$store.commit('SET_IS_LOADING', false)
    },  
    methods: {
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
