<template>
    <div class="row">
        <h3 class="text-center">Mi Perfil</h3>
        <div class="card shadow-sm my-2">
            <div class="mt-2">
                <p>
                    <fa color="green" :icon="['fas', 'user']" /> | {{ userData.name }}
                </p>
                <p>
                    <fa color="green" :icon="['fas', 'user-tag']" /> | {{ userData.university_id }}
                </p>
                <p>
                    <fa color="green" :icon="['fas', 'at']" /> | {{ userData.email }}
                </p>
                <p>
                    <fa color="green" :icon="['fas', 'phone']" /> | 8091112222
                </p>
                <p>
                    <fa color="green" :icon="['fas', 'car-side']" /> | ¿Es Conductor? {{ isDriver ? 'Si' : 'No' }}
                </p>
            </div>
            <template v-if="!userData.driver">
                <hr>
                <button @click="registerDriver" :disabled="disableSendButton"
                    v-if="!disableSendButton && !userData.driverRequest" type="submit"
                    :class="disableSendButton ? 'btn-secondary' : 'btn-primary'" class="btn ">Solicitar ser
                    conductor</button>
                <p v-else-if="disableSendButton">Su solicitud para ser conductor ya fue enviada.</p>
                <p v-else-if="userData.driverRequest">Su solicitud (#{{ userData.driverRequest }}) para ser conductor está
                    pendiente.</p>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { mapGetters } from 'vuex';

export default defineComponent({
    setup() {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            disableSendButton: false
        }
    },
    computed: {
        ...mapGetters({
            userData: 'getUserData',
            isDriver: 'getIsDriver'
        }),
    },
    methods: {
        registerDriver() {
            this.$store.dispatch('requestAsDriver').then(() => {
                this.disableSendButton = true;
            })
        }
    }
})
</script>