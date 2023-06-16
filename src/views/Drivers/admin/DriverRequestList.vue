<template>
    <div>
    <h3 class="text-center mb-4">Solicitudes</h3>
    <div class="card shadow-sm mb-3 p-3" id="filters">
      Filtrar por Estatus
      <select class="form-select" v-model="selectedStatusFilter">
        <option value="">Todos</option>
        <option v-for="statuss in requestStatus" :value="statuss" :key="statuss">{{ statuss }}</option>
      </select>
    </div>
    <div class="container-fluid">
      <div class="row card shadow-sm p-3 mb-2" v-for="request in filteredDriverRequest" :key="request.id">
        <div class="col-md-6 text-start align-items-center">
          <div class="my-1">
            <p class="mb-0"><strong><fa color="green" :icon="['fa', 'pen']" /> | Solicitud #{{ request.id }}</strong></p>
            <p class="mb-0"><strong><fa color="green" :icon="['fa', 'user']" /> | Conductor {{ request.user.name }}</strong></p>
            <p class="mb-0"><strong><fa color="green" :icon="['fa', 'circle-question']" /> | Estado: {{ selectedDecisionChoice(request.decision) }}</strong></p>
            <p><fa color="green" :icon="['fa', 'calendar-days']" /> | Fecha: {{ formattedDate(request.created_at) }}</p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="m-1 text-end">
            <button class="btn btn-outline-success btn-sm" @click="showDetails(request.id)">Ver Detalles</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { mapGetters, mapState } from 'vuex';
import type { NamedChoices } from '@/models/CommonModels';

export default defineComponent({
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            disableSendButton: false,
            selectedStatusFilter: '',
            requestStatus: ['Aprobado', 'Rechazado']
        }
    },
    computed: {
        ...mapGetters({
            driverRequests: 'getDriverRequests',
            requestDecisionChoices: 'getDriverDecisionChoices'
        }),
        ...mapState({
          interruptLoad: 'interruptGet'
        }),
        filteredDriverRequest() {
            if (!this.selectedStatusFilter) {
                return this.driverRequests;
            } else {
                const selectedStatus = this.requestDecisionChoices.find((r: NamedChoices) => r.name == this.selectedStatusFilter).id;
                return this.driverRequests.filter((request: { decision: number; }) => request.decision === parseInt(selectedStatus));
            }
        }
    },
    methods: {
        selectedDecisionChoice(id: string) {
          if (id) return this.requestDecisionChoices.find((r: NamedChoices) => r.id == id).name;
          return 'Pendiente'
        },
        formattedDate(date: string) {
            return date.substring(0, 10);
        },
        registerDriver(){
            this.$store.dispatch('requestAsDriver').then(() => {
                this.disableSendButton = true;
            })  
        },
        showDetails(routeId: string) {
            this.$router.push({ name: 'DriverRequestDetail', params: { id: routeId }})
        }
    },
    mounted() {
        if (this.interruptLoad) {
          this.$store.commit('SET_INTERRUPT_LOAD')
        } else {
          this.$store.dispatch('getDriverRequests');
        }
    }
})
</script>