import React from 'react';
import NotificationStack from './notificationStack';
import mockNotification from '../test/mockNotification';

const notifications = [
  mockNotification,
  Object.assign(
    {},
    mockNotification,
    { key: 2 }
  )
];

describe(NotificationStack.name, () => {
  /**
   * TEST 1:
   * This basic test ensures the mounted component matches the
   * stored snapshot.
   */
  it('should render component', () => {
    expect(mount(
      <NotificationStack
        // eslint-disable-next-line
        notifications={notifications}
        onDismiss={() => {
          // Nil
        }}
      />
    )).toMatchSnapshot();
  });

  /**
   * TEST 2:
   *
  it('should not call onDismiss when interval is false', (done) => {
    const handleDismiss = jest.fn();

    // To prevent errors, set the Jasmine the timeout to a longer interval
    const originalJasmineTimeOutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = mockNotification.dismissAfter;

    const wrapper = mount(
      <NotificationStack
        notifications={[{
          ...mockNotification,
          dismissAfter: false
        }]}
        onDismiss={handleDismiss}
      />
    );

    wrapper.update();

    // Add time due to each StackedNotification transition time ( > 300 )
    setTimeout(() => {
      expect(handleDismiss.mock.called.length).toBe(0);
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeOutInterval;
      done();
    }, mockNotification.dismissAfter);
  });*/

  /**
   * TEST 3:
   *
  it('should fire onClick when notification action is clicked', () => {
    const handleClickGlobal = jest.fn();

    // Render a notification stack with one notification child
    const wrapper = mount(
      <NotificationStack
        notifications={[{
          key: '0',
          message: 'Foo',
          action: 'Dismiss',
          dismissAfter: 100,
          title: 'Title'
        }]}
        onClick={handleClickGlobal}
        onDismiss={() => null}
      />
    );

    // Simulate a click on the notification in the stack
    const notification = wrapper.find('.notification-bar-action');
    notification.simulate('click');

    // Expect handleClick to be caled once
    expect(handleClickGlobal.mock.call.length).toBe(1);
  });*/
});
