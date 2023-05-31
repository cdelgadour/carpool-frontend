<template>
    <form @submit.prevent="action">
        <h3>{{ isLogin ? 'Ingresar' : 'Registrarte' }}</h3>
        <div class="mt-3">
            <label class="form-label">Email:</label>
            <input class="form-control" v-model="username" type="text">
        </div>
        <div class="mt-3">
            <label class="form-label">Password:</label>
            <input class="form-control" v-model="password" type="password" style="-webkit-text-security: disc;">
        </div>
        <div class="mt-4 d-flex justify-content-between">
            <a href="#" @click="isLogin = !isLogin">{{ isLogin ? 'No tengo cuenta' : 'Ya tengo cuenta'}}</a>
            <button type="submit" class="btn btn-primary">{{ isLogin ? 'Ingresar' : 'Registrarte' }}</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import type { LoginResponse } from '@/models/AuthModels';

export default defineComponent({
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            username: '',
            password: '',
            isLogin: true
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
                    this.$router.push({'name': 'MainView'});
                })
                .catch(e => {
                    console.log(e);
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
                .catch(err => console.log(err.response.data))
        }
    }
})
</script>