import getComponents from '../staticComponents/index';
const { Pop, TextArea, Avatar } = getComponents();

export default () => {
    return [
        { x: 4, y: 2, w: 2, h: 2, Component: Pop },
        { x: 10, y: 2, w: 10, h: 4, Component: TextArea },
        { x: 4, y: 2, w: 3, h: 3, minW: 2, maxW: 4, Component: Avatar },
    ]
}