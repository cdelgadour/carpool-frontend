<template>
  <app-header></app-header>
  <div class="container mt-4 px-4">
    <RouterView />
  </div>
</template>

<script lang="ts">
import AppHeader from './components/layout/AppHeader.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    AppHeader
  }
})
</script>