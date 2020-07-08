import React, { useMemo, useCallback } from 'react';
import { Empty } from 'antd';
import { debounce } from "debounce";

import Gravity from './Gravity';
import { defaultLayoutItemRender, defaultGetLayout } from './boardFunctions';

import '../styles/Board.css';

const DivComponent = React.memo((props) => {
    return <div {...props} />;
})

const BoardContainer = React.memo(({ children, defaultClassName, className, ContainerComponent }) => {
    return <ContainerComponent className={[className, defaultClassName].filter(item => !!item).join(' ')}>
        {children}
    </ContainerComponent>
});

BoardContainer.defaultProps = {
    ContainerComponent: DivComponent
}

// const DefaultLayoutItem = React.memo(({ index, ...rest }) => {
//     return <div style={{ background: 'lightblue' }} key={index}>{'ITEM ' + index}</div>
// })

const Board = ({
    empty,
    children,

    className,
    defaultClassName,

    items,
    getLayout,
    layoutItemRender,

    // onDrag,
    onDrop,

    onLayoutChange,
    onLayoutChangeDebounceDelay,

    GridComponent,
    ContainerComponent,
    LayoutItemComponent,

    ...rest }) => {
    const layout = useMemo(() => getLayout(items || []), [items]);
    // const boardItemsRendered = useMemo(() => (boardItems || []).map((item, index) => <LayoutItemComponent key={index} index={index} {...item} />), [items]);
    const boardItemsRendered = useMemo(() => (items || []).map((item, index) => layoutItemRender(index, item)), [items]);

    if (!items || !items.length) return <BoardContainer defaultClassName={defaultClassName}>{empty}</BoardContainer>;

    const handleLayoutChange = useCallback(debounce((...rest) => {
        onLayoutChange && onLayoutChange(...rest);
    }), [onLayoutChange, onLayoutChangeDebounceDelay]);
    // const handleDrag = useCallback(debounce((element) => {
    //     onDrag && onDrag(element.e.target);
    //     // console.log(e.target)
    // }, dragDebounceDelay), [onDrag, dragDebounceDelay])

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
            // verticalCompact={false}

            layout={layout}
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
    measureBeforeMount: true,
    defaultClassName: 'wyn-template-board',

    GridComponent: Gravity,
    ContainerComponent: BoardContainer,

    getLayout: defaultGetLayout,
    // LayoutItemComponent: DefaultLayoutItem,
    layoutItemRender: defaultLayoutItemRender,
}

export default React.memo(Board);