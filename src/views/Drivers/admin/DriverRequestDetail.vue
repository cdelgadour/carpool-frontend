<template>
    <div class="row">
        <button @click="goToDriverRequestList" class="btn btn-primary mb-3">Ir atrás</button>
        <div class="card shadow-sm p-4" v-if="selectedRequest">
            <div class="col-md-12">
                <h2>Solicitud #{{ selectedRequest.id }}</h2>
                <p class="mb-0">Nombre: {{ selectedRequest.user.name }}</p>
                <p>Correo: {{ selectedRequest.user.email }}</p>
                <p>Matrícula: {{ selectedRequest.user.university_id }}</p>
            </div>
            <div class="row" v-if="!isCompleted">
                <div class="col">
                    <button @click="showModal('R')" class="w-100 btn btn-danger">Rechazar</button>
                </div>
                <div class="col">
                    <button @click="showModal('A')" class="w-100 btn btn-primary">Aceptar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Confirmar</h5>
            </div>
            <div class="modal-body">
                {{ modalText }}
            </div>
            <div class="modal-footer">
                <button type="button" @click="confirmAction('')" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                <button type="button" @click="confirmAction('confirm')" class="btn btn-primary">Confirmar</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { DriverRequests } from '@/models/CommonModels';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { Modal } from 'bootstrap';

export default defineComponent({
    data() {
        return {
            disableSendButton: false,
            modalInstance: null as Modal | null,
            modalText: '',
            decision: ''
        }
    },
    computed: {
        ...mapGetters({
            driverRequests: 'getDriverRequests'
        }),
        selectedRequest() {
            const selectedId = this.$route.params.id;
            if (this.driverRequests) return this.driverRequests.find((req: DriverRequests) => req.id == selectedId)
            return []
        },
        isCompleted() {
            if (this.selectedRequest) return this.selectedRequest.decision != null;
            return false;
        }
    },
    mounted() {
        const modalElement = document.getElementById('confirmModal');
            if (modalElement && modalElement instanceof Element) {
                this.modalInstance = new Modal(modalElement)
            }
    },
    methods: {
        goToDriverRequestList() {
            this.$router.push({ name: 'DriverRequests' })
        },
        showModal(option: string) {
            this.modalText = option == 'R' ? '¿Desea rechazar esta petición?' : '¿Desea aprobar esta petición?';
            this.decision = option;
            this.modalInstance?.show()
        },
        hideModal() {
            const modalElement = document.getElementById('confirmModal');
            this.modalInstance?.hide()
        },
        confirmAction(action = '') {
            this.hideModal();
            this.modalText = '';
            if (action) {
                const data = { id: this.selectedRequest.id, decision: this.decision == 'R' ? 1 : 2};
                this.$store.commit('SET_INTERRUPT_LOAD');
                this.$store.dispatch('decideOnRequest', data);
                this.goToDriverRequestList();
            }
        },
        registerDriver(){
            this.$store.dispatch('requestAsDriver').then(() => {
                this.disableSendButton = true;
            })  
        }
    }
})
</script>