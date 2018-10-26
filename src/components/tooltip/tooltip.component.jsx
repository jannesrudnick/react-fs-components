import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import FS_Defaults from '../../defaults';
import FS_Constants from '../../constants';

class FS_Tooltip extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    classPrefix: FS_Defaults.classPrefix,
  };

  defaultTooltipProps = {
    position: FS_Constants.Tooltip.position.TOP,
    size: FS_Constants.Tooltip.size.SMALL,
    arrow: true,
    classPrefix: FS_Defaults.classPrefix,
  };

  render() {
    const { title, children, ...other } = this.props;

    const style = {
      ...other.style,
    };

    const tooltipProps = {
      ...this.defaultTooltipProps,
      ...other,
      style,
      title,
    };

    return (
      <Tooltip
        {...tooltipProps}
      >
        {children}
      </Tooltip>
    );
  }
}

FS_Tooltip.constants = FS_Constants.Tooltip;

export default FS_Tooltip;
