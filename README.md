# react-fs-components

[![npm](https://img.shields.io/npm/v/react-fs-components.svg)](https://npmjs.com/package/react-fs-components) [![GitHub](https://img.shields.io/github/license/florianstahr/react-fs-components.svg?colorB=brightgreen)](https://github.com/florianstahr/react-fs-components)


This repo contains components for react I'm using in many of my projects lately. They are styled via SASS so there is a chance to customize them.

## Install

```
yarn add react-fs-components
```

or

```
npm install react-fs-components --save
```

After that, you can import the components into your project.
example (tooltip component):

```javascript
import { FS_Tooltip } from 'react-fs-components'
```

To have styled components you have to include the mixins from the sass directory into your sass file.

To include all available style rules (from [index.scss](https://github.com/florianstahr/react-fs-components/blob/master/sass/index.scss)):
```scss
@include fs-components('.fs--'); // .fs-- : prefix for all style rules
``` 

But you can also include styles just for the components you need. But be sure to that you also have to import the config file and the utils files needed then.

```scss
@import 'sass/_utils/flexbox.scss';
@import 'sass/config.scss';

@include fs-components--action-btns('.fs--');
```

## Available Components

*See props for each component in the file it is defined in.*

- [FS_ActionBtns](https://github.com/florianstahr/react-fs-components/blob/master/src/components/action-btns/action-btns.component.jsx)
- [FS_Badge](https://github.com/florianstahr/react-fs-components/blob/master/src/components/badge/badge.component.jsx)
- [FS_DateTime](https://github.com/florianstahr/react-fs-components/blob/master/src/components/datetime/datetime.component.jsx)
- [FS_Divider](https://github.com/florianstahr/react-fs-components/blob/master/src/components/divider/divider.component.jsx)
- [FS_Input](https://github.com/florianstahr/react-fs-components/blob/master/src/components/input/input.component.jsx)
- [FS_Markdown](https://github.com/florianstahr/react-fs-components/blob/master/src/components/markdown/markdown.component.jsx)
- [FS_Modal](https://github.com/florianstahr/react-fs-components/blob/master/src/components/modal/modal.component.jsx)
- [FS_RTE_TinyMCE](https://github.com/florianstahr/react-fs-components/blob/master/src/components/rte-tinymce/rte-tinymce.component.jsx)
- [FS_Select](https://github.com/florianstahr/react-fs-components/blob/master/src/components/select/select.component.jsx)
- [FS_SimpleDialog](https://github.com/florianstahr/react-fs-components/blob/master/src/components/simple-dialog/simple-dialog.component.jsx)
- [FS_Split](https://github.com/florianstahr/react-fs-components/blob/master/src/components/split/split.component.jsx)
- [FS_Switch](https://github.com/florianstahr/react-fs-components/blob/master/src/components/switch/switch.component.jsx)
- [FS_Toggle](https://github.com/florianstahr/react-fs-components/blob/master/src/components/toggle/toggle.component.jsx)
- [FS_Tooltip](https://github.com/florianstahr/react-fs-components/blob/master/src/components/tooltip/tooltip.component.jsx)

## Contributing

*Feel free to contribute more useful components or to make existing components even better.*

Guidelines on contributing: *[see here](https://github.com/florianstahr/react-fs-components/blob/master/CONTRIBUTING.md)*

## License

This repo is licensed under the [MIT License](https://github.com/florianstahr/react-fs-components/blob/master/LICENSE).
