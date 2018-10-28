import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react/';

import 'tinymce/tinymce';

import 'tinymce/themes/modern/theme';

import 'tinymce/plugins/hr';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/autoresize';
import FS_Defaults from '../../defaults';


class FS_RTE_TinyMCE extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    classPrefix: PropTypes.string,
    initProps: PropTypes.object,
  };

  static defaultProps = {
    classPrefix: FS_Defaults.classPrefix,
    initProps: {},
  };

  constructor() {
    super();
    this.state = {
      hasFocus: false,
    };
  }

  setFocus = (e) => {
    this.setState({
      hasFocus: e.type === 'focus',
    });
  };

  editorSetup = (editor) => {
    editor.on('focus', this.setFocus);
    editor.on('blur', this.setFocus);
  };

  render() {
    const { value, onChange, classPrefix, initProps } = this.props;
    const { hasFocus } = this.state;

    return (
      <div
        className={`${classPrefix}rte-tinymce--wrapper`}
        data-has-focus={hasFocus}
      >
        <Editor
          init={{
            skin: false,
            branding: false,
            plugins: [
              'hr lists link charmap code table autoresize', // html-blocks
            ],
            menubar: false,
            autoresize_bottom_margin: 10,
            autoresize_overflow_padding: 0,
            autoresize_min_height: 100,
            resize: false,
            toolbar: 'undo redo '
            + 'bold italic underline strikethrough  '
            + 'alignleft aligncenter alignright alignjustify '
            + 'block-p block-h1 block-h2 block-h3 block-h4 block-h5 block-h6 '
            + 'subscript superscript  '
            + 'bullist numlist  '
            + 'blockquote block-code block-pre hr link unlink openlink  '
            + 'charmap removeformat',
            setup: this.editorSetup,
            ...initProps,
          }}
          onEditorChange={onChange}
          value={value}
        />
      </div>
    );
  }
}

export default FS_RTE_TinyMCE;
