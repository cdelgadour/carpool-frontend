import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axiosPlugin from './plugins/axiosPlugin'
import store from './store'
import ToastPlugin from 'vue-toast-notification';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import vSelect from "vue-select";
import withUUID from "vue-uuid";
import VueDatePicker from '@vuepic/vue-datepicker'
import { LoadingPlugin } from 'vue-loading-overlay'

import './assets/main.css'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import '@vuepic/vue-datepicker/dist/main.css'
import 'vue-loading-overlay/dist/css/index.css';
import 'animate.css';

const app = withUUID(createApp(App));

app.use(router)
app.use(axiosPlugin)
app.use(ToastPlugin)
app.use(store);
app.use(LoadingPlugin)
library.add(fas)
app.component('fa', FontAwesomeIcon)
app.component('v-select', vSelect)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
