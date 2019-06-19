export const constantRouteConfig = [
  // user
  {
    path: '/user',
    component: ['/layout/UserLayout', 'fadeRA'],
    routes: [{
      name: 'Login',
      path: '/login',
      component: ['/views/User/Login']
    }]
  },
  // app
  {
    path: '/',
    component: ['/layout/MainLayout', 'fadeRA'],
    authority: ['admin', 'guest'],
    routes: []
  }
];

export const asyncRouteConfig = [{
    name: 'dashboard',
    icon: 'pie-chart',
    path: '/dashboard',
    component: ['/views/Dashboard']
  },
  {
    path: '/',
    exact: true,
    redirect: '/dashboard',
    hideMenu: true
  },
  {
    name: 'program',
    icon: 'appstore',
    path: '/program',
    routes: [{
        name: 'analysis',
        path: '/analysis',
        component: ['/views/Program/Analysis'],
        authority: ['admin']
      },
      {
        name: 'monitor',
        path: '/monitor',
        component: ['/views/Program/Monitor']
      },
      {
        name: 'platform',
        path: '/platform',
        component: ['/views/Program/Platform']
      }
    ]
  },
  {
    name: 'form',
    icon: 'form',
    path: '/form',
    routes: [{
        name: 'basicForm',
        path: '/basicForm',
        component: ['/views/Form/BasicForm'],
        authority: ['admin']
      },
      {
        name: 'stepForm',
        path: '/stepForm',
        component: ['/views/Form/StepForm']
      },
      {
        name: '三级菜单',
        path: '/test',
        routes: [{
          name: '三级菜单',
          path: '/test1',
          component: ['/views/Form/TestDetail']
        }]
      }
    ]
  },
  {
    name: 'list',
    icon: 'ordered-list',
    path: '/list',
    routes: [{
        name: 'basicList',
        path: '/basicList',
        component: ['/views/List/BasicList'],
      },
      {
        name: 'cardList',
        path: '/cardList',
        component: ['/views/List/CardList'],
      },
      {
        name: 'basicTable',
        path: '/basicTable',
        component: ['/views/List/BasicTable'],
      }
    ]
  },
  {
    name: 'map',
    icon: 'heat-map',
    path: '/map',
    component: ['/views/Map'],
    authority: ['admin']
  },
  {
    name: 'gallery',
    icon: 'picture',
    path: '/gallery',
    component: ['/views/Gallery', 'notAnimate'],
    authority: ['admin']
  },
  {
    name: 'result',
    icon: 'check-circle',
    path: '/result',
    routes: [{
        name: 'successResult',
        path: '/successResult',
        component: ['/views/Result/SuccessResult'],
      },
      {
        name: 'failedResult',
        path: '/failedResult',
        component: ['/views/Result/FailedResult'],
      }
    ]
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    routes: [{
        name: '403',
        path: '/403',
        component: ['/views/Exception/403', 'bounceIn-animated']
      },
      {
        name: '404',
        path: '/404',
        component: ['/views/Exception/404']
      },
      {
        name: '500',
        path: '/500',
        component: ['/views/Exception/500']
      },
      {
        name: 'index',
        path: '/home',
        component: ['/views/Exception'],
        hideMenu: true
      }
    ]
  }
];