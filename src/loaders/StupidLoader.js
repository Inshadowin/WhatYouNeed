import React from 'react';

class StupidLoader extends React.PureComponent {
    signal = null;

    componentDidMount() {
        const { onLoad } = this.props;
    }
    componentWillUnmount() {

    }
}

export default StupidLoader;