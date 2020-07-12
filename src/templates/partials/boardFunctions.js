import React from 'react';
import memoize from 'memoize-one';

//can't use component
export const defaultLayoutItemRender = memoize((index, { Component, deletable = true, onDelete, ...props }) => {
    const children = Component ? <Component {...props} /> : `ITEM  ${index}`;

    return <div className={'wyn-template-component-container'} key={index}>
        <div className={'wyn-template-header'}>
            <div className={'drag-handle'} />
            {deletable && <div className={'delete-button'} onClick={onDelete} />}
        </div>
        <div className={'wyn-template-component'}>
            {children}
        </div>
    </div>
})
export const defaultGetLayout = (items) => {
    return items.map((item, index) => ({ i: index.toString(), ...item }))
}