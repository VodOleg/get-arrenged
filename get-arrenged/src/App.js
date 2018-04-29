import React, { Component } from 'react';
import './App.css';
import Nav from './nav-bar/Nav';
import UserLobby from './userLobby/UserLobby';

class App extends Component {
  
  render() {
    return (
      <div className="App">
          <Nav />
          <UserLobby />
      </div>
    );
    
  }
}

export default App;
