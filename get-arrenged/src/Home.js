import React, { Component } from 'react';
import Nav from './nav-bar/Nav';

class Home extends Component {

  render() {
    return (
      <div>
        <Nav />
        <div className="page">
          <h1>Create Schedule</h1>
          <button>Start Here!</button>
        </div>
      </div>
    );
    
  }
}

export default Home;