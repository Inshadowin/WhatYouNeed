import getComponents from '../staticComponents/index';
const { Acticle, Switch, Picture, TextArea } = getComponents();

export default () => {
    return [
        { Component: Switch, preview: 'Switch', id: 'Switch' },
        { Component: Acticle, preview: 'Article', id: 'Article' },
        { Component: Picture, preview: 'Picture', id: 'Picture' },
        { Component: TextArea, preview: 'TextArea', id: 'TextArea' },
    ]
}