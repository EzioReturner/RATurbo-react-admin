import React from 'react';
import { mount } from 'enzyme';
import BasicLayout from './index';
import { Provider } from 'mobx-react';
import { Store } from '@store/index';
import { HashRouter as Router, Route } from 'react-router-dom';

describe('BasicLayout', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });

  it('BasicLayout change header', async () => {
    const wrapper = mount(
      <Provider {...Store}>
        <Router>
          <Route
            path="/"
            component={() => (
              <BasicLayout
                {...{
                  header: <div id="customHeader">customHeader</div>
                }}
              />
            )}
          ></Route>
        </Router>
      </Provider>
    );
    expect(wrapper.find('#customHeader').html()).toEqual(
      '<div id="customHeader">customHeader</div>'
    );
  });

  it('BasicLayout change siderBar', async () => {
    const wrapper = mount(
      <Provider {...Store}>
        <Router>
          <Route
            path="/"
            component={() => (
              <BasicLayout
                {...{
                  siderBar: <div id="customSiderBar">customSiderBar</div>
                }}
              />
            )}
          ></Route>
        </Router>
      </Provider>
    );
    expect(wrapper.find('#customSiderBar').html()).toEqual(
      '<div id="customSiderBar">customSiderBar</div>'
    );
  });

  it('BasicLayout change siteLogo', async () => {
    const wrapper = mount(
      <Provider {...Store}>
        <Router>
          <Route
            path="/"
            component={() => (
              <BasicLayout
                {...{
                  siteLogo: <div id="customSiteLogo">customSiteLogo</div>
                }}
              />
            )}
          ></Route>
        </Router>
      </Provider>
    );
    expect(wrapper.find('#customSiteLogo').html()).toEqual(
      '<div id="customSiteLogo">customSiteLogo</div>'
    );
  });
});
