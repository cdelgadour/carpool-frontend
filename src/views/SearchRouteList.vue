<template>
    <div class="container">
        <div class="row">
            <span @click="goBack" class="mb-3">
                <fa :icon="['fas', 'chevron-left']" style="color: var(--unphu-blue)" size="xl"/><br>
            </span>
            <div class="col">
                <h3 class="p-0 mx-0">Buscar un viaje</h3>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label for=""><strong>Fecha</strong></label>
                <VueDatePicker
                    class="p-0 mb-3"
                    prevent-min-max-navigation
                    disable-month-year-select
                    :min-date="todayDate"
                    :max-date="limitDate"
                    v-model="chosenDate"
                    :enable-time-picker="false"
                    ></VueDatePicker>
            </div>
        </div>
        <div class="row align-items-center">
            <div class="col-8">
                <label for=""><strong>Tipo de viaje</strong></label><br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="2" v-model="chosenType">
                    <label class="form-check-label" for="inlineRadio1">Desde UNPHU</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" v-model="chosenType">
                    <label class="form-check-label" for="inlineRadio2">Hacia UNPHU</label>
                </div>
            </div>
            <div class="col-4">
                <button :disabled="!applyFilter"  @click="toggleFilter" :class="onFilter ? 'btn-danger' : 'btn-primary'" class="btn">
                    {{ !onFilter ? 'Buscar' : 'Remover'}}
                </button>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-12">
                <div class="card px-3 py-3 mb-3" v-for="trip in filteredTrips" :key="trip.id" @click="goToDetail(trip.id)">
                    <p class="mb-1"><strong>Viaje #{{ trip.id }}</strong></p>
                    <p class="m-0"><strong>Tipo de Viaje:</strong> {{ trip.trip_type == 1 ? 'Hacia UNPHU' : 'Desde UNPHU'}}</p>
                    <p class="m-0"><strong>Fecha:</strong> {{ formattedDate(trip.scheduled_date) }}</p>
                    <p class="m-0"><strong>Estatus:</strong> {{ trip.status ? selectedDecisionChoice(trip.status) : '' }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { NamedChoices, Trip } from '@/models/CommonModels';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    data() {
        return {
            message: '< Ir atrás',
            chosenDate: null,
            chosenType: null,
            onFilter: false
        }
    },
    computed: {
        ...mapGetters({
            trips: 'getDriverTrips',
            tripStatusList: 'getTripStatus'
        }),
        todayDate() {
            return new Date();
        },
        limitDate() {
            return new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
        },
        applyFilter() {
            return this.chosenDate && this.chosenType
        },
        filteredTrips() {
            if (this.applyFilter && this.onFilter) {
                let selectedDate = (this.chosenDate as any).toISOString().slice(0,10);
                let filtered = this.trips.filter((t: Trip) => (t.scheduled_date as any).slice(0, 10) == selectedDate)
                                .filter((t: Trip) => t.trip_type == this.chosenType)
                return filtered
            }
            return this.trips
        }
    },
    mounted() {
        this.$store.dispatch('getDriverTrips')
    },
    methods: {
        toggleFilter() {
            if (this.onFilter) {
                this.chosenDate = null;
                this.chosenType = null;
            }
            this.onFilter = !this.onFilter
        },
        formattedDate(date: string) {
            if (!date) return;
            return date.replace('T', ' ').replace('Z', '');
        },
        goToDetail(id: string) {
            this.$router.push({ name: 'TripDetailRoute', params: { id: id }})
        },
        goBack() {
            this.$router.push({ name: 'MainView' })
        },
        selectedDecisionChoice(id: string) {
            if (this.tripStatusList) {
                return this.tripStatusList.find((tripStatus: NamedChoices) => tripStatus.id == id).name;
            }
            return ''
        }
    }
})
</script>

<style scoped>
span {
    padding: 0;
    cursor: pointer;
}
label {
    padding: 0;
}
.card {
    box-shadow: 1px 2px 5px 1px #4494414d;
    cursor: pointer;
}
</style>