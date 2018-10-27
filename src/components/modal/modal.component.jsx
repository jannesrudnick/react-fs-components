import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Portal from 'react-minimalist-portal';
import FS_Defaults from '../../defaults';
import FS_Constants from '../../constants';

class FS_Modal extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    classPrefix: PropTypes.string,
    classNames: PropTypes.object,
    style: PropTypes.object,
    children: PropTypes.any,
    verticalAlignDialog: PropTypes.string,
  };

  static defaultProps = {
    classPrefix: FS_Defaults.classPrefix,
    classNames: {},
    style: {},
    children: null,
    verticalAlignDialog: FS_Constants.Modal.verticalAlign.START,
  };

  render() {
    const {
      classNames, style, classPrefix, children, verticalAlignDialog, open,
    } = this.props;

    const styles = {
      overlay: {},
      contentWrapper: {},
      dialog: {},
      ...style,
    };

    return open ? (
      <Portal>
        <div
          className={classnames(
            `${classPrefix}modal--overlay`,
            classNames.overlay,
          )}
          style={styles.overlay}
        />
        <div
          className={classnames(
            `${classPrefix}modal--content-wrapper`,
            classNames.contentWrapper,
          )}
          style={styles.contentWrapper}
          data-align-items={verticalAlignDialog}
        >
          <div
            className={classnames(
              `${classPrefix}modal--dialog`,
              classNames.dialog,
            )}
            style={styles.dialog}
          >
            {children}
          </div>
        </div>
      </Portal>
    ) : null;
  }
}

FS_Modal.constants = FS_Constants.Modal;

export default FS_Modal;
