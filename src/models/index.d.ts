/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare interface StoreKeyValue {
  [name: string]: StoreValue;
}

declare type StoreValue = any;

declare const NODE_RA_ENV: string = 'development' | 'production';

declare const REQUEST_SUCCESS: number = 0;

declare interface Window {
  less: any;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default ReactComponent;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare interface Breadcrumb {
  name: string;
  path: string;
  display: boolean;
}

/**
 * @hideBreadcrumb 隐藏面包屑
 * @withoutHeaderBody 只需要面包屑
 * @title 标题
 * @subTitle 副标题
 * @content 内容
 * @extraContent 右侧额外内容
 * @logo logo
 */
declare interface PageHeaderProps {
  hideBreadcrumb?: boolean;
  withoutHeaderBody?: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  logo?: React.ReactNode;
}

/**
 * @name 组件名称
 * @icon 菜单对应的图标
 * @path 路由对应路径
 * @authority 路由对应权限
 * @component [组件路径， 组件加载动画名]
 * @routes 子路由
 * @hideMenu 是否显示菜单
 * @exact 精确匹配
 * @redirect 重定向路由
 * @meta 元信息
 * @loading 异步加载时间过长开启loading
 */
declare interface RouteChild {
  name?: string;
  icon?: React.ReactNode | string;
  path: string;
  authority?: string[] | string;
  component?: [string | React.ReactNode, string] | [string | React.ReactNode];
  routes?: RouteChild[];
  hideMenu?: boolean;
  exact?: boolean;
  redirect?: string;
  meta?: any;
  loading?: boolean;
}

declare interface RouteRoot {
  name?: string;
  icon?: React.ReactNode | string;
  path?: string;
  authority?: string[] | string;
  component?: [string | React.ReactNode, string] | [string | React.ReactNode];
  routes?: RouteChild[];
}
