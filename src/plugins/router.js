import { createRouter, createWebHashHistory } from 'vue-router'
import Search from '../components/Search.vue'
import DetailView from '../components/DetailView.vue'

const routes = [
  {
    path: '/',
    redirect: '/search/stelle/'
  },{
    path: '/search/',
    redirect: '/search/stelle/'
  },
  {
    path: '/search/:type/:search?',
    name: 'Search',
    component: Search,
    props: true,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
