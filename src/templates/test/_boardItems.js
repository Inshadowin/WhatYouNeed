import getComponents from '../staticComponents/index';
const { Acticle, Switch, Picture, Pop, Avatar } = getComponents();

export default () => {
    return [
        { x: 0, y: 0, w: 1, h: 2, Component: Acticle },
        { x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, Component: Switch },
        { x: 4, y: 2, w: 1, h: 2, Component: Picture },
        { x: 4, y: 2, w: 1, h: 2, Component: Pop },
        { x: 4, y: 2, w: 1, h: 2, Component: Avatar },
    ]
}