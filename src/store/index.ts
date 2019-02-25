import LayoutStore from './layoutStore';
import ProgramStore from './programStore';
import UserStore from './userStore';

const layoutStore = new LayoutStore();
const programStore = new ProgramStore();
const userStore = new UserStore();

export const Store = {
  programStore,
  layoutStore,
  userStore
};
