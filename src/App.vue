<template>
  <app-header></app-header>
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
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    AppHeader
  },
  mounted() {
    this.$store.dispatch('getUserData');
  }
})
</script>

<style>
@import "vue-select/dist/vue-select.css";
</style>