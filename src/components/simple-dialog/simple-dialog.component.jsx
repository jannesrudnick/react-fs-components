import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Portal from 'react-minimalist-portal';
import FS_Defaults from '../../defaults';

class FS_SimpleDialog extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    classPrefix: PropTypes.string,
    actionBtns: PropTypes.any,
    open: PropTypes.bool,
    children: PropTypes.any,
  };

  static defaultProps = {
    description: null,
    maxWidth: null,
    maxHeight: null,
    minWidth: null,
    minHeight: null,
    classPrefix: FS_Defaults.classPrefix,
    actionBtns: null,
    open: false,
    children: null,
  };

  render() {
    const {
      maxWidth, maxHeight, minWidth, minHeight, classPrefix, actionBtns, title, description, open,
      children,
    } = this.props;
    return open ? (
      <Portal>
        <div
          className={classnames(
            `${classPrefix}simple-dialog--background`,
          )}
        >
          <div
            className={classnames(
              `${classPrefix}simple-dialog--dialog-wrapper`,
            )}
          >
            <div
              className={classnames(
                `${classPrefix}simple-dialog--dialog`,
              )}
              style={{
                minWidth,
                maxWidth,
                minHeight,
                maxHeight,
              }}
            >
              <div
                className={classnames(
                  `${classPrefix}simple-dialog--dialog--header`,
                )}
              >
                <div
                  className={classnames(
                    `${classPrefix}simple-dialog--dialog--header-inner`,
                  )}
                >
                  <div
                    className={classnames(
                      `${classPrefix}simple-dialog--dialog--title`,
                    )}
                  >
                    {title}
                  </div>
                  <div
                    className={classnames(
                      `${classPrefix}simple-dialog--dialog--description`,
                    )}
                  >
                    {description}
                  </div>
                </div>
                {actionBtns}
              </div>
              <div
                className={classnames(
                  `${classPrefix}simple-dialog--dialog--body`,
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </Portal>
    ) : null;
  }
}

export default FS_SimpleDialog;
