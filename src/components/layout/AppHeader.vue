<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Carpool</a>
        <button class="navbar-toggler" type="button" v-if="!isLoggedIn" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('MainView')" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('Vehicles')" aria-current="page" href="#">Mis vehículos</a>
            </li>
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="logout" aria-current="page" href="#">Logout</a>
            </li>
        </ul>
        </div>
    </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    computed: {
        isLoggedIn() {
            if (this.$route && this.$route.name) return (<string>this.$route.name).toLowerCase() == 'login';
            return true
        }
    },
    methods: {
        goToRoute(route: string) {
            this.$router.push({'name': route});
        },
        logout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem ('refreshToken');
            this.$router.push({'name': 'Login'});
        }
    }
})
</script>

<style>

</style>