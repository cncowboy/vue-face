import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { Indicator } from 'mint-ui'

// 重置组件加载函数，在异步下载过程添加 加载动画
// function asyncComponent(component, resolve) {
//     Indicator.open('加载中...');
//     require.ensure([component], () => {
//       Indicator.close();
//       let loaded = require(component);
//       resolve(loaded)
//     })
//     // require.ensure([component], (loaded) => {
//     //   Indicator.close();
//     //   resolve(loaded);
//     // });
// }

Vue.use(Router)

const router = new Router({
  linkActiveClass: '',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component(resolve) {
        require(['@/components/index'], resolve);
      }
    },
    {
      path: '/select_sport',
      name: 'select_sport',
      component(resolve) {
        require(['@/components/select_sport'], resolve);
      }
    },
    {
      path: '/select_head',
      name: 'select_head',
      component(resolve) {
        require(['@/components/select_head'], resolve);
      }
    },
    {
      path: '/show_result',
      name: 'show_result',
      component(resolve) {
        require(['@/components/show_result'], resolve);
      }
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   // Indicator.open('加载中...');
//   console.log(11)
//   next();
// });

// router.afterEach((to) => {
//   store.commit('blurredPage/switchBlurredPage', to.name);
// })


export default router;
