import { createRouter, createWebHistory } from 'vue-router'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: DetailView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
