import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FS_Defaults from '../../defaults';

class FS_Divider extends Component {
  static propTypes = {
    classNames: PropTypes.array,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    classPrefix: FS_Defaults.classPrefix,
    classNames: null,
  };

  render() {
    const { classNames, classPrefix } = this.props;

    return (
      <div
        className={classnames(
          `${classPrefix}divider`,
          classNames,
        )}
      >
        <div
          className={classnames(
            `${classPrefix}divider-inner`,
          )}
        />
      </div>
    );
  }
}

export default FS_Divider;
