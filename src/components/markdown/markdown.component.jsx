import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import FS_Defaults from '../../defaults';

class FS_Markdown extends Component {
  static propTypes = {
    className: PropTypes.array,
    source: PropTypes.string.isRequired,
    mardownProps: PropTypes.object,
    classPrefix: PropTypes.string,
  };

  static defaultProps = {
    className: [],
    mardownProps: {},
    classPrefix: FS_Defaults.classPrefix,
  };

  render() {
    const {
      className, source, mardownProps, classPrefix,
    } = this.props;
    return (
      <ReactMarkdown
        className={classnames(
          `${classPrefix}markdown`,
          `${classPrefix}markdown--style--github`,
          className,
        )}
        source={source}
        {...mardownProps}
      />
    );
  }
}

export default FS_Markdown;
