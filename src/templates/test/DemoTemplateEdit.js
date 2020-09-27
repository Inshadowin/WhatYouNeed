import React, { useMemo, useCallback } from 'react';
import TemplateEdit from '../main/TemplateEdit';

import getBoardItems from './_boardItems';
import getSelectorItems from './_selectorItems';

const DemoTemplateEdit = ({ }) => {
    const boardItems = useMemo(() => getBoardItems(), []);
    const selectorItems = useMemo(() => getSelectorItems(), []);
    const onLayoutChange = useCallback(layout => console.log(layout), []);

    return <TemplateEdit initialBoardItems={boardItems} initialSelectorItems={selectorItems} onLayoutChange={onLayoutChange} />;
}

export default React.memo(DemoTemplateEdit);