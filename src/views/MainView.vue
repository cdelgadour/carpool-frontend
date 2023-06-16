<template>
    <div>
        <h2>Bienvenido</h2>
        <p>¿Qué deseas hacer?</p>
        <div class="container">
            <div class="row">
                <div class="col-12 text-center mb-4">
                    <button class="create-bttn p-4" @click="goTo('DriverCreateRoute')">
                        <fa :icon="['fas', 'car']" style="color: #fff" size="2xl"/><br>
                        <p class="mb-0 mt-2">Programar un viaje</p>
                    </button>
                </div>
                <div class="col-12 text-center">
                    <button class="search-bttn p-4" @click="goTo('DriverCreateRoute')">
                        <fa class="create-icon" :icon="['fas', 'search']" style="color: #fff" size="2xl"/><br>
                        <p class="mb-0 mt-2">Buscar un carpool</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// #449441 Verde UNPHU
// #0f385a Azul UNPHU

export default defineComponent({
    methods: {
        goTo(routeName: string) {
            this.$router.push({ name: routeName})
        }
    }
})
</script>



<style scoped>
.create-bttn {
    background-color: #449441;
}
.search-bttn {
    background-color: #0f385a;
}

button {
    max-width: 275px;
    color: white;
    border: 0;
    box-shadow: 1px 1px 8px 1px #00000061;
    border-radius: 5px
}
</style>
