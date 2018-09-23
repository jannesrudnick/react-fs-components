import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import map from 'lodash/map';
import isPlainObject from 'lodash/isPlainObject';
import FS_ActionBtn from './action-btn.component';
import FS_ActionBtnsGroup from './action-btns-group.component';
import FS_Defaults from '../../defaults';
import FS_Constants from '../../constants';

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
      FS_Constants.ActionBtns.justify.START,
      FS_Constants.ActionBtns.justify.CENTER,
      FS_Constants.ActionBtns.justify.END,
    ]),
    btnType: PropTypes.oneOf([
      FS_Constants.ActionBtns.btnType.DEFAULT,
      FS_Constants.ActionBtns.btnType.TEXT,
      FS_Constants.ActionBtns.btnType.ICON,
      FS_Constants.ActionBtns.btnType.ICON_LEFT_TEXT,
      FS_Constants.ActionBtns.btnType.ICON_RIGHT_TEXT,
    ]),
    size: PropTypes.oneOf([
      FS_Constants.ActionBtns.size.ULTRA_SMALL,
      FS_Constants.ActionBtns.size.SMALL,
      FS_Constants.ActionBtns.size.MEDIUM,
      FS_Constants.ActionBtns.size.LARGE,
    ]),
    btnStyle: PropTypes.oneOf([
      FS_Constants.ActionBtns.btnStyle.DEFAULT,
      FS_Constants.ActionBtns.btnStyle.DARK,
      FS_Constants.ActionBtns.btnStyle.LIGHT,
    ]),
    classPrefix: PropTypes.string,
    containerInlineStyle: PropTypes.object,
  };

  static defaultProps = {
    containerClassNames: [],
    justify: null,
    btnType: null,
    size: FS_Constants.ActionBtns.size.MEDIUM,
    btnStyle: FS_Constants.ActionBtns.btnStyle.DEFAULT,
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

FS_ActionBtns.btnStyle = FS_Constants.ActionBtns.btnStyle;
FS_ActionBtns.btnType = FS_Constants.ActionBtns.btnType;
FS_ActionBtns.size = FS_Constants.ActionBtns.size;
FS_ActionBtns.justify = FS_Constants.ActionBtns.justify;

export default FS_ActionBtns;
