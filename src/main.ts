import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axiosPlugin from './plugins/axiosPlugin'
import store from './store'
import ToastPlugin from 'vue-toast-notification';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';

import './assets/main.css'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)

app.use(router)
app.use(axiosPlugin)
app.use(ToastPlugin)
app.use(store);
library.add(fas)
app.component('fa', FontAwesomeIcon)
app.mount('#app')
