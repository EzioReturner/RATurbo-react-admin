import { observable, configure, action, computed } from 'mobx';
import isMobile from '@utils/isMobile';
import { debounce } from '@utils/tools';
import NProgress from 'nprogress';
import {
  useMenu,
  useHeader,
  layoutMode,
  navigateMode,
  contentAreaWidthMode
} from '@config/setting';
import { constantRouteConfig, asyncRouteConfig } from '@config/router.config';
import { userStore } from './userStore';
import intersection from 'lodash/intersection';
import { message } from 'antd';
import { changeTheme } from '@utils/theme';

interface LoadingOptions {
  fixed?: boolean; // 只覆盖路由可视区域
  spinning: boolean; // 开启关闭遮罩
  text?: string | number | React.ReactNode; // 文案
}

interface LayoutStatus extends StoreKeyValue {
  showSiderBar: boolean;
  showHeader: boolean;
  layoutMode: 'split' | 'inline';
  navigateMode: 'vertical' | 'horizontal';
  contentAreaWidthMode: 'max-width' | 'flow';
  fixSiderBar: boolean;
  fixHeader: boolean;
  visionTheme: 'light' | 'dark';
  collapsed: boolean;
  isMobile: boolean;
  currentColor: string;
}
configure({ enforceActions: 'observed' });
class LayoutStore {
  // 存放已经初始化完毕的页面
  @observable readyInitializers: Array<string> = [];

  // 开启的菜单
  @observable openMenus: Array<string> = [];

  // 面包屑列表
  @observable breadcrumbList: Array<Breadcrumb> = [];

  // 路由数据
  @observable routeConfig: Array<RouteRoot> = [];

  // 全局spinning配置信息
  @observable loadingOptions: LoadingOptions = { spinning: false };

  @observable layoutStatus: LayoutStatus = {
    showSiderBar: useMenu, // 显示头部
    showHeader: useHeader, // 显示菜单
    layoutMode: (layoutMode as 'split' | 'inline') || 'split', // 布局模式
    navigateMode: (navigateMode as 'vertical' | 'horizontal') || 'vertical', // 导航风格
    contentAreaWidthMode: (contentAreaWidthMode as 'max-width' | 'flow') || 'max-width', // 内容区域宽度
    fixSiderBar: true, // 固定左侧导航
    fixHeader: true, // 固定顶部header
    visionTheme: 'light', // 视觉主题
    collapsed: false,
    isMobile: false,
    currentColor: '#fb4491'
  };

  constructor() {
    this.initLayoutStatus();
    this.addWindowEvent();
    this.changeViewport();
    this.initMenu();
  }

