<template>
  <app-header></app-header>
  <RouterView />
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