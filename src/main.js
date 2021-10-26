// 第三方套件放上方
import Vue from 'vue';

// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronCircleRight, faListUl, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// 自己撰寫的放下方
import App from './App.vue';
import './assets/tailwind.css';

library.add(
  faChevronCircleRight, faListUl, faTrashAlt,
);

dayjs.extend(customParseFormat);

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.prototype.$dayjs = dayjs;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
