import React, { createElement } from 'react';
import Notification from './notification';
import mockNotification from '../test/mockNotification';

describe(Notification.name, () => {
  // The component class names, used to find elements
  const actionClassName = '.notification-bar-action';
  // const messageClassName = '.notification-bar-message';
  // const titleClassName = '.notification-bar-title';

  /**
   * TEST 1a: message property with type string
   * This test ensures the most basic mounted component matches the
   * stored snapshot.
   */
  it('should render component with message type string', () => {
    expect(mount(
      <Notification
        message={mockNotification.message}
      />
    )).toMatchSnapshot();
  });

  /**
   * TEST 1b: message property with type element
   * The `message` property should accept a React element.
   */
  it('should render component with message type element', () => {
    expect(mount(
      <Notification
        message={createElement('div', {
          className: 'notification-bar-custom-message'
        }, 'Foo')}
      />
    )).toMatchSnapshot();
  });

  /**
   * TEST 2: className and activeClassName properties
   * The `className` property should force the component to use a different
   * class name instead of the default.
   */
  it('should render component with custom class names', () => {
    const component = mount(
      <Notification
        message={mockNotification.message}
        activeClassName="foo-active"
        className="foo"
      />
    );

    // Component should have custom classname
    expect(component).toMatchSnapshot();

    component.setProps({ isActive: true });

    // Component should have custom *active* class name
    expect(component).toMatchSnapshot();
  });

  /**
   * TEST 3: onClick property
   * After the action is clicked, the onClick function should be called once.
   */
  it('should call `onClick` function when action is clicked', () => {
    const handleClick = jest.fn();

    const component = mount(
      <Notification
        message={mockNotification.message}
        action={mockNotification.action}
        onClick={handleClick}
      />
    );

    component.find(actionClassName).simulate('click');

    expect(handleClick.mock.calls.length).toBe(1);
  });

  /**
   * TEST 4a: onDismiss property with interval
   * After the time out interval, the onDismiss function should be called once.
   */
  it('should call `onDismiss` function after timeout interval', (done) => {
    const handleDismiss = jest.fn();

    // To prevent errors, set the Jasmine the timeout to a longer interval
    const originalJasmineTimeOutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = mockNotification.dismissAfter;

    const component = mount(
      <Notification
        message={mockNotification.message}
        dismissAfter={mockNotification.dismissAfter}
        onDismiss={handleDismiss}
      />
    );

    component.setProps({ isActive: true });

    // Before the interval, onDismiss should not be called
    expect(handleDismiss.mock.calls.length).toBe(0);

    // After the interval, expect onDismiss to be called once
    setTimeout(() => {
      expect(handleDismiss.mock.calls.length).toBe(1);
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeOutInterval;
      done();
    }, mockNotification.dismissAfter);
  });

  /**
   * TEST 4b: onDismiss property with not interval
   * If `dismissAfter` is falue, the onDismiss function should not be called.
   */
  it('should not call onDismiss when interval is not set', () => {
    const handleDismiss = jest.fn();

    const component = shallow(
      <Notification
        message={mockNotification.message}
        dismissAfter={false}
        onDismiss={handleDismiss}
      />
    );

    component.setProps({ isActive: true });

    expect(handleDismiss.mock.calls.length).toBe(0);
  });

  /**
   * TEST 5a: custom bar styles
   * When custom style properties are provided, those styles should override
   * the default styles.
   */
  it('should render custom bar style', () => {
    const component = shallow(
      <Notification
        message={mockNotification.message}
        barStyle={mockNotification.barStyle}
        activeBarStyle={mockNotification.activeBarStyle}
      />
    );

    // Component should have custom bar style
    chai.expect(component).to.have.style('color', '#000000');
    expect(component).toMatchSnapshot();

    component.setProps({ isActive: true });

    // Component should have custom *active* bar style
    chai.expect(component).to.have.style('color', '#FFFFFF');
    expect(component).toMatchSnapshot();
  });

  /**
   * TEST 5b: custom action styles
   * When custom style properties are provided, those styles should override
   * the default styles.
   *
  it('should render custom action style', () => {
    const component = mount(
      <Notification
        message={mockNotification.message}
        action={mockNotification.action}
        actionStyle={mockNotification.actionStyle}
      />
    );

    // Component should have custom action style
    const action = component.find(actionClassName);
    chai.expect(action).to.have.style('color', '#EEEEEE');
    expect(action).toMatchSnapshot();
  });*/
});
