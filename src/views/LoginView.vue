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
export default defineComponent({
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        logIn() {
            const data = {
                username: this.username,
                password: this.password
            };

            this.$axios.post('api/token/', data)
                .then(res => {
                    this.$router.push({'name': 'MainView'})
                })
                .catch(e => {
                    console.log(e);
                })   
        }
    }
})
</script>