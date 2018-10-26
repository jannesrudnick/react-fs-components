import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import classnames from 'classnames';
import FS_Defaults from '../../defaults';

class FS_Toggle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    containerClassNames: PropTypes.array,
    classPrefix: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    classPrefix: FS_Defaults.classPrefix,
    disabled: false,
    containerClassNames: null,
  };

  handleChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.checked);
  };

  render() {
    const {
      title, checked, containerClassNames, classPrefix, disabled,
    } = this.props;

    return (
      <div
        className={classnames(
          `${classPrefix}toggle`,
          containerClassNames,
        )}
      >
        <div className={`${classPrefix}toggle-label`}>
          <Toggle
            checked={checked}
            onChange={this.handleChange}
            disabled={disabled}
          />
          <span className={`${classPrefix}toggle-label-text`}>
            {title}
          </span>
        </div>
      </div>
    );
  }
}

export default FS_Toggle;
