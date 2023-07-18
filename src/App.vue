<template>
  <app-header></app-header>
  <loading :active="isLoading"></loading>
  <auxModal></auxModal>
  <notifications 
    position="top center" 
    width="100%"
    classes="notification-blue"
    />
  <div class="container mt-2 px-4">
    <div class="row">
      <div class="col-0 col-lg-2"></div>
      <div class="col">
        <RouterView />
      </div>
      <div class="col-0 col-lg-2"></div>
    </div>
  </div>
</template>

<script lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { Modal } from 'bootstrap';
import auxModal from './components/layout/auxModal.vue'

export default defineComponent({
  data() {
    return {
      modalInstance: null as Modal | null,
    }
  },
  components: {
    AppHeader,
    Loading,
    auxModal
  },
  computed: {
    ...mapGetters({
      isLoading: 'getIsLoading',
      showSuccessModal: 'getSuccessModal'
    })
  },
  methods: {
    showModal() {
      this.modalInstance?.show()
    },
    hideModal() {
      this.modalInstance?.hide()
    }
  },
  watch: {
    showSuccessModal(value: boolean) {
      if (value) this.showModal();
      else this.hideModal();
    }
  },
  mounted() {
    
    this.$store.dispatch('getUserData');
    const modalElement = document.getElementById('successModal');
        if (modalElement && modalElement instanceof Element) {
            this.modalInstance = new Modal(modalElement)
        }
  }
})
</script>

<style>
@import "vue-select/dist/vue-select.css";
.notification-blue  {
    font-size: 1em;
    padding: 0.5em;
    background-color: var(--unphu-blue) !important;
    color: white !important;
}
</style>