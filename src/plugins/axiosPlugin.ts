import type { App } from 'vue';
import axios from '../axiosConfig';
import store from '../store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios;
    $store: typeof store;
  }
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$store = store;
  },
};
