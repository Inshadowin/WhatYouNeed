import React, { useMemo, useCallback } from 'react';
import { Empty } from 'antd';
import { debounce } from "debounce";

import Gravity from './Gravity';
import { defaultLayoutItemRender } from './boardFunctions';
import { getLayoutItemId, getBoardItemId } from '../functions/accesors';

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

// const DefaultLayoutItem = React.memo(React.forwardRef(({ index, Component, ...rest }, forwardedRef) => {
//     const children = Component ? <Component {...rest} /> : `ITEM  ${index}`;

//     return <div className={'wyn-template-component-container'} key={index} ref={forwardedRef}>
//         <div className={'drag-handle'}></div>
//         <div className={'wyn-template-component'}>
//             {children}
//         </div>
//     </div>
// }))

const Board = ({
    empty,
    children,

    className,
    defaultClassName,

    items,
    layoutItemRender,

    onDrop,

    onItemDelete,
    onLayoutChange,
    onLayoutChangeDebounceDelay,

    GridComponent,
    ContainerComponent,
    LayoutItemComponent,

    ...rest }) => {
    const boardItemsRendered = useMemo(() => (items || []).map(item => {
        const onDelete = onItemDelete ? (...rest) => onItemDelete(getBoardItemId(item), ...rest) : undefined;

        return layoutItemRender(getLayoutItemId(item), { onDelete, ...item })
    }), [items]);
    const handleLayoutChange = useCallback(debounce((...rest) => onLayoutChange && onLayoutChange(...rest)), [onLayoutChange, onLayoutChangeDebounceDelay]);
    const handleDrop = useCallback((...rest) => onDrop && onDrop(...rest), [onDrop]);

    //TODO: remove this bs
    if (!items || !items.length) return <BoardContainer defaultClassName={defaultClassName}>{empty}</BoardContainer>;

    return <BoardContainer className={className} defaultClassName={defaultClassName}>
        <GridComponent
            cols={30}
            autoSize
            isDroppable
            rowHeight={50}
            useCSSTransforms
            compactType={null}
            draggableHandle={'.drag-handle'}

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

    // LayoutItemComponent: DefaultLayoutItem,
    layoutItemRender: defaultLayoutItemRender,
}

export default React.memo(Board);