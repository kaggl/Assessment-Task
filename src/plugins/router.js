import { createRouter, createWebHashHistory } from 'vue-router';

import Search from '@/components/Search';
import DataTable from '@/components/DataTable';
import VisComponent from '@/components/VisComponent';
import Leaflet from '@/components/Leaflet';
import PassageDetails from '@/components/PassageDetails';

const routes = [
  {
    path: '/',
    redirect: '/en/search/stelle',
  },
  {
    path: '/:locale/',
    name: 'Locale',
    component: {
      template: "<router-view></router-view>"
    },
    redirect: '/:locale/search/stelle',
    children: [
      {
        path: 'search',
        component: Search,
        name: 'Search',
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
        path: 'detail/:id',
        name: 'Detail',
        component: PassageDetails,
      }
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
