import React, { useMemo } from 'react';

import '../styles/Selector.css';

const ContainerComponent = React.memo(({ children, Component, onDragStart, id, ...rest }) => {
    return <div
        id={id}
        draggable
        unselectable="on"
        // component={Component}
        onDragStart={e => {
            e.dataTransfer.setData("text/plain", "");
            onDragStart(e, id);
        }}

        {...rest}
    >
        {children}
    </div>
})

ContainerComponent.defaultProps = {
    className: 'wyn-template-selector-item-container'
}

const Selector = ({ className, defaultClassName, items, noPreview, onDragStart }) => {
    const renderedItems = useMemo(() => (items || []).map(({ preview, id, Component }, index) => <ContainerComponent key={index} id={id} onDragStart={onDragStart} Component={Component}>{preview || noPreview}</ContainerComponent>),
        [items]);

    return <div className={[className, defaultClassName].filter(item => !!item).join(' ')}>
        {renderedItems}
    </div>
}

Selector.defaultProps = {
    items: [],
    noPreview: 'NoPreviewAvailable',

    defaultClassName: 'wyn-template-selector'
}

export default React.memo(Selector);