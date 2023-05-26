<template>
    <div>
        <h2>Pagos obtenidos</h2>
        <div>
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
  