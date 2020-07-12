import getComponents from '../staticComponents/index';
const { Blank, Input, Pop, Picture, Spin, TextArea } = getComponents();

export default () => {
    return [
        { Component: Blank, preview: 'Blank', id: 'Blank', layoutDefaults: {} },
        { Component: Input, preview: 'Input', id: 'Input', layoutDefaults: { w: 10, h: 2 } },
        { Component: Pop, preview: 'Pop', id: 'Pop', layoutDefaults: {} },
        { Component: Picture, preview: 'Picture', id: 'Picture', layoutDefaults: { w: 3, h: 3 } },
        { Component: Spin, preview: 'Spin', id: 'Spin', layoutDefaults: {} },
        { Component: TextArea, preview: 'TextArea', id: 'TextArea', layoutDefaults: { w: 12, h: 5 } },
    ]
}