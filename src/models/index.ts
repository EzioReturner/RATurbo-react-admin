export interface Breadcrumb {
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
export interface PageHeaderProps {
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
export interface RouteChild {
  name?: string;
  icon?: string;
  path: string;
  authority?: string[] | string;
  component?: string[];
  routes?: RouteChild[];
  hideMenu?: boolean;
  exact?: boolean;
  redirect?: string;
  meta?: any;
  loading?: boolean;
}

export interface RouteConfig {
  name?: string;
  icon?: string;
  path?: string;
  authority?: string[] | string;
  component?: string[];
  routes?: RouteChild[];
}
