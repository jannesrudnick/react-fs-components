import classNames from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FS_ActionBtns from './action-btns.component';
import FS_Defaults from '../../defaults';
import isFunction from 'lodash/isFunction';
import FS_Tooltip from '../tooltip/tooltip.component';

class FS_ActionBtn extends Component {

    static propTypes = {
        containerClassNames: PropTypes.array,
        containerInlineStyle: PropTypes.object,
        icon: PropTypes.element,
        iconAfter: PropTypes.bool,
        text: PropTypes.any,
        tooltip: PropTypes.string,
        onClick: PropTypes.func,
        onMouseDown: PropTypes.func,
        onMouseUp: PropTypes.func,
        isGroup: PropTypes.bool,
        isElement: PropTypes.bool,
        element: PropTypes.element,
        highlight: PropTypes.bool,
        enabled: PropTypes.bool,
        btnStyle: PropTypes.oneOf([
            FS_ActionBtns.btnStyle.DEFAULT,
            FS_ActionBtns.btnStyle.DARK,
            FS_ActionBtns.btnStyle.LIGHT
        ]),
        btnType: PropTypes.oneOf([
            FS_ActionBtns.btnType.DEFAULT,
            FS_ActionBtns.btnType.TEXT,
            FS_ActionBtns.btnType.ICON,
            FS_ActionBtns.btnType.ICON_LEFT_TEXT,
            FS_ActionBtns.btnType.ICON_RIGHT_TEXT
        ]),
        classPrefix: PropTypes.string,
        btnProps: PropTypes.object,
    };

    static defaultProps = {
        containerClassNames: [],
        containerInlineStyle: {},
        icon: null,
        iconAfter: false,
        text: null,
        tooltip: '',
        isGroup: null,
        isElement: false,
        element: null,
        highlight: null,
        enabled: true,
        btnStyle: null,
        btnType: null,
        classPrefix: FS_Defaults.classPrefix,
        btnProps: {}
    };

    render() {

        const {containerClassNames, containerInlineStyle, icon, iconAfter, text, onClick, tooltip, isGroup,
            isElement, element, onMouseDown, onMouseUp, highlight,
            enabled, btnStyle, btnType, classPrefix, btnProps} = this.props;

        const inner = () => {
            return <React.Fragment>
                {!iconAfter ? icon : null}
                {text}
                {iconAfter ? icon : null}
            </React.Fragment>
        };

        return isElement ? element : <div
            {...btnProps}
            className={classNames(
                classPrefix + 'action-btn',
                ...containerClassNames
            )}
            data-group-item={isGroup}
            data-btn-style={btnStyle}
            data-btn-type={btnType}
            data-highlight={highlight}
            style={containerInlineStyle}
            data-disabled={!enabled}
            onClick={e => {
                if(isFunction(onClick)) {
                    onClick(e);
                }
            }}
            onMouseDown={e => {
                if(isFunction(onMouseDown)) {
                    onMouseDown(e);
                }
            }}
            onMouseUp={e => {
                if(isFunction(onMouseUp)) {
                    onMouseUp(e);
                }
            }}
        >
            {tooltip ? <FS_Tooltip
                title={tooltip}
            >
                {inner()}
            </FS_Tooltip> : inner()}
        </div>
    }
}

export default FS_ActionBtn;