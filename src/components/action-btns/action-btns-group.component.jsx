import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import classNames from 'classnames';
import FS_Defaults from '../../defaults';
import FS_ActionBtn from './action-btn.component';

class FS_ActionBtnsGroup extends Component {
  static propTypes = {
    btns: PropTypes.arrayOf(
      PropTypes.shape({
        containerClassNames: PropTypes.array,
        icon: PropTypes.element,
        iconAfter: PropTypes.bool,
        text: PropTypes.any,
        onClick: PropTypes.func,
        isElement: PropTypes.bool,
        element: PropTypes.element,
        highlight: PropTypes.bool,
      }),
    ).isRequired,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    classPrefix: FS_Defaults.classPrefix,
  };

  render() {
    const { btns, classPrefix } = this.props;

    return (
      <div className={classNames(
        `${classPrefix}action-btn-group`,
      )}
      >
        {map(btns, (btn, index) => (
          <FS_ActionBtn
            key={`${classPrefix}:action-btns:group:btn:${index}`}
            {...btn}
            isGroup
          />
        ))}
      </div>
    );
  }
}

export default FS_ActionBtnsGroup;
