import React, { useState, useCallback } from 'react';

import Board from './partials/Board';
import Selector from './partials/Selector';

import { defaultGetLayout } from './partials/boardFunctions';

import './styles/Main.css';

const Main = ({
    defaultClassName,
    className,

    initialBoardItems,
    initialBoardLayout,
    initialSelectorItems,

    getLayout,

    processDrop,
    processLayoutChange,

    BoardComponent,
    SelectorComponent,

    ...rest }) => {
    const [boardItems, setBoardItems] = useState(getLayout(initialBoardItems));
    const [selectorItems, setSelectorItems] = useState(initialSelectorItems);
    const [draggingItem, setDraggingItem] = useState(null);

    const handleDrop = useCallback((e) => processDrop(e, draggingItem, selectorItems, setBoardItems), [selectorItems, draggingItem]);
    const handleDragStart = useCallback((e, id) => setDraggingItem(e.target.id), [setDraggingItem]);
    const handleLayoutChange = useCallback(layout => setBoardItems(oldBoardItems => processLayoutChange(layout, oldBoardItems)), [processLayoutChange]);

    return <div className={[className, defaultClassName].filter(item => !!item).join(' ')}>
        <BoardComponent
            items={boardItems}
            layout={boardItems}
            // layout={boardLayout}
            onLayoutChange={handleLayoutChange}

            onDrop={handleDrop}
        />
        <SelectorComponent
            items={selectorItems}

            onDragStart={handleDragStart}
        />
    </div>
}

const processLayoutChange = (newLayout = [], oldBoardItems = []) => {
    if (!newLayout?.length || !oldBoardItems?.length) return [];

    const newBoardItems = (oldBoardItems || []).map(item => {
        const layoutBoardItem = (newLayout || []).filter(layoutItem => layoutItem.i === item.id)[0];
        if (!layoutBoardItem) return item;

        //TODO: check with diff
        return { ...item, ...layoutBoardItem };
    })

    return newBoardItems;
}

const processDrop = (e, draggingItem, selectorItems, setBoardItems) => {
    const { Component, layoutDefaults = {} } = selectorItems.filter(({ id }) => id === draggingItem)[0] || {};
    if (!Component) return console.error("No item or no Component on item found", "Items:", selectorItems, "draggingItem:", draggingItem)

    const newItem = { ...e, ...(layoutDefaults || {}), Component };

    setBoardItems(oldItems => [...oldItems, { ...newItem, i: oldItems.length.toString() }])
}

Main.defaultProps = {
    initialBoardItems: [],
    initialSelectorItems: [],

    getLayout: defaultGetLayout,

    processDrop: processDrop,
    processLayoutChange: processLayoutChange,

    defaultClassName: 'wyn-template-builder-container',

    BoardComponent: Board,
    SelectorComponent: Selector,
}

export default React.memo(Main);