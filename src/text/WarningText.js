import React from "react";
import { Tooltip } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './WarningText.css';

const WarningText = ({ children, title, className, IconComponent, iconProps, TooltipComponent, tooltipParams, iconContent }) => {
    return <span className={['warning-text', className || ''].join(' ')}>
        {children}
        {iconContent || <TooltipComponent title={title} {...tooltipParams}>
            <IconComponent {...iconProps} />
        </TooltipComponent>}
    </span>
}

WarningText.defaultProps = {
    // component that can display icon
    IconComponent: ExclamationCircleOutlined,
    // icon props, duh
    iconProps: { type: "exclamation-circle", theme: "twoTone", twoToneColor: 'rgba(216, 108, 112, 0.8)', style: { fontSize: 16, position: 'absolute', top: -8, right: -12 } },
    // content that shows error
    iconContent: null,

    TooltipComponent: Tooltip,
    tooltipParams: {},
    // tooltipParams: globals.tooltipParams,
}

export default React.memo(WarningText);