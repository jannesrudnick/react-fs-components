import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select, { Creatable, components } from 'react-select';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import FS_Defaults from '../../defaults';

class FS_Select extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.array.isRequired,
    creatable: PropTypes.bool.isRequired,
    closeOnSelect: PropTypes.bool,
    isMulti: PropTypes.bool,
    selectProps: PropTypes.object,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
    closeOnSelect: true,
    isMulti: false,
    selectProps: {},
    classPrefix: FS_Defaults.classPrefix,
  };

  state = {
    isMenuOpen: false,
  };

  openMenu = open => () => {
    this.setState({
      isMenuOpen: open,
    });
  };

  controlRenderer = (props) => {
    const { isMenuOpen } = this.state;
    return (
      <components.Control
        {...props}
        innerProps={{
          ...props.innerProps,
          'data-menu-is-open': isMenuOpen,
        }}
      />
    );
  };

  optionRenderer = (optionsProps) => {
    const {
      innerRef, innerProps, data, isSelected,
    } = optionsProps;
    const { classPrefix } = this.props;

    let lbel = data.label;

    if (!lbel) {
      if (data.empty) {
        lbel = <i>no value</i>;
      } else {
        lbel = data.value;
      }
    }

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={classNames(
          `${classPrefix}react-select__menu-list-item`,
          data.description ? `${classPrefix}react-select__menu-list-item--has-description` : null,
        )}
        data-is-selected={isSelected}
      >
        <div className={classNames(
          `${classPrefix}react-select__menu-list-item--heading`,
        )}
        >
          {lbel}
        </div>
        {data.description ? (
          <div className={`${classPrefix}react-select__menu-list-item--description`}>
            <ReactMarkdown
              className={`${classPrefix}github-markdown`}
              source={data.description}
            />
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const {
      onChange, value, placeholder, options, creatable, classPrefix, closeOnSelect, isMulti,
      selectProps,
    } = this.props;
    const { isMenuOpen } = this.state;

    const Element = creatable ? Creatable : Select;

    return (
      <Element
        classNamePrefix={`${classPrefix}react-select`}
        className={`${classPrefix}react-select-container`}
        isMulti={isMulti}
        onChange={onChange}
        options={options}
        components={{
          Control: this.controlRenderer,
          Option: this.optionRenderer,
        }}
        placeholder={placeholder}
        removeSelected
        autosize={false}
        closeOnSelect={closeOnSelect}
        value={value}
        isMenuOpen={isMenuOpen}
        onMenuOpen={this.openMenu(true)}
        onMenuClose={this.openMenu(false)}
        {...selectProps}
      />
    );
  }
}

export default FS_Select;
