export default [
  {
    path: '/',
    component: '../layouts/basicLayout',
    routes: [
      // guest
      {
        path: '/login',
        Routes: ['src/pages/guest/authorized', 'src/layouts/userLayout'],
        component: './guest/login',
      },
      {
        path: '/register',
        Routes: ['src/pages/guest/authorized', 'src/layouts/userLayout'],
        component: './guest/register',
      },
      // app
      {
        path: '/',
        Routes: ['src/pages/app/authorized'],
        component: './app',
      },
      { component: './error/404' },
    ],
  },
]
