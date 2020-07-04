import React from 'react';

import Board from './partials/Board';
import Selector from './partials/Selector';

import './styles/Main.css';

const Main = ({
    defaultClassName,
    className,

    boardItems,
    selectorItems,

    BoardComponent,
    SelectorComponent,

    ...rest }) => {
    return <div className={[className, defaultClassName].filter(item => !!item).join(' ')}>
        <BoardComponent boardItems={boardItems}></BoardComponent>
        <SelectorComponent selectorItems={selectorItems}></SelectorComponent>
    </div>
}

Main.defaultProps = {
    boardItems: [],
    selectorItems: [],
    defaultClassName: 'wyn-template-builder-container',

    BoardComponent: Board,
    SelectorComponent: Selector,
}

export default React.memo(Main);