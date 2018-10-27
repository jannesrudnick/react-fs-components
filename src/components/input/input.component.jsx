import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FS_Defaults from '../../defaults';

class FS_Input extends Component {
  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    inputClassNames: PropTypes.array,
    wrapperClassNames: PropTypes.array,
    placeholder: PropTypes.string,
    inline: PropTypes.bool,
    afterIcon: PropTypes.any,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    title: null,
    inputClassNames: null,
    wrapperClassNames: null,
    placeholder: '',
    inline: false,
    afterIcon: null,
    classPrefix: FS_Defaults.classPrefix,
  };

  constructor() {
    super();
    this.state = {
      hasFocus: false,
    };
  }

  setFocus = focus => () => {
    this.setState({
      hasFocus: focus,
    });
  };

  onChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const {
      value, title, inputClassNames, placeholder, inline, afterIcon,
      classPrefix, wrapperClassNames,
    } = this.props;
    const { hasFocus } = this.state;

    const wrapperProps = {
      'data-title': title,
    };

    return (
      <div
        className={classnames(
          `${classPrefix}input--wrapper`,
          hasFocus ? `${classPrefix}input--focus` : null,
          inline ? `${classPrefix}input--inline` : null,
          wrapperClassNames,
        )}
        {...wrapperProps}
      >
        <input
          className={classnames(`${classPrefix}input`, inputClassNames)}
          onChange={this.onChange}
          placeholder={placeholder}
          onFocus={this.setFocus(true)}
          onBlur={this.setFocus(false)}
          value={value}
        />
        {afterIcon || null}
      </div>
    );
  }
}

export default FS_Input;
