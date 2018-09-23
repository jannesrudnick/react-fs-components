import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';
import isPlainObject from 'lodash/isPlainObject';
import FS_ActionBtn from './action-btn.component';
import FS_ActionBtnsGroup from './action-btns-group.component';
import FS_Defaults from '../../defaults';

const constants = {
  btnStyle: {
    DEFAULT: 'default',
    LIGHT: 'light',
    DARK: 'dark',
  },
  btnType: {
    DEFAULT: 'text',
    TEXT: 'text',
    ICON: 'icon',
    ICON_LEFT_TEXT: 'icon-text',
    ICON_RIGHT_TEXT: 'text-icon',
  },
  size: {
    ULTRA_SMALL: 'xs',
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
  },
  justify: {
    START: 'start',
    CENTER: 'center',
    END: 'end',
  },
};

class FS_ActionBtns extends Component {
  static propTypes = {
    containerClassNames: PropTypes.array,
    btns: PropTypes.arrayOf(
      PropTypes.shape({
        containerClassNames: PropTypes.array,
        icon: PropTypes.element,
        iconAfter: PropTypes.bool,
        text: PropTypes.any,
        onClick: PropTypes.func,
        highlight: PropTypes.bool,
        btns: PropTypes.arrayOf(
          PropTypes.shape({
            containerClassNames: PropTypes.array,
            icon: PropTypes.element,
            iconAfter: PropTypes.bool,
            text: PropTypes.any,
            onClick: PropTypes.func,
            highlight: PropTypes.bool,
          }),
        ),
        isGroup: PropTypes.bool,
        isElement: PropTypes.bool,
        element: PropTypes.element,
      }),
    ).isRequired,
    justify: PropTypes.oneOf([
      constants.justify.START,
      constants.justify.CENTER,
      constants.justify.END,
    ]),
    btnType: PropTypes.oneOf([
      constants.btnType.DEFAULT,
      constants.btnType.TEXT,
      constants.btnType.ICON,
      constants.btnType.ICON_LEFT_TEXT,
      constants.btnType.ICON_RIGHT_TEXT,
    ]),
    size: PropTypes.oneOf([
      constants.size.ULTRA_SMALL,
      constants.size.SMALL,
      constants.size.MEDIUM,
      constants.size.LARGE,
    ]),
    btnStyle: PropTypes.oneOf([
      constants.btnStyle.DEFAULT,
      constants.btnStyle.DARK,
      constants.btnStyle.LIGHT,
    ]),
    classPrefix: PropTypes.string,
    containerInlineStyle: PropTypes.object,
  };

  static defaultProps = {
    containerClassNames: [],
    justify: null,
    btnType: null,
    size: constants.size.MEDIUM,
    btnStyle: constants.btnStyle.DEFAULT,
    classPrefix: FS_Defaults.classPrefix,
    containerInlineStyle: {},
  };

  render() {
    const {
      justify, btnType, size, btnStyle, btns, containerClassNames, classPrefix,
      containerInlineStyle,
    } = this.props;

    return (
      <div
        className={classNames(
          `${classPrefix}action-btns`,
          ...containerClassNames,
        )}
        data-btn-style={btnStyle}
        data-btn-type={btnType}
        data-justify={justify}
        data-size={size}
        style={containerInlineStyle}
      >
        {map(btns, (btn, index) => {
          if (isPlainObject(btn)) {
            if (btn.isGroup) {
              return (
                <FS_ActionBtnsGroup
                  key={`${classPrefix}:action-btns:btn-group:${index}`}
                  btns={btn.btns}
                  classPrefix={classPrefix}
                />
              );
            } if (btn.isElement) {
              return (
                <FS_ActionBtn
                  key={`${classPrefix}:action-btns:btn:${index}`}
                  {...btn}
                />
              );
            }
            return (
              <FS_ActionBtn
                key={`${classPrefix}:action-btns:btn:${index}`}
                {...btn}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
}

FS_ActionBtns.btnStyle = constants.btnStyle;
FS_ActionBtns.btnType = constants.btnType;
FS_ActionBtns.size = constants.size;
FS_ActionBtns.justify = constants.justify;

export default FS_ActionBtns;
