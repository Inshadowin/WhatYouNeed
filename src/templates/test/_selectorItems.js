import getComponents from '../staticComponents/index';
const { Avatar, TextArea, Input, Spin } = getComponents();

export default () => {
    return [
        { Component: TextArea, preview: 'TextArea', id: 'TextArea', layoutDefaults: { w: 12, h: 5 } },
        { Component: Input, preview: 'Input', id: 'Input', layoutDefaults: { w: 10, h: 2 } },
        { Component: Spin, preview: 'Spin', id: 'Spin', layoutDefaults: {} },
        { Component: Avatar, preview: 'Avatar', id: 'Avatar', layoutDefaults: { w: 3, h: 3 } },
    ]
}