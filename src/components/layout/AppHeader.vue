<template>
    <nav class="navbar navbar-expand-lg navbar-light mb-3">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Carpool</a>
        <button class="navbar-toggler" type="button" v-if="!isLoggedIn" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!isLoggedIn">
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('MainView')" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('Profile')" aria-current="page" href="#">Mi Perfil</a>
            </li>
            <li class="nav-item" v-if="showAdminRoutes" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('DriverRequests')" aria-current="page" href="#">Solicitudes de conductor</a>
            </li>
            <li class="nav-item" v-if="isDriver" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('Vehicles')" aria-current="page" href="#">Mis vehículos</a>
            </li>
            <li class="nav-item" v-if="isDriver" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('DriverRouteList')" aria-current="page" href="#">Mis viajes</a>
            </li>
            <li class="nav-item" v-if="isDriver || showAdminRoutes" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('DriverPayments')" aria-current="page" href="#">Pagos</a>
            </li>
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('Trips')" aria-current="page" href="#">Viajes</a>
            </li>
            <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
            <a class="nav-link active" @click="goToRoute('UserRates')" aria-current="page" href="#">Reseñas</a>
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
import { mapGetters } from 'vuex';
export default defineComponent({
    computed: {
        ...mapGetters({
            userData: 'getUserData',
            isDriver: 'getIsDriver'
        }),
        showAdminRoutes() {
            if (this.userData) return this.userData.is_admin
        },
        isLoggedIn() {
            if (this.$route && this.$route.name) return (<string>this.$route.name).toLowerCase() == 'login';
            return true
        }
    },
    methods: {
        goToRoute(route: string) {
            if (this && this.$router) {
                this.$router.push({'name': route});
            }
        },
        logout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem ('refreshToken');
            this.$store.commit("RESET_STATE");
            this.$router.push({'name': 'Login'});
        }
    }
})
</script>

<style scoped>
nav {
    background-color: var(--unphu-green);
}
nav >>> a {
    color: white;
}

a {
    color: white !important;
}
</style>