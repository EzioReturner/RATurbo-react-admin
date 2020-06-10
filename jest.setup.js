import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom';
import 'regenerator-runtime/runtime';

Enzyme.configure({ adapter: new Adapter() });

const { JSDOM } = jsdom;
if (typeof document === 'undefined') {
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
    url: 'https://localhost'
  });
  global.window = dom.window;
  global.document = global.window.document;
  global.navigator = global.window.navigator;
}
