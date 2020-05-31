import React from 'react';
import ReactDOM from 'react-dom';
import DemoText from './text/test/Demo';
import DemoTable from './dataDisplay/test/tables/Demo';

import './styles.css';

class App extends React.Component {

  render() {
    return <React.Fragment>
      <DemoText />
      <DemoTable />
    </React.Fragment>
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();