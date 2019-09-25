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
  component: string[];
  routes?: RouteChild[];
  hideMenu?: boolean;
}

export interface RouteConfig {
  path: string;
  component: string[];
  authority?: string[] | string;
  routes?: RouteConfig[];
  icon?: string;
  name?: string;
}
