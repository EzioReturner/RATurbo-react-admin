import LayoutStore from './LayoutStore';
import ProgramStore from './ProgramStore';

const layoutStore = new LayoutStore();
const programStore = new ProgramStore();

export const Store = {
  programStore,
  layoutStore
};
