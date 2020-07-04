import React from 'react';

const Selector = ({ className, defaultClassName, items }) => {
    return <div className={[className, defaultClassName].filter(item => !!item).join(' ')}>
        SELECTOR
</div>
}

Selector.defaultProps = {
    items: [],

    defaultClassName: 'wyn-template-selector'
}

export default React.memo(Selector);