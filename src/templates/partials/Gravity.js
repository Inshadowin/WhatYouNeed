import React from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';

const GridLayoutWithWidth = React.memo(WidthProvider(GridLayout));

GridLayoutWithWidth.defaultProps = {
    height: "100%"
}

export default GridLayoutWithWidth;