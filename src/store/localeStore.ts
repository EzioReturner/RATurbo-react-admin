import { observable, configure, action } from 'mobx';

configure({ enforceActions: 'observed' });
class LocaleStore {
  @observable locale: string = localStorage.getItem('ra-locale') || 'zh';
  @observable localeObj: any = {};
  constructor() {
    this.initLocaleList();
  }

  async initLocaleList(): Promise<any> {
    const json = await import(`../locales/${this.locale}/mapping.json`);
    this.setLocaleObj(json);
  }

  @action setLocale(key: string): void {
    this.locale = key;
    localStorage.setItem('ra-locale', key);
    window.location.reload();
  }

  @action setLocaleObj(json: any): void {
    this.localeObj = json.default;
  }
}

export default LocaleStore;
