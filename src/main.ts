// Legacy browsers support
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'intersection-observer' // Optional

// Vue.js
import Vue from 'vue';

// i18n
import VueI18n from "vue-i18n";
import {i18n} from "@/lang";
// Bootstrap import
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Vue.js Router
import Router from 'vue-router';
import router from './router';
// VueX
import store from './store';
// PortalVue
import PortalVue from 'portal-vue';

// Application main component
import App from './App.vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// import './style/app.scss'; // Use only if some styles need to be replaced!!!
import './style/main.css';

Vue.config.productionTip = false;

Vue.use(VueI18n);
Vue.use(PortalVue);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Router);

// Prism.js Editor
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles
Vue.component('PrismEditor', PrismEditor);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');