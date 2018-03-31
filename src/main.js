import Vue from 'vue';
import App from './App';
import './filters';  // Register Global Vue Filter 
import './mixin';   // Global Mixin

import store from './store';
import router from './router';
import Mint from './mintUi';
import VueFractionGrid from 'vue-fraction-grid';

// Inject Global Css And Themes Css
import './sass/index.scss';
import './sass/themes/default.scss';
import 'swiper/dist/css/swiper.css';

Vue.config.productionTip = false;

// Sync Register Global Components
//Vue.component('fallback', resolve => resolve(require('./components/fallback')));

Vue.use(VueFractionGrid, {
    container: '1020px',
    gutter: '24px',
    approach: 'mobile-first',
    breakpoints: {
        compact: '320px 414px'
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
