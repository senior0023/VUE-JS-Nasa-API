import Vue from 'vue'
import Router from 'vue-router'
import listView from './components/list-view.vue'
import itemDetails from './components/item-details.vue'

Vue.use(Router)

export default new Router({
  /*mode: 'history',
  base: process.env.BASE_URL,*/
  routes: [{
    path: '/',
    name: 'List',
    component: listView,
  }, {
    path: 'details',
    name: 'details',
    component: itemDetails,
  }, ]
})