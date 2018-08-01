import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FS_ActionBtn from './action-btn.component';
import FS_ActionBtnsGroup from './action-btns-group.component';
import FS_Defaults from '../../defaults';
import map from 'lodash/map';
import isPlainObject from 'lodash/isPlainObject';

const btnStyle = {
    DEFAULT: 'default',
    LIGHT: 'light',
    DARK: 'dark',
};

const btnType = {
    DEFAULT: 'text',
    TEXT: 'text',
    ICON: 'icon',
    ICON_LEFT_TEXT: 'icon-text',
    ICON_RIGHT_TEXT: 'text-icon'
};

const size = {
    ULTRA_SMALL: 'xs',
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg'
};

const justify = {
    START: 'start',
    CENTER: 'center',
    END: 'end'
};

class FS_ActionBtns extends Component {

    static propTypes = {
        containerClassNames: PropTypes.array,
        btns: PropTypes.arrayOf(
            PropTypes.shape({
                containerClassNames: PropTypes.array,
                icon: PropTypes.element,
                iconAfter: PropTypes.bool,
                text: PropTypes.any,
                onClick: PropTypes.func,
                highlight: PropTypes.bool,
                btns: PropTypes.arrayOf(
                    PropTypes.shape({
                        containerClassNames: PropTypes.array,
                        icon: PropTypes.element,
                        iconAfter: PropTypes.bool,
                        text: PropTypes.any,
                        onClick: PropTypes.func,
                        highlight: PropTypes.bool,
                    }),
                ),
                isGroup: PropTypes.bool,
                isElement: PropTypes.bool,
                element: PropTypes.element,
            }),
        ).isRequired,
        justify: PropTypes.oneOf([
            justify.START,
            justify.CENTER,
            justify.END
        ]),
        btnType: PropTypes.oneOf([
            btnType.DEFAULT,
            btnType.TEXT,
            btnType.ICON,
            btnType.ICON_LEFT_TEXT,
            btnType.ICON_RIGHT_TEXT
        ]),
        size: PropTypes.oneOf([
            size.ULTRA_SMALL,
            size.SMALL,
            size.MEDIUM,
            size.LARGE
        ]),
        btnStyle: PropTypes.oneOf([
            btnStyle.DEFAULT,
            btnStyle.DARK,
            btnStyle.LIGHT
        ]),
        classPrefix: PropTypes.string,
        containerInlineStyle: PropTypes.object,
    };

    static defaultProps = {
        containerClassNames: [],
        align: null,
        btnType: null,
        size: size.MEDIUM,
        btnStyle: btnStyle.DEFAULT,
        classPrefix: FS_Defaults.classPrefix,
        containerInlineStyle: {},
    };

    render() {

        const {justify, btnType, size, btnStyle, btns, containerClassNames, classPrefix, containerInlineStyle} = this.props;

        return <div
            className={classNames(
                classPrefix + 'action-btns',
                ...containerClassNames,
            )}
            data-btn-style={btnStyle}
            data-btn-type={btnType}
            data-justify={justify}
            data-size={size}
            style={containerInlineStyle}
        >
            {map(btns, (btn, index) => {
                if(isPlainObject(btn)) {
                    if(btn.isGroup) {
                        return <FS_ActionBtnsGroup
                            key={classPrefix + ':action-btns:btn-group:' + index}
                            btns={btn.btns}
                            classPrefix={classPrefix}
                        />
                    } else if(btn.isElement) {
                        return <FS_ActionBtn
                            key={classPrefix + ':action-btns:btn:' + index}
                            {...btn}
                        />
                    } else {
                        return <FS_ActionBtn
                            key={classPrefix + ':action-btns:btn:' + index}
                            {...btn}
                        />
                    }
                }
            })}
        </div>
    }
}

FS_ActionBtns.btnStyle = btnStyle;
FS_ActionBtns.btnType = btnType;
FS_ActionBtns.size = size;
FS_ActionBtns.justify = justify;

export default FS_ActionBtns;