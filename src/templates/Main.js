import React, { useState, useCallback, useMemo } from 'react';
import uid from 'uid';
import { updatedDiff } from 'deep-object-diff';

import Board from './partials/Board';
import Selector from './partials/Selector';

import { defaultGetLayout } from './partials/boardFunctions';

import './styles/Main.css';

const Main = ({
    defaultClassName,
    className,

    boardClassName,
    selectorClassName,

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

    selectorProps,

    ...rest }) => {
    const [boardItems, setBoardItems] = useState(getLayout(initialBoardItems));
    const [stateSelectorItems, setSelectorItems] = useState(initialSelectorItems);
    const [draggingItem, setDraggingItem] = useState(null);

    const thisSelectorItems = useMemo(() => selectorItems || stateSelectorItems, [selectorItems, stateSelectorItems]);

    const handleDelete = useCallback(id => setBoardItems(oldItems => oldItems.filter(item => item.i !== id)));
    const handleDrop = useCallback((e) => processDrop(e, draggingItem, thisSelectorItems, setBoardItems, getNewItemId), [selectorItems, thisSelectorItems, draggingItem, getNewItemId]);
    const handleDragEnd = useCallback((e, id) => setDraggingItem(null), [setDraggingItem]);
    const handleDragStart = useCallback((e, id) => setDraggingItem(e.target.id || id), [setDraggingItem]);
    const handleLayoutChange = useCallback(layout => setBoardItems(oldBoardItems => processLayoutChange(layout, oldBoardItems)), [processLayoutChange]);

    return <div className={[className, defaultClassName].filter(item => !!item).join(' ')}>
        <BoardComponent
            items={boardItems}
            layout={boardItems}

            className={boardClassName}

            onDrop={handleDrop}
            onItemDelete={handleDelete}
            onLayoutChange={handleLayoutChange}

            {...rest}
        />
        <SelectorComponent
            {...selectorProps}

            items={thisSelectorItems}

            className={selectorClassName}

            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}

        />
    </div>
}

/**
 * function applies layout changes to board items
 * @param {Array<object>} newLayout 
 * @param {Array<object>} oldBoardItems 
 */
const processLayoutChange = (newLayout = [], oldBoardItems = []) => {
    if (!newLayout?.length || !oldBoardItems?.length) return oldBoardItems || [];

    const applyLayoutChanges = (boardItem, layoutBoardItem) => {
        const diff = updatedDiff(layoutBoardItem, boardItem) || {};
        if (!Object.keys(diff).length) return boardItem;

        return { ...boardItem, ...layoutBoardItem };
    }

    const getNewBoardItem = (item) => {
        const { i: boardItemId } = item;
        const layoutBoardItem = (newLayout || []).filter(({ i: layoutItemId }) => boardItemId === layoutItemId)[0];
        if (!layoutBoardItem) return item;

        return applyLayoutChanges(item, layoutBoardItem);
    }

    return (oldBoardItems || []).map(getNewBoardItem)
}

/**
 * function that generates unique id (i) of board/layout item
 * @param {Array<object>} oldItems - array of all current items on board
 */
const getNewItemId = oldItems => {
    const res = uid();
    if ((oldItems || []).some(({ id }) => id === res)) return getNewItemId(oldItems);

    return res;
}

/**
 * function handles drop of item from selector to the board
 * @param {Event} e - event of drop
 * @param {String} draggingItem - id of item that is currently dropping
 * @param {Array<object>} selectorItems - array of all items of selector
 * @param {Function} setBoardItems - function that sets the items of board
 * @param {Function} getNewItemId - function that generates unique id (i) of board/layout item
 */
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

    // boardClassName: 'highlighted',

    BoardComponent: Board,
    SelectorComponent: Selector,
}

export default React.memo(Main);