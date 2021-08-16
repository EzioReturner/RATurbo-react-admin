export interface LayoutProps {
  header?: React.ReactNode;
  siderBar?: React.ReactNode;
  siteLogo?: React.ReactNode;
}

export interface SkeletonProps extends LayoutProps {
  isHorizontalNavigator: boolean; // 启用水平导航模式
}
