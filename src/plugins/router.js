import { createRouter, createWebHashHistory } from 'vue-router';
import Search from '../components/Search';
import DataTable from '../components/DataTable';
import VisComponent from '../components/VisComponent';
import Leaflet from '../components/Leaflet';

import DetailView from '../components/DetailView';

const routes = [
  {
    path: '/',
    redirect: '/search/stelle',
  },
  {
    path: '/search/',
    component: Search,
    name: 'Search',
    redirect: '/search/stelle',
    children: [
      {
        path: 'stelle/:search?',
        name: 'DataTable',
        component: DataTable,
      },
      {
        path: 'keyword/:search?',
        name: 'VisComponent',
        component: VisComponent,
      },
      {
        path: 'map/:search?',
        name: 'Places',
        component: Leaflet,
      },
    ],
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
