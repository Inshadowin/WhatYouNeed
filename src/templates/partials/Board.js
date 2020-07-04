import React, { useMemo } from 'react';
import { Empty } from 'antd';

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

const Board = ({ empty, children, className, defaultClassName, boardItems, getLayout, layoutItemRender, LayoutItemComponent, GridComponent, ContainerComponent, ...rest }) => {
    const layout = useMemo(() => getLayout(boardItems || []), [boardItems]);
    // const boardItemsRendered = useMemo(() => (boardItems || []).map((item, index) => <LayoutItemComponent key={index} index={index} {...item} />), [boardItems]);
    const boardItemsRendered = useMemo(() => (boardItems || []).map((item, index) => layoutItemRender(index, item)), [boardItems]);

    if (!boardItems || !boardItems.length) return <BoardContainer defaultClassName={defaultClassName}>{empty}</BoardContainer>;

    const onLayoutChange = (layout) => {
        console.log(layout)
    }

    return <BoardContainer className={className} defaultClassName={defaultClassName}>
        <GridComponent
            cols={50}
            rowHeight={30}
            compactType={null}
            // verticalCompact={false}

            layout={layout}
            onLayoutChange={onLayoutChange}
            // droppingItem={''}
            {...rest}
        >
            {boardItemsRendered}
        </GridComponent>
    </BoardContainer>;
};

Board.defaultProps = {
    empty: <Empty description={'CREATE YOUR PAGE'} image={Empty.PRESENTED_IMAGE_SIMPLE} />,

    measureBeforeMount: true,
    defaultClassName: 'wyn-template-board',

    GridComponent: Gravity,
    ContainerComponent: BoardContainer,

    getLayout: defaultGetLayout,
    // LayoutItemComponent: DefaultLayoutItem,
    layoutItemRender: defaultLayoutItemRender,
}

export default React.memo(Board);