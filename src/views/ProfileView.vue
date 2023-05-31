<template>
    <div class="row">
        <h3>Mi Perfil</h3>
        <p>{{ userData.email }}</p>
        <template v-if="!userData.driver">
            <hr>
            <button @click="registerDriver" 
                :disabled="disableSendButton" 
                v-if="!disableSendButton && !userData.driverRequest"
                type="submit" 
                :class="disableSendButton ? 'btn-secondary': 'btn-primary'"
                class="btn ">Solicitar ser conductor</button>
            <p v-else-if="disableSendButton">Su solicitud para ser conductor ya fue enviada.</p>
            <p v-else-if="userData.driverRequest">Su solicitud (#{{ userData.driverRequest }}) para ser conductor está pendiente.</p>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { mapGetters } from 'vuex';

export default defineComponent({
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            disableSendButton: false
        }
    },
    computed: {
        ...mapGetters({
            userData: 'getUserData'
        }),
    },
    methods: {
        registerDriver(){
            this.$store.dispatch('requestAsDriver').then(() => {
                this.disableSendButton = true;
            })  
        }
    }
})
</script>