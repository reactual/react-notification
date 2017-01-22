// @flow
import React, { PureComponent, Element } from 'react';
import defaultPropTypes from './defaultPropTypes';

function getTitleStyle(customTitleStyle): Object {
  return Object.assign({}, {
    fontWeight: '700',
    marginRight: '.5rem'
  }, customTitleStyle);
}

function getActionStyle(customActionStyle): Object {
  return Object.assign({}, {
    padding: '0.125rem',
    marginLeft: '1rem',
    color: '#f44336',
    font: '.75rem normal Roboto, sans-serif',
    lineHeight: '1rem',
    letterSpacing: '.125ex',
    textTransform: 'uppercase',
    borderRadius: '5px',
    cursor: 'pointer'
  }, customActionStyle);
}

function getBarStyle(props): Object {
  const { isActive, barStyle, activeBarStyle } = props;

  const baseStyle = {
    position: 'fixed',
    bottom: '2rem',
    left: '-100%',
    width: 'auto',
    padding: '1rem',
    margin: 0,
    color: '#fafafa',
    font: '1rem normal Roboto, sans-serif',
    borderRadius: '5px',
    background: '#212121',
    borderSizing: 'border-box',
    boxShadow: '0 0 1px 1px rgba(10, 10, 11, .125)',
    cursor: 'default',
    WebKitTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
    MozTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
    msTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
    OTransition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
    transition: '.5s cubic-bezier(0.89, 0.01, 0.5, 1.1)',
    WebkitTransform: 'translatez(0)',
    MozTransform: 'translatez(0)',
    msTransform: 'translatez(0)',
    OTransform: 'translatez(0)',
    transform: 'translatez(0)'
  };

  return isActive ?
  Object.assign({}, baseStyle, { left: '1rem' }, barStyle, activeBarStyle) :
  Object.assign({}, baseStyle, barStyle);
}

function renderTitle(props): Element<*> {
  const { titleStyle } = props;

  return React.createElement(
    'span',
    {
      className: 'notification-bar-title',
      style: props.style !== false ? getTitleStyle(titleStyle) : null
    },
    props.title
  );
}

class Notification extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    if (props.onDismiss && props.isActive) {
      this.dismissTimeout = setTimeout(
        props.onDismiss,
        props.dismissAfter
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dismissAfter === false) return;

    // See http://eslint.org/docs/rules/no-prototype-builtins
    if (!{}.hasOwnProperty.call(nextProps, 'isLast')) {
      clearTimeout(this.dismissTimeout);
    }

    if (nextProps.onDismiss) {
      if (
        (nextProps.isActive && !this.props.isActive) ||
        (nextProps.dismissAfter && this.props.dismissAfter === false)
      ) {
        this.dismissTimeout = setTimeout(
          nextProps.onDismiss,
          nextProps.dismissAfter
        );
      }
    }
  }

  componentWillUnmount() {
    if (this.props.dismissAfter) {
      clearTimeout(this.dismissTimeout);
    }
  }

  /*
  * @function handleClick
  * @description Handle click events on the action button.
  */
  handleClick() {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }

  renderAction(props): Element<*> {
    return (
      <span
        className="notification-bar-action"
        onClick={this.handleClick}
        style={getActionStyle(props.customActionStyle)}
      >
        {props.action}
      </span>
    );
  }

  render(): Element<*> {
    let className = 'notification-bar';

    if (this.props.isActive) className += ` ${this.props.activeClassName}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <div className={className} style={getBarStyle(this.props)}>
        <div className="notification-bar-wrapper">
          {this.props.title ? renderTitle(this.props) : null}
          <span className="notification-bar-message">
            {this.props.message}
          </span>
          {this.props.action ? this.renderAction.call(this, this.props) : null}
        </div>
      </div>
    );
  }
}

Notification.propTypes = defaultPropTypes;

Notification.defaultProps = {
  isActive: false,
  dismissAfter: 2000,
  activeClassName: 'notification-bar-active'
};

export default Notification;
