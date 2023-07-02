<template>
    <form @submit.prevent="action">
        <h3 class="text-center">{{ isLogin ? 'Ingresar' : 'Registrarte' }}</h3>
        <div class="text-center">
            <img style="height: 12rem;" src="~@/assets/taxi-login.jpg" alt="Animation" />
        </div>
        <div class="mt-3">
            <label class="form-label">Email:</label>
            <input ref="usernameInput" class="form-control" style="background-color: mintcream;" v-model="username" type="text">
            <p class="text-danger mb-0" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
        <div class="mt-3">
            <label class="form-label">Password:</label>
            <input ref="passwordInput" class="form-control" v-model="password" type="password"
                style="-webkit-text-security: disc; background-color: mintcream;" >
            <p class="text-danger mb-0" v-if="signInErrorMessage">{{ signInErrorMessage }}</p>
        </div>
        <div class="mt-4 d-flex justify-content-between">
            <a class="btn btn-outline-secondary" href="#" @click="isLogin = !isLogin">{{ isLogin ? 'No tengo cuenta' : 'Ya tengo cuenta' }}</a>
            <button type="submit" class="btn btn-success">{{ isLogin ? 'Ingresar' : 'Registrarte' }}</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import type { LoginResponse } from '@/models/AuthModels';

export default defineComponent({
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            username: '',
            password: '',
            isLogin: true,
            errorMessage: '',
            signInErrorMessage: ''
        }
    },
    validations() {
        return {
            username: { required },
            password: { required }
        }
    },
    computed: {
        isCompleted() {
            return !this.v$.$invalid;
        }
    },
    mounted() {
    },
    methods: {
        action() {
            if (this.isLogin) this.logIn();
            else this.signUp();
        },
        logIn() {
            if (!this.isCompleted) return;

            const data = {
                username: this.username,
                password: this.password
            };
            this.$axios.post('api/token/', data)
                .then((res: LoginResponse) => {
                    localStorage.setItem('accessToken', res.data.access);
                    localStorage.setItem('refreshToken', res.data.refresh);
                    this.$store.dispatch('getUserData');
                    this.$router.push({ 'name': 'MainView' });
                })
                .catch(e => {
                    if (e.response.status == 401) {
                        this.signInErrorMessage = "Error auntenticando, verificar correo y contraseña";
                        (this.$refs.usernameInput as HTMLInputElement).style.borderColor = 'red';
                        (this.$refs.passwordInput as HTMLInputElement).style.borderColor = 'red';
                        (this.$refs.usernameInput as HTMLInputElement).focus();
                    }
                    else {
                        console.log(e.response);
                    }
                })
        },
        signUp() {
            if (!this.isCompleted) return;

            const data = {
                username: this.username,
                password: this.password
            };
            this.$axios.post('api/users/create_user/', data)
                .then((res) => {
                    if (res.status == 201) this.logIn();
                })
                .catch(err => {
                    this.errorMessage = err.response.data.email[0]
                })
        }
    }
})
</script>