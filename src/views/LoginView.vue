<template>
    <form v-if="!showTwoFactor"  @submit.prevent="action">
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
            <button type="submit" class="btn bttn-unphu-blue">{{ isLogin ? 'Ingresar' : 'Registrarte' }}</button>
        </div>
        <div class="mt-4 text-center">
            <img class="w-100" style="max-width: 300px" src="https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/302282929_494445592685222_6275639420636531197_n.png?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=9NzxILMT5CoAX_s8EWB&_nc_ht=scontent.fhex5-2.fna&oh=00_AfA2BD3MMjVi29jNoOgfp5Hu58WHHdqxVmOtaMJsDUnXPA&oe=64AACABB" alt="">
        </div>
    </form>
    <form @submit.prevent="action" v-else>
        <h3 class="text-center">Confirma tu identidad</h3>
        <div class="text-center">
            <img style="height: 12rem;" src="~@/assets/taxi-login.jpg" alt="Animation" />
        </div>
        <p>Te enviamos un SMS al número que tienes registrado en la UNPHU.</p>
        <p><strong>(***)-***-*353</strong></p>
        <div class="mt-3">
            <label class="form-label">Código:</label>
            <input ref="usernameInput" class="form-control" style="background-color: mintcream;" v-model="twoFactorCode" type="text">
            <p class="text-danger mb-0" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
        <div class="mt-4 d-flex justify-content-between">
            <a class="btn btn-outline-secondary" href="#" @click="send2FACode">Reenviar Código</a>
            <button :disabled="twoFactorCode.length < 5" type="submit" class="btn bttn-unphu-blue">Confirmar</button>
        </div>
        <div class="mt-4 text-center">
            <img class="w-100" style="max-width: 300px" src="https://scontent.fhex5-2.fna.fbcdn.net/v/t39.30808-6/302282929_494445592685222_6275639420636531197_n.png?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=9NzxILMT5CoAX_s8EWB&_nc_ht=scontent.fhex5-2.fna&oh=00_AfA2BD3MMjVi29jNoOgfp5Hu58WHHdqxVmOtaMJsDUnXPA&oe=64AACABB" alt="">
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
            username: 'cd16-2204@unphu.edu.do',
            password: 'admin123',
            isLogin: true,
            errorMessage: '',
            signInErrorMessage: '',
            showTwoFactor: false,
            twoFactorCode: '',
            generatedTwoFactorCode: '',
            bypassTwoFactor: true
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
        },
        is2FACompleted() {
            return this.twoFactorCode.length > 0
        }
    },
    mounted() {
    },
    methods: {
        action() {
            if (this.isLogin) {
                if (!this.showTwoFactor) {
                    this.logIn();
                    if (!this.bypassTwoFactor) this.showTwoFactor = true;
                    this.twoFactorAction()
                }                
                this.proceedToMain()
            }
            else this.signUp();
        },
        proceedToMain() {
            if (this.is2FACompleted) {
                this.$store.commit('SET_IS_LOADING', true)
                if (this.generatedTwoFactorCode == this.twoFactorCode) {
                    this.$router.push({ 'name': 'MainView' });
                } else {
                    this.errorMessage = 'El código es incorrecto.'
                    this.$store.commit('SET_IS_LOADING', false)
                }
                
            }
        },
        twoFactorAction() {
            if (this.bypassTwoFactor) this.$router.push({ 'name': 'MainView' });
            else {
                this.$store.dispatch('getTwoFactor').then((res: { code: string }) => {
                    this.generatedTwoFactorCode = res.code;
                })
            }
        },
        send2FACode() {
            this.$store.dispatch('getTwoFactor')
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
                    // this.showTwoFactor = true;
                    // this.$router.push({ 'name': 'MainView' });
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