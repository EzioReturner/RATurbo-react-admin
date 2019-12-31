import { RouteConfig, RouteChild } from '@models/index';
export const constantRouteConfig: { app: RouteConfig; user: RouteConfig } = {
  app: {
    path: '/',
    component: ['/layout/MainLayout', 'fadeRA'],
    authority: ['admin', 'guest'],
    routes: []
  },
  user: {
    path: '/user',
    component: ['/layout/UserLayout', 'fadeRA'],
    routes: [
      {
        name: 'Login',
        path: '/user/login',
        component: ['/views/User/Login']
      }
    ]
  }
};

/**
 * 路由配置
 * @param path {string} 路由路径
 * @param name {string} 菜单名称、可以作为key来映射国际化菜单名
 * @param icon {string} 菜单图标
 * @param componet {string[]} 加载组件的项目路径位置，必须为数组，第一项路径，第二项配置组件进入动画class
 * @param hiddeMenu {boolean} 菜单中是否显示
 * @param routes {object[]} 子路由信息
 * @param rest 可接收 react-router-dom 参数
 */

export const asyncRouteConfig: RouteChild[] = [
  {
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
    name: 'result',
    icon: 'check-circle',
    path: '/result',
    routes: [
      {
        name: 'successResult',
        path: '/result/successResult',
        component: ['/views/Result/SuccessResult']
      },
      {
        name: 'failedResult',
        path: '/result/failedResult',
        component: ['/views/Result/FailedResult']
      }
    ]
  },
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    routes: [
      {
        name: '403',
        path: '/exception/403',
        component: ['/views/Exception/403', 'bounceIn-animated']
      },
      {
        name: '404',
        path: '/exception/404',
        component: ['/views/Exception/404']
      },
      {
        name: '500',
        path: '/exception/500',
        component: ['/views/Exception/500']
      },
      {
        name: 'index',
        path: '/exception/home',
        component: ['/views/Exception'],
        hideMenu: true
      }
    ]
  }
];
