import React, { useRef, useState, useCallback, useMemo } from "react";
import { Tooltip, Popover } from "antd";
import settings from '../settings/index';

import './SmartText.css';

const WynSmartText = ({ defaultTooltipParams, tooltipParams, ...rest }) => {
    const mergedTooltipParams = useMemo(() => ({ ...defaultTooltipParams, tooltipParams }), [defaultTooltipParams, tooltipParams]);

    return <SmartTextBase tooltipParams={mergedTooltipParams} {...rest} />
}

WynSmartText.defaultProps = {
    tooltipParams: {},
    defaultTooltipParams: settings.tooltipParams
}

const SmartTextBase = React.memo(({ children, title, className, tooltipParams = {}, TooltipComponent, tooltipAllwaysRequired, tooltipNeverRequired }) => {
    const [thisRef, setThisRef] = useState(useRef(null).current);

    const { clientWidth, clientHeight, scrollWidth, scrollHeight } = thisRef || {};
    const textOverflowed = (scrollWidth > clientWidth || scrollHeight > clientHeight);
    const thisTitle = (title !== undefined ? title : tooltipParams.title !== undefined ? tooltipParams.title : children) || '';
    const isTooltipRequired = useMemo(() => tooltipAllwaysRequired || !tooltipNeverRequired && textOverflowed && !!thisTitle, [textOverflowed, thisTitle, tooltipAllwaysRequired, tooltipNeverRequired]);
    const content = useMemo(() => <div
        ref={node => setThisRef(node)}
        className={`wyn-smart-text with-ellipsis${className ? ` ${className}` : ''}`}
    >
        {children}
    </div>, [className, children]);

    console.log(isTooltipRequired);

    if (!isTooltipRequired) return content

    return <TooltipComponent {...tooltipParams} title={thisTitle} trigger={isTooltipRequired ? tooltipParams.trigger : ''}>
        {content}
    </TooltipComponent>
})

SmartTextBase.defaultProps = {
    TooltipComponent: Tooltip,
    tooltipAllwaysRequired: false,
    tooltipNeverRequired: false
}

export default React.memo(WynSmartText);