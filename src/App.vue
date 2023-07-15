<template>
  <app-header></app-header>
  <loading :active="isLoading"></loading>
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

export default defineComponent({
  components: {
    AppHeader,
    Loading
  },
  computed: {
    ...mapGetters({
      isLoading: 'getIsLoading'
    })
  },
  mounted() {
    this.$store.dispatch('getUserData');
  }
})
</script>

<style>
@import "vue-select/dist/vue-select.css";
</style>