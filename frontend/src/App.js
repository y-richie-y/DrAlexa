import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from 'react-bootstrap/lib/Button';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';

class App extends Component {
  render(jumbotronInstance) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <br />
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button bsStyle="primary">Learn more</Button>
            </p>
          </Jumbotron>
        </p>
      </div>
    );
  }
}

const jumbotronInstance = (
	<Jumbotron>
		<h1>Hello, world!</h1>
		<p>
			This is a simple hero unit, a simple jumbotron-style component for calling
			extra attention to featured content or information.
		</p>
		<p>
			<Button bsStyle="primary">Learn more</Button>
		</p>
	</Jumbotron>
);

// render(jumbotronInstance);

export default App;
