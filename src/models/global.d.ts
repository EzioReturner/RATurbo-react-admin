declare interface StoreKeyValue {
  [name: string]: StoreValue;
}

declare type StoreValue = any;

declare const NODE_RA_ENV: string = 'development' | 'production';

declare const REQUEST_SUCCESS: number = 0;

declare interface Window {
  less: any;
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

declare interface PageWrapperProps extends PageHeaderProps {
  hideHeader?: React.ReactNode;
  style?: React.CSSProperties;
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
 * @search 用于匹配携带query的路由
 * @type 路由类型 normal 正常， micro 微应用路由
 * @localeKey 国际化key
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
  search?: string;
  type?: 'normal' | 'micro';
  localeKey?: string;
}

declare interface RouteRoot {
  name?: string;
  icon?: React.ReactNode | string;
  path?: string;
  authority?: string[] | string;
  component?: [string | React.ReactNode, string] | [string | React.ReactNode];
  routes?: RouteChild[];
}
