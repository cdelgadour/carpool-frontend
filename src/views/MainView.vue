<template>
    <h3>Main View</h3>
    <p>En construcción</p>
    <div class="mt-4">
        <button @click="register()" type="submit" class="btn btn-primary">Registrar Vehiculo</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    methods:{
        register(){
            this.$router.push({'name': 'RegistrarVehiculo'});
        }
    }
})
</script>

<style>

</style>