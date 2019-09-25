import LayoutStore from './layoutStore';
import ProgramStore from './programStore';
import UserStore from './userStore';
import LocaleStore from './localeStore';

const layoutStore = new LayoutStore();
const programStore = new ProgramStore();
const userStore = new UserStore();
const localeStore = new LocaleStore();

export const Store = {
  programStore,
  layoutStore,
  userStore,
  localeStore
};
