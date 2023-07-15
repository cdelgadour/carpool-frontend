<template>
    <div class="container">
        <div class="row">
            <span @click="goBack" class="mb-3">
                <fa :icon="['fas', 'chevron-left']" style="color: var(--unphu-blue)" size="xl"/><br>
            </span>
            <div class="col">
                <h3 class="p-0 mx-0">Pagos obtenidos</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label for=""><strong>Filtrar por Fecha</strong></label>
                <VueDatePicker
                    class="p-0"
                    prevent-min-max-navigation
                    disable-month-year-select
                    :min-date="todayDate"
                    :max-date="limitDate"
                    v-model="chosenDate"
                    ></VueDatePicker>
            </div>
        </div>
        <hr>
        <div class="row">
        <div>
            <div class="text-center mt-5" v-if="payments.length === 0">
                <h4 class="text-danger mb-4">No ha recibido ningun pago.</h4>
                <img style="height: 12rem;" src="~@/assets/404.jpg" />
            </div>
            <div class="card shadow-sm mb-3 p-2" v-for="(payment, i) in payments" :key="payment.id">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-start align-items-center">
                            <div class="m-1">
                                <p><strong>Viaje #{{ i + 12 }}</strong></p>
                                <b>Fecha de Pago:</b> <label>{{ formatDate(payment.payment_date) }}</label>
                                <br />
                                <b>Monto recibido:</b> RD$<label>{{ payment.amount }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { CommonUtils } from '@/utils/CommonUtils';

export default defineComponent({
    data() {
        return {
            todayDate: null,
            limitDate: null,
            chosenDate: null
        }
    },
    methods: {
        formatDate(date: string) {
            return CommonUtils.formatDate(date);
        },
        goBack() {
            this.$router.push({ name: 'MainView' })
        }
    },
    computed: {
        ...mapGetters({
            payments: 'getDriverPayments'
        }),
    },
    mounted() {
        this.$store.dispatch('getDriverPayments');
    }
});
</script>
  
<style scoped>
span {
    padding: 0;
    cursor: pointer;
}
</style>