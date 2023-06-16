<template>
  <app-header></app-header>
  <div class="container mt-2 px-4">
    <RouterView />
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