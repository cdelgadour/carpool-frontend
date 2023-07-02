<template>
    <h3>Main View</h3>
    <p>En construcción</p>
    <div v-if="isDriver">
        <div class="container-fluid">
            <div class="row card shadow-sm p-3 mb-2 text-center">
                <div class="btn">
                    <fa class="mb-2" color="red" :icon="['fas', 'location-dot']" size="2xl" beat-fade/>
                    <br/><b>Viajes agendados</b>
                </div>
            </div>
            <div class="row card shadow-sm p-3 mb-2 text-center">
                <div class="btn">
                    <fa class="mb-2" color="green" :icon="['fas', 'map-location-dot']" size="2xl" beat-fade/>
                    <br/><b>Crear viaje</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
export default defineComponent({
    computed: {
        ...mapGetters({
            isDriver: 'getIsDriver'
        }),
    },
    methods: {

    }
})
</script>

<style></style>