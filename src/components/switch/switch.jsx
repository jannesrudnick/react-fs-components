import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import classnames from 'classnames';
import FS_Tooltip from '../tooltip/tooltip.component';
import FS_Constants from '../../constants';
import FS_Defaults from '../../defaults';

class FS_Switch extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    selected: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    selectedType: PropTypes.oneOf([
      FS_Constants.Switch.selectedType.ITEM_INDEX,
      FS_Constants.Switch.selectedType.ITEM_VALUE,
    ]),
    callback: PropTypes.func,
    size: PropTypes.oneOf([
      FS_Constants.Switch.size.DEFAULT,
      FS_Constants.Switch.size.LARGE,
      FS_Constants.Switch.size.SMALL,
    ]),
    tooltipProps: PropTypes.object,
    controlledComponent: PropTypes.bool,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    selected: 0,
    selectedType: FS_Constants.Switch.selectedType.ITEM_INDEX,
    callback: () => {},
    size: FS_Constants.Switch.size.DEFAULT,
    tooltipProps: {},
    controlledComponent: false,
    classPrefix: FS_Defaults.classPrefix,
  };

  constructor(props) {
    super();
    this.state = {
      selected: props.selected,
    };
  }

  isSelected = (currentlySelected, itemIndex, itemValue) => {
    const { selectedType } = this.props;
    if (isEqual(selectedType, FS_Constants.Switch.selectedType.ITEM_VALUE)) {
      return currentlySelected === itemValue;
    }
    return currentlySelected === itemIndex;
  };

  onSelect = (item, index) => () => {
    const { selectedType, callback } = this.props;
    if (isFunction(item.callback)) {
      item.callback();
    } else {
      callback(
        isEqual(selectedType, FS_Constants.Switch.selectedType.ITEM_VALUE)
          ? item.value : index,
      );
    }
    this.setState({
      selected: isEqual(selectedType, FS_Constants.Switch.selectedType.ITEM_VALUE)
        ? item.value : index,
    });
  };

  render() {
    const {
      items, size, tooltipProps, controlledComponent, classPrefix,
    } = this.props;

    // eslint-disable-next-line react/destructuring-assignment
    const selected = controlledComponent ? this.props.selected : this.state.selected;

    return (
      <div className={classnames(`${classPrefix}switch`, (classPrefix + size))} role="tablist">
        {map(items, (item, index) => (
          <div
            key={`${classPrefix}switch:${index.toString()}:${item.caption ? item.caption.toLowerCase().replace(' ', '-') : '-'}`}
            className={classnames(
              `${classPrefix}switch-item`,
            )}
            data-is-selected={this.isSelected(selected, index, item.value)}
            aria-selected={this.isSelected(selected, index, item.value)}
            role="tab"
            tabIndex={0}
            onClick={this.onSelect(item, index)}
          >
            <div className={`${classPrefix}caption`}>
              {(item.tooltip) ? (
                <FS_Tooltip title={item.tooltip} {...tooltipProps}>
                  {item.caption}
                </FS_Tooltip>
              ) : item.caption}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default FS_Switch;
