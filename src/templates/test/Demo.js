import React, { useMemo } from 'react';
import Main from '../Main';

import getBoardItems from './_boardItems';
import getSelectorItems from './_selectorItems';

const Demo = ({ }) => {
    const boardItems = useMemo(() => getBoardItems(), []);
    const selectorItems = useMemo(() => getSelectorItems(), []);

    return <Main boardItems={boardItems} selectorItems={selectorItems} />;
}

export default React.memo(Demo);