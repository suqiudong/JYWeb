import Vue from 'vue';
import Router from 'vue-router';


import Index from '../components/index/index.vue'
import Register from '../components/register/register.vue'
import Card from '../components/card/card.vue'
import Inquire from '../components/inquire/inquire.vue'
import RegSelect from '../components/regSelect/regSelect.vue'
import Order from '../components/order/order.vue'
import Modifier from '../components/modifier/modifier.vue'
import InquireOrder from '../components/inquireOrder/inquireOrder.vue'
import Record from '../components/record/record.vue'
import Pay from '../components/pay/pay.vue'
import UnEngender from '../components/unEngender/unEngender.vue'
import CloudOrder from '../components/cloudOrder/cloudOrder.vue'
import Add from '../components/add/add.vue'
import NewRegister from '../components/newRegister/newRegister.vue'
import Bind from '../components/bind/bind.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'idnex',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/card',
      name: 'card',
      component: Card
    },
    {
      path: '/inquire',
      name: 'inquire',
      component: Inquire
    },
    {
      path: '/regSelect',
      name: 'regSelect',
      component: RegSelect
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/modifier',
      name: 'modifier',
      component: Modifier
    },
    {
      path: '/inquireOrder',
      name: 'inquireOrder',
      component: InquireOrder
    },
    {
      path: '/record',
      name: 'record',
      component: Record
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/unEngender',
      name: 'unEngender',
      component: UnEngender
    },
    {
      path: '/cloudOrder',
      name: 'cloudOrder',
      component: CloudOrder
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/newRegister',
      name: 'newRegister',
      component: NewRegister
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind
    }
  ]
});
