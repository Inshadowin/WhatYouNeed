import React, { useState, useCallback, useMemo } from 'react';
import uid from 'uid';

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

    selectorItems,

    getLayout,
    getNewItemId,

    processDrop,
    processLayoutChange,

    BoardComponent,
    SelectorComponent,

    ...rest }) => {
    const [boardItems, setBoardItems] = useState(getLayout(initialBoardItems));
    const [stateSelectorItems, setSelectorItems] = useState(initialSelectorItems);
    const [draggingItem, setDraggingItem] = useState(null);

    const thisSelectorItems = useMemo(() => selectorItems || stateSelectorItems, [selectorItems, stateSelectorItems]);

    const handleDrop = useCallback((e) => processDrop(e, draggingItem, thisSelectorItems, setBoardItems, getNewItemId), [selectorItems, thisSelectorItems, draggingItem, getNewItemId]);
    const handleDragEnd = useCallback((e, id) => setDraggingItem(null), [setDraggingItem]);
    const handleDragStart = useCallback((e, id) => setDraggingItem(e.target.id || id), [setDraggingItem]);
    const handleLayoutChange = useCallback(layout => setBoardItems(oldBoardItems => processLayoutChange(layout, oldBoardItems)), [processLayoutChange]);

    return <div className={[className, defaultClassName].filter(item => !!item).join(' ')}>
        <BoardComponent
            items={boardItems}
            layout={boardItems}

            onDrop={handleDrop}
            onLayoutChange={handleLayoutChange}
        />
        <SelectorComponent
            items={thisSelectorItems}

            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}

        />
    </div>
}

const processLayoutChange = (newLayout = [], oldBoardItems = []) => {
    if (!newLayout?.length || !oldBoardItems?.length) return [];

    const newBoardItems = (oldBoardItems || []).map(item => {
        const layoutBoardItem = (newLayout || []).filter(layoutItem => layoutItem.i === item.i)[0];
        if (!layoutBoardItem) return item;

        //TODO: check with diff
        return { ...item, ...layoutBoardItem };
    })

    return newBoardItems;
}

const getNewItemId = oldItems => {
    // return oldItems.length.toString();
    const res = uid();
    if ((oldItems || []).some(({ id }) => id === res)) return getNewItemId(oldItems);

    return res;
}

const processDrop = (e, draggingItem, selectorItems, setBoardItems, getNewItemId) => {
    if (!draggingItem) return;

    const { Component, layoutDefaults = {} } = selectorItems.filter(({ id }) => id === draggingItem)[0] || {};
    if (!Component) return console.error("No item or no Component on item found", "Items:", selectorItems, "draggingItem:", draggingItem)

    const newItem = { ...e, ...(layoutDefaults || {}), Component };

    setBoardItems(oldItems => [...oldItems, { ...newItem, i: getNewItemId(oldItems) }])
}

Main.defaultProps = {
    initialBoardItems: [],
    initialSelectorItems: [],

    getLayout: defaultGetLayout,
    getNewItemId: getNewItemId,

    processDrop: processDrop,
    processLayoutChange: processLayoutChange,

    defaultClassName: 'wyn-template-builder-container',

    BoardComponent: Board,
    SelectorComponent: Selector,
}

export default React.memo(Main);