import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


import { BootstrapVue, BootstrapVueIcons, FormGroupPlugin, BFormSelect, FormSelectPlugin } from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts';


import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import VueSweetalert2 from 'vue-sweetalert2';

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('b-form-select', BFormSelect)
Vue.component('apexchart', VueApexCharts);

Vue.use(VueApexCharts);
Vue.use(BootstrapVue)
Vue.use(FormGroupPlugin)
Vue.use(BootstrapVueIcons)
Vue.use(FormSelectPlugin)


Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
