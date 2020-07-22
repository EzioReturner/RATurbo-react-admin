import React from 'react';
import {
  PieChartOutlined,
  AppstoreOutlined,
  FormOutlined,
  UnorderedListOutlined,
  HeatMapOutlined,
  PictureOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

export const constantRouteConfig: { app: RouteRoot; user: RouteRoot } = {
  app: {
    path: '/',
    component: ['/skeleton/Main', 'fadeRA'],
    authority: ['admin', 'guest'],
    routes: []
  },
  user: {
    path: '/user',
    component: ['/skeleton/User', 'fadeRA'],
    routes: [
      {
        name: 'Login',
        path: '/user/login',
        component: ['/views/User/Login']
      },
      {
        name: 'identifyUser',
        path: '/user/identifyUser',
        component: ['/components/Authorized/IdentifyUser', 'fadeRA']
      }
    ]
  }
};

export const asyncRouteConfig: RouteChild[] = [
  {
    path: '/',
    exact: true,
    redirect: '/dashboard',
    hideMenu: true
  },
  {
    name: 'dashboard',
    icon: <PieChartOutlined />,
    path: '/dashboard',
    component: ['/views/Dashboard'],
    loading: true,
    localeKey: 'menu.dashboard'
  },
  {
    name: 'program',
    icon: <AppstoreOutlined />,
    path: '/program',
    localeKey: 'program',
    routes: [
      {
        name: 'analysis',
        path: '/program/analysis',
        component: ['/views/Program/Analysis'],
        authority: ['admin'],
        loading: true,
        localeKey: 'menu.program.analysis'
      },
      {
        name: 'monitor',
        path: '/program/monitor',
        component: ['/views/Program/Monitor'],
        loading: true,
        localeKey: 'menu.program.monitor'
      },
      {
        name: 'platform',
        path: '/program/platform',
        component: ['/views/Program/Platform'],
        loading: true,
        localeKey: 'menu.program.platform'
      },
      {
        name: 'unit',
        path: '/program/unit',
        component: ['/views/Program/Unit'],
        loading: true,
        localeKey: 'menu.program.unit'
      }
    ]
  },
  {
    name: 'form',
    icon: <FormOutlined />,
    path: '/form',
    localeKey: 'menu.form',
    routes: [
      {
        name: 'basicForm',
        path: '/form/basicForm',
        component: ['/views/Form/BasicForm'],
        authority: ['admin'],
        loading: true,
        localeKey: 'menu.form.basicForm'
      },
      {
        name: 'stepForm',
        path: '/form/stepForm',
        component: ['/views/Form/StepForm'],
        localeKey: 'menu.form.stepForm'
      },
      {
        name: '三级菜单',
        path: '/form/test',
        routes: [
          {
            name: '三级菜单',
            path: '/form/test/test1',
            component: ['/views/Form/TestDetail']
          }
        ]
      }
    ]
  },
  {
    name: 'list',
    icon: <UnorderedListOutlined />,
    path: '/list',
    localeKey: 'menu.list',
    routes: [
      {
        name: 'basicList',
        path: '/list/basicList',
        component: ['/views/List/BasicList'],
        loading: true,
        localeKey: 'menu.list.basicList'
      },
      {
        name: 'cardList',
        path: '/list/cardList',
        component: ['/views/List/CardList'],
        loading: true,
        localeKey: 'menu.list.cardList'
      },
      {
        name: 'basicTable',
        path: '/list/basicTable',
        component: ['/views/List/BasicTable'],
        localeKey: 'menu.list.basicTable'
      }
    ]
  },
  {
    name: 'map',
    icon: <HeatMapOutlined />,
    path: '/map',
    component: ['/views/Map'],
    authority: ['admin'],
    localeKey: 'menu.map'
  },
  {
    name: 'gallery',
    icon: <PictureOutlined />,
    path: '/gallery',
    component: ['/views/Gallery'],
    authority: ['admin'],
    localeKey: 'menu.gallery'
  },
  {
    name: 'result',
    icon: <CheckCircleOutlined />,
    path: '/result',
    localeKey: 'menu.result',
    routes: [
      {
        name: 'successResult',
        path: '/result/successResult',
        component: ['/views/Result/SuccessResult'],
        localeKey: 'menu.result.successResult'
      },
      {
        name: 'failedResult',
        path: '/result/failedResult',
        component: ['/views/Result/FailedResult'],
        localeKey: 'menu.result.failedResult'
      }
    ]
  },
  {
    name: 'exception',
    icon: <InfoCircleOutlined />,
    path: '/exception',
    localeKey: 'menu.exception',
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
