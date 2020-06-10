import React from 'react';
import { mount } from 'enzyme';
import HighLight from './index';

describe('Highlight', () => {
  const Element =
    '<span style="color: rgb(30, 144, 255);">2333</span><span>woasd</span><span style="color: rgb(30, 144, 255);">2333</span>';

  beforeAll(async () => {
    jest.setTimeout(1000000);
  });

  it('highlight text', async () => {
    const wrapper = mount(<HighLight val="2333woasd2333" tarVal="2333" />);
    expect(wrapper.html()).toEqual(Element);
  });
});
