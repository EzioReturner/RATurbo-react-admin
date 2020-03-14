import { getUserInfo, postLogin } from '@api/user';
import { action, configure, observable, computed } from 'mobx';

configure({ enforceActions: 'observed' });
class UserStore {
  @observable userInfo: any = {};
  @observable authority: string[] = [];

  constructor() {
    this.reloadUserInfo();
  }

  // 获取用户权限
  getAuthority = (str?: undefined | string): any => {
    const authorityString: string | null =
      typeof str === 'undefined' ? localStorage.getItem('ra-authority') : str;
    let authority: string[];

    authority = authorityString ? JSON.parse(authorityString) : ['unIdentify'];

    return authority;
  };

  // 获取用户权限
  @computed
  get identifyPass(): any {
    if (!this.authority || !this.authority.length) {
      return 'identifying';
    }
    return this.authority[0] !== 'unIdentify';
  }

  // 设置用户权限
  @action
  setAuthority = (authority: string | string[]): void => {
    const proAuthority: string[] = typeof authority === 'string' ? [authority] : authority;
    localStorage.setItem('ra-authority', JSON.stringify(proAuthority));
    this.authority = proAuthority;
  };

  // 用户登录事件
  @action
  handleUserLogin(name: string, password: number): Promise<boolean> {
    return postLogin(name, password).then((res: any) => {
      const { message, userInfo } = res;
      if (message === 'ok') {
        const data = userInfo.data[0];
        this.setUserInfo(data);
        // const ui = this.getAuthority(name);
        this.setAuthority(name);
        return true;
      }
      return false;
    });
  }

  // 设置用户信息
  @action
  setUserInfo(userInfo: object): void {
    this.userInfo = userInfo;
    localStorage.setItem('ra-user', JSON.stringify(userInfo));
  }

  // 用户登出，重置信息
  @action
  userLogout = (): void => {
    this.userInfo = {};
    this.authority = [];
    localStorage.removeItem('ra-authority');
    localStorage.removeItem('ra-user');
  };

  // 重新拉取用户信息
  @action
  reloadUserInfo = async (): Promise<any> => {
    const ls: any = localStorage.getItem('ra-user');
    const au: any = this.getAuthority();
    let ui: object = {};
    if (ls && ls !== 'undefined') {
      ui = JSON.parse(ls);
    } else {
      const { data } = await getUserInfo();
      ui = data[0];
    }
    this.setUserInfo(ui);

    setTimeout(() => {
      this.setAuthority(au || ['unIdentify']);
    }, 3000);
  };
}

export default UserStore;
