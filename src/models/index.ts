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
