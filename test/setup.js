/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, render, mount } from 'enzyme';

// Add commonly used methods and objects as globals
global.chai = chai;
global.mount = mount;
global.React = React;
global.render = render;
global.shallow = shallow;

chai.use(chaiEnzyme());