  addWindowEvent(): void {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.changeViewport();
      })
    );
  }

  @computed
  get authRedirect() {
    const [, app] = this.routeConfig;
    const appRoutes = app.routes;
    if (appRoutes) {
      let redirectPath = '';
      for (let index = 0; index < appRoutes.length; index++) {
        const { redirect, authority: routeAuthority, path } = appRoutes[index];
        if (redirect || path === '/') continue;
        const allowed = !routeAuthority || intersection(userStore.authority, routeAuthority);
        if (allowed) {
          redirectPath = path;
          break;
        }
      }
      return redirectPath;
    }
    return '';
  }

  get isInlineLayout() {
    return this.layoutStatus.layoutMode === 'inline';
  }

  get isContentFlowMode() {
    return this.layoutStatus.contentAreaWidthMode === 'flow';
  }

  get isHorizontalNavigator() {
    return this.layoutStatus.navigateMode === 'horizontal';
  }

  get isDarkTheme() {
    return this.layoutStatus.visionTheme === 'dark';
  }

  @action initLayoutStatus() {
    const status = window.localStorage.getItem('RA-layoutStatus');
    if (status) {
      const _status = JSON.parse(status);
      if (
        _status.visionTheme !== this.layoutStatus.visionTheme ||
        _status.currentColor !== this.layoutStatus.currentColor
      ) {
        setTimeout(() => {
          message.loading('正在应用视觉风格', 3);
          this.changeLayoutVision();
        }, 0);
      }
      this.layoutStatus = _status;
    }
    if (this.isHorizontalNavigator) {
      this.layoutStatus.layoutMode = 'split';
    }
  }

  // 初始化菜单
  @action initMenu(): void {
    const { app, user } = constantRouteConfig;
    app.routes = asyncRouteConfig;
    this.routeConfig = [user, app];
  }

  // 动态设置路由方法
  @action setMenu(menu: Array<RouteRoot>): void {
    this.routeConfig = menu;
  }

  // 响应分辨率
  @action changeViewport(): void {
    if (navigator.userAgent.indexOf('jsdom') >= 0) return;

    const info: any = isMobile(navigator.userAgent);
    this.layoutStatus.isMobile = info.any;
    this.layoutStatus.isMobile && this.toggleCollapsed(true);
    const clientWidth = document.body.clientWidth;
    if (clientWidth < 1000) {
      this.toggleCollapsed(true);
    } else {
      this.toggleCollapsed(false);
    }
    // 移动端模式
    if (clientWidth < 600) {
      this.layoutStatus.isMobile = true;
      this.layoutStatus.layoutMode = 'split';
      this.layoutStatus.navigateMode = 'vertical';
      this.layoutStatus.fixHeader = true;
      this.layoutStatus.fixSiderBar = true;
    }
  }

  // 初始化面包屑
  @action initBreadcrumb(name: string, path: string): void {
    this.breadcrumbList.push({
      name,
      path,
      display: false
    });
  }

  // 增加面包屑
  @action addBreadcrumb = (path: string): void => {
    const cache: Breadcrumb | undefined = this.breadcrumbList.find(
      (res: Breadcrumb) => res.path === path
    );
    cache && (cache.display = true);
  };

  // 删除面包屑
  @action delBreadcrumb = (name: string, path: string): any => {
    let delSelf = false;
    this.breadcrumbList = this.breadcrumbList.reduce(
      (total: Array<Breadcrumb>, index: Breadcrumb): Array<Breadcrumb> => {
        if (index.name === name) {
          index.display = false;
          delSelf = index.path === path;
        }
        total.push(index);
        return total;
      },
      []
    );
    return delSelf ? this.breadcrumbList[0] : null;
  };

  @action ctrlSpinning = (options: LoadingOptions) => {
    this.loadingOptions = options;
  };

  @action ctrlProgress = (type: boolean) => {
    type ? NProgress.start() : NProgress.done(true);
  };

  // 记录懒加载模块并开启loading
  @action addInitializer(initializer: string, loading: boolean = false): void {
    this.readyInitializers.push(initializer);
    loading && this.ctrlSpinning({ spinning: true });
    this.ctrlProgress(true);
  }

  // 检查是否已加载过
  @action checkIsInitial(route: RouteChild): void {
    const { path, loading, name } = route;
    if (!this.readyInitializers.includes(path)) {
      this.addInitializer(path, loading);
      name && this.initBreadcrumb(name, path);
    }
  }

  // 切换collapsed
  @action toggleCollapsed = (collapsed?: any): void => {
    this.layoutStatus.collapsed = [true, false].includes(collapsed)
      ? collapsed
      : !this.layoutStatus.collapsed;
  };

  // 调整status
  @action changeLayoutStatus = (key: keyof LayoutStatus, value: any) => {
    if (key === 'navigateMode') {
      this.layoutStatus.contentAreaWidthMode = value === 'vertical' ? 'flow' : 'max-width';
    }
    this.layoutStatus[key] = value;
    if (key === 'currentColor' || key === 'visionTheme') {
      setTimeout(() => {
        this.changeLayoutVision();
      }, 0);
    }
    window.localStorage.setItem('RA-layoutStatus', JSON.stringify(this.layoutStatus));
  };

  // 调整视觉风格
  @action changeLayoutVision = () => {
    const { visionTheme, currentColor } = this.layoutStatus;
    changeTheme(visionTheme, currentColor);
  };

  // 设置打开的菜单
  @action setOpenMenus(menus: Array<string>): void {
    this.openMenus = menus;
  }
}
export const layoutStore = new LayoutStore();
export default LayoutStore;
