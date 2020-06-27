import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo/Demo';

import './styles.css';

class App extends React.Component {
  render() {
    return <Demo />
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
module.hot.accept();