import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FiCheck, FiX } from 'react-icons/fi';
import { IoIosRadioButtonOff } from 'react-icons/io';
import isFunction from 'lodash/isFunction';
import FS_Defaults from '../../defaults';
import FS_Constants from '../../constants';

class FSLM_Badge extends Component {
  static propTypes = {
    type: PropTypes.oneOf([
      FS_Constants.Badge.type.DEFAULT,
      FS_Constants.Badge.type.SUCCESS,
      FS_Constants.Badge.type.ERROR,
    ]),
    text: PropTypes.string.isRequired,
    showIcon: PropTypes.bool,
    classPrefix: PropTypes.string,
    icon: PropTypes.func,
    className: PropTypes.array,
    size: PropTypes.oneOf([
      FS_Constants.Badge.size.DEFAULT,
      FS_Constants.Badge.size.SMALL,
    ]),
  };

  static defaultProps = {
    type: FS_Constants.Badge.type.SUCCESS,
    showIcon: true,
    classPrefix: FS_Defaults.classPrefix,
    icon: null,
    className: [],
    size: FS_Constants.Badge.size.DEFAULT,
  };

  render() {
    const {
      type, text, classPrefix, showIcon, icon, className, size,
    } = this.props;
    return (
      <div
        className={classnames(
          `${classPrefix}badge`,
          className,
        )}
        data-size={size}
      >
        <div
          className={classnames(
            `${classPrefix}badge--content-wrapper`,
          )}
          data-badge-type={type}
        >
          {showIcon ? (
            <React.Fragment>
              {isFunction(icon) ? icon() : (
                <div
                  className={classnames(
                    `${classPrefix}badge--icon`,
                  )}
                >
                  {{
                    [FS_Constants.Badge.type.DEFAULT]: <IoIosRadioButtonOff />,
                    [FS_Constants.Badge.type.SUCCESS]: <FiCheck />,
                    [FS_Constants.Badge.type.ERROR]: <FiX />,
                  }[type]}
                </div>
              )}
            </React.Fragment>
          ) : null}
          <div
            className={classnames(
              `${classPrefix}badge--text`,
            )}
          >
            {text}
          </div>
        </div>
      </div>
    );
  }
}

export default FSLM_Badge;
