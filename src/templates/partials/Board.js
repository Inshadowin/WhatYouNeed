import React, { useMemo, useCallback } from 'react';
import { Empty } from 'antd';
import { debounce } from "debounce";

import Gravity from './Gravity';
import { defaultLayoutItemRender, defaultGetLayout } from './boardFunctions';

import '../styles/Board.css';

const DivComponent = React.memo(React.forwardRef((props, forwardedRef) => {
    return <div ref={forwardedRef} {...props} />;
}))

const BoardContainer = React.memo(({ children, defaultClassName, className, ContainerComponent }) => {
    return <ContainerComponent className={[className, defaultClassName].filter(item => !!item).join(' ')}>
        {children}
    </ContainerComponent>
});

BoardContainer.defaultProps = {
    ContainerComponent: DivComponent
}

const DefaultLayoutItem = React.memo(React.forwardRef(({ index, Component, ...rest }, forwardedRef) => {
    const children = Component ? <Component {...rest} /> : `ITEM  ${index}`;

    return <div className={'wyn-template-component-container'} key={index} ref={forwardedRef}>
        <div className={'wyn-template-component'}>
            {children}
        </div>
    </div>
}))

const Board = ({
    empty,
    children,

    className,
    defaultClassName,

    items,
    getLayout,
    layoutItemRender,

    onDrop,

    onLayoutChange,
    onLayoutChangeDebounceDelay,

    GridComponent,
    ContainerComponent,
    LayoutItemComponent,

    ...rest }) => {
    const boardItemsRendered = useMemo(() => (items || []).map((item, index) => layoutItemRender(index, item)), [items]);

    if (!items || !items.length) return <BoardContainer defaultClassName={defaultClassName}>{empty}</BoardContainer>;

    const handleLayoutChange = useCallback(debounce((...rest) => {
        onLayoutChange && onLayoutChange(...rest);
    }), [onLayoutChange, onLayoutChangeDebounceDelay]);

    const handleDrop = useCallback((...rest) => {
        onDrop && onDrop(...rest);
    }, [onDrop]);

    return <BoardContainer className={className} defaultClassName={defaultClassName}>
        <GridComponent
            cols={30}
            autoSize
            isDroppable
            rowHeight={50}
            useCSSTransforms
            compactType={null}

            onDrop={handleDrop}
            onLayoutChange={handleLayoutChange}
            // droppingItem={''}
            {...rest}
        >
            {boardItemsRendered}
        </GridComponent>
    </BoardContainer>;
};

Board.defaultProps = {
    empty: <Empty description={'CREATE YOUR PAGE'} image={Empty.PRESENTED_IMAGE_SIMPLE} />,

    onLayoutChangeDebounceDelay: 50,

    preventCollision: true,
    measureBeforeMount: true,

    defaultClassName: 'wyn-template-board',

    GridComponent: Gravity,
    ContainerComponent: BoardContainer,

    getLayout: defaultGetLayout,
    LayoutItemComponent: DefaultLayoutItem,
    layoutItemRender: defaultLayoutItemRender,
}

export default React.memo(Board);