<template>
    <div>
        <h3 class="text-center mb-4">Pagos obtenidos</h3>
        <div>
            <div class="text-center mt-5" v-if="payments.length === 0">
                <h4 class="text-danger mb-4">No ha recibido ningun pago.</h4>
                <img style="height: 12rem;" src="~@/assets/404.jpg" />
            </div>
            <div class="card shadow-sm mb-2" v-for="payment in payments" :key="payment.id">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 text-start align-items-center">
                            <div class="m-1">
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
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { CommonUtils } from '@/utils/CommonUtils';

export default defineComponent({
    methods: {
        formatDate(date: string) {
            return CommonUtils.formatDate(date);
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
  