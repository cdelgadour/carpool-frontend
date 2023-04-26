import type { App } from 'vue';
import axios from '../axiosConfig';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$axios = axios;
  },
};
