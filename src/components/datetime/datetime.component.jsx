import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  IoMdClock, IoIosClose,
} from 'react-icons/io';
import Datetime from 'react-datetime';
import FS_ActionBtns from '../action-btns/action-btns.component';
import FS_Defaults from '../../defaults';
import Helpers from '../../helper';
import FS_Constants from '../../constants';

class FS_DateTime extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    title: PropTypes.string,
    displayFormat: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    datetimeProps: PropTypes.object,
  };

  static defaultProps = {
    classPrefix: FS_Defaults.classPrefix,
    title: null,
    displayFormat: 'LLL',
    value: null,
    datetimeProps: {},
  };

  state = {
    open: false,
  };

  toggleCalendar = (openCalendar, closeCalendar) => () => {
    const { open } = this.state;
    if (open) {
      closeCalendar();
    } else {
      openCalendar();
    }
    this.setState({
      open: !open,
    });
  };

  renderInput = (inputProps, openCalendar, closeCalendar) => {
    const {
      title, classPrefix, displayFormat, value, onChange,
    } = this.props;
    const { open } = this.state;

    return (
      <div
        className={classnames(
          `${classPrefix}datetime--input-wrapper`,
          open ? `${classPrefix}datetime--input-focus` : null,
        )}
        data-title={title}
      >
        <div
          className={classnames(
            `${classPrefix}datetime--input`,
          )}
          onClick={this.toggleCalendar(openCalendar, closeCalendar)}
          tabIndex={0}
          role="button"
        >
          {value ? Helpers.moment(value).format(displayFormat) : null}
        </div>
        <FS_ActionBtns
          btnType={FS_Constants.ActionBtns.btnType.ICON}
          btnStyle={FS_Constants.ActionBtns.btnStyle.LIGHT}
          btns={[
            value ? {
              icon: <IoIosClose />,
              onClick: () => {
                onChange(null);
              },
            } : null,
            {
              icon: <IoMdClock />,
              highlight: open,
              onClick: this.toggleCalendar(openCalendar, closeCalendar),
            },
          ]}
        />
      </div>
    );
  };

  render() {
    const {
      classPrefix, value, onChange, datetimeProps,
    } = this.props;
    const { open } = this.state;
    return (
      <Datetime
        renderInput={this.renderInput}
        className={`${classPrefix}datetime`}
        open={open}
        value={Helpers.moment(value)}
        onChange={onChange}
        {...datetimeProps}
      />
    );
  }
}

export default FS_DateTime;
