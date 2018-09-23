import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import FS_Defaults from '../../defaults';

const position = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
};

const size = {
  SMALL: 'small',
  REGULAR: 'regular',
  BIG: 'big',
};

class FS_Tooltip extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    classPrefix: FS_Defaults.classPrefix,
  };

  defaultTooltipProps = {
    position: position.TOP,
    size: size.SMALL,
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

FS_Tooltip.size = size;
FS_Tooltip.position = position;

export default FS_Tooltip;
