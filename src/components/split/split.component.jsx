import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Split from 'split.js';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import map from 'lodash/map';
import each from 'lodash/each';
import size from 'lodash/size';
import FS_Defaults from '../../defaults';
import FS_Constants from '../../constants';

class FS_Split extends Component {
  static propTypes = {
    children: PropTypes.any,
    direction: PropTypes.oneOf([
      FS_Constants.Split.direction.HORIZONTAL,
      FS_Constants.Split.direction.VERTICAL,
    ]),
    sizes: PropTypes.array,
    minSize: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    containerClassNames: PropTypes.array,
    containerProps: PropTypes.object,
    paneClassNames: PropTypes.shape({
      all: PropTypes.array,
    }),
    snapOffset: PropTypes.number,
    onDrag: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    direction: FS_Constants.Split.direction.HORIZONTAL,
    containerClassNames: [],
    containerProps: {},
    paneClassNames: {},
    minSize: 100,
    sizes: null,
    snapOffset: 30,
    onDrag: () => {},
    onDragStart: () => {},
    onDragEnd: () => {},
    classPrefix: FS_Defaults.classPrefix,
  };

  constructor(props) {
    super();
    this.prepareSplitRefs(props);
  }

  componentDidMount() {
    this.updateSplit();
  }

  componentWillReceiveProps(nextProps) {
    const { props } = this;
    if (!isEqual(nextProps.children, props.children)) {
      this.prepareSplitRefs(nextProps);
    }
  }

  componentDidUpdate() {
    this.updateSplit();
  }

  componentWillUnmount() {
    this.destroySplitRef();
  }

  destroySplitRef = () => {
    if (this.splitRef) {
      this.splitRef.destroy();
    }
  };

  prepareSplitRefs = (props) => {
    const { children } = props;
    this.paneRefs = [];
    if (isArray(children)) {
      each(children, () => {
        this.paneRefs.push(React.createRef());
      });
    }
  };

  updateSplit = () => {
    const {
      direction, minSize, sizes, snapOffset, onDrag, onDragStart, onDragEnd, classPrefix,
    } = this.props;
    if (size(this.paneRefs) && isArray(this.paneRefs)) {
      this.destroySplitRef();
      this.splitRef = Split(map(this.paneRefs, ref => ref.current), {
        direction,
        minSize,
        sizes,
        snapOffset,
        gutter: (index, splitDirection) => {
          const gutter = document.createElement('div');
          gutter.className = `${classPrefix}split-gutter ${classPrefix}split-gutter-${splitDirection}`;
          return gutter;
        },
        gutterSize: 8,
        elementStyle: (dimension, elementSize, gutterSize) => ({ 'flex-basis': `calc(${elementSize}% - ${gutterSize}px)` }),
        gutterStyle: (dimension, gutterSize) => ({ 'flex-basis': `${gutterSize}px` }),
        onDrag: () => {
          onDrag(this.splitRef);
        },
        onDragStart: () => {
          onDragStart(this.splitRef);
        },
        onDragEnd: () => {
          onDragEnd(this.splitRef);
        },
      });
    } else {
      this.destroySplitRef();
    }
  };

  render() {
    const {
      children, containerClassNames, containerProps, direction, paneClassNames, classPrefix,
    } = this.props;

    const wrapped = isArray(children) ? map(children, (child, index) => (
      <div
        key={`fslm:split:pane:${index}`}
        ref={get(this.paneRefs, index, () => {})}
        className={classNames(`${classPrefix}split-pane`, ...(paneClassNames.all || []), ...(paneClassNames[index] || []))}
      >
        {child}
      </div>
    )) : [];

    return (
      <div
        {...containerProps}
        className={classNames(`${classPrefix}split`, ...containerClassNames)}
        data-direction={direction}
      >
        {wrapped}
      </div>
    );
  }
}

FS_Split.constants = FS_Constants.Split;

export default FS_Split;
