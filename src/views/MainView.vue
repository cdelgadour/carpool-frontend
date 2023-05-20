<template>
    <h3>Main View</h3>
    <p>En construcción</p>
    <div class="mt-4">
        <button @click="register" type="submit" class="btn btn-primary">Registrar Vehiculo</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
export default defineComponent({
    methods:{
        register(){
            this.$router.push({'name': 'RegisterVehicle'});
        },
    },
})
</script>

<style>

</style>