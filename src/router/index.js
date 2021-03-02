import Vue from 'vue'
import VueRouter from 'vue-router'
import Restaurant from '../views/restaurant/Restaurant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Restaurant',
    component: Restaurant,
    meta: {
      title: '这里是默认标题'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
