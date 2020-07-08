import React, { useState, useCallback } from 'react';

import Board from './partials/Board';
import Selector from './partials/Selector';

import './styles/Main.css';

const Main = ({
    defaultClassName,
    className,

    initialBoardItems,
    initialSelectorItems,

    BoardComponent,
    SelectorComponent,

    ...rest }) => {
    const [boardItems, setBoardItems] = useState(initialBoardItems);
    const [selectorItems, setSelectorItems] = useState(initialSelectorItems);
    const [draggingItem, setDraggingItem] = useState(null);

    const handleDrop = useCallback((e) => {
        const { Component } = selectorItems.filter(({ id }) => id === draggingItem)[0] || {};
        if (!Component) return console.error("No item or no Component on item found", "Items:", selectorItems, "draggingItem:", draggingItem)

        const newItem = { ...e, Component };
        setBoardItems(oldItems => [...oldItems, newItem])
    }, [draggingItem]);

    const handleDragStart = useCallback((e, id) => {
        setDraggingItem(e.target.id)
    }, [setDraggingItem])

    return <div className={[className, defaultClassName].filter(item => !!item).join(' ')}>
        <BoardComponent
            onDrop={handleDrop}
            items={boardItems}
        />
        <SelectorComponent onDragStart={handleDragStart} items={selectorItems} />
    </div>
}

Main.defaultProps = {
    initialBoardItems: [],
    initialSelectorItems: [],
    defaultClassName: 'wyn-template-builder-container',

    BoardComponent: Board,
    SelectorComponent: Selector,
}

export default React.memo(Main);