export interface Breadcrumb {
  name: string;
  path: string;
  display: boolean;
}

export interface PageHeaderProps {
  hideBreadcrumb?: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  content?: React.ReactNode;
  extraContent?: React.ReactNode;
  logo?: React.ReactNode;
}

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
}

export interface RouteConfig {
  name?: string;
  icon?: string;
  path?: string;
  authority?: string[] | string;
  component?: string[];
  routes?: RouteChild[];
}
