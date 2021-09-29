// 第三方套件放上方
import Vue from 'vue';

// font-awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronCircleRight, faListUl, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 自己撰寫的放下方
import App from './App.vue';
import './assets/tailwind.css';
import dateFilter from './filters/dateFilter';

library.add(
  faChevronCircleRight, faListUl, faTrashAlt,
);

Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.filter('dateFilter', dateFilter);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
