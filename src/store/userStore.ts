import { getUserInfo, postLogin } from '@api/user';
import { action, autorun, configure, observable } from 'mobx';

configure({ enforceActions: 'observed' });
class UserStore {
  @observable userInfo: any = {};
  @observable authority: string[] = [];

  constructor() {
    autorun(() => {
      const au: any = this.getAuthority();
      this.setAuthority(au);
    });
  }

  // 获取用户权限
  getAuthority(str?: any): any {
    const authorityString = typeof str === 'undefined' ? localStorage.getItem('ra-authority') : str;
    let authority;
    try {
      authority = JSON.parse(authorityString);
    } catch (e) {
      authority = authorityString;
    }
    if (typeof authority === 'string') {
      return [authority];
    }
    return authority;
  }

  // 设置用户权限
  @action setAuthority(authority: any): void {
    const proAuthority = typeof authority === 'string' ? [authority] : authority;
    localStorage.setItem('ra-authority', JSON.stringify(proAuthority));
    this.authority = proAuthority;
  }

  // 用户登录事件
  @action handleUserLogin(name: string, password: number): Promise<boolean> {
    return postLogin(name, password).then((res: any) => {
      const { message, userInfo } = res.data;
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
  @action setUserInfo(userInfo: object): void {
    this.userInfo = userInfo;
    localStorage.setItem('ra-user', JSON.stringify(userInfo));
  }

  // 用户登出，重置信息
  @action userLogout(): void {
    this.userInfo = {};
    this.authority = [];
    localStorage.removeItem('ra-authority');
    localStorage.removeItem('ra-user');
  }

  // 重新拉取用户信息
  @action reloadUserInfo = async (): Promise<any> => {
    const ls: any = localStorage.getItem('ra-user');
    const au: any = this.getAuthority();
    let ui: object = {};
    if (ls) {
      ui = JSON.parse(ls);
    } else {
      const data = await getUserInfo();
      ui = data.data[0];
    }
    this.setUserInfo(ui);
    this.setAuthority(au);
  };
}

export default UserStore;
