import statsMeta from './routerStats'

export default [
  {
    path: '/',
    component: () => import('layouts/default.vue'),
    children: [
      {
        path: '/icor',
        component: () => import('pages/icor/manager/main.vue'),
        meta: { name: 'ICORManager' }
      },
      {
        path: '/stats/:id',
        component: () => import('pages/icor/stats/stats.vue'),
        props: true,
        meta: statsMeta.meta
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/userpages.vue'),
    meta: { name: 'Logowanie' },
    children: [
      { path: '/', component: () => import('pages/login.vue'), meta: { name: 'Logowanie' } }
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
