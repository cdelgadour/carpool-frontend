<template>
    <form @submit.prevent="logIn">
        <h3>Log in</h3>
        <label for="">Email:</label><br>
        <input v-model="username" type="text"><br>
        <label for="">Password:</label><br>
        <input v-model="password" type="password"> <br><br>
        <button type="submit">Log in</button>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Joi from 'joi'
import type { LoginResponse } from '@/models/AuthModels';

export default defineComponent({
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            username: '',
            password: '',
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
    methods: {
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
        }
    }
})
</script>