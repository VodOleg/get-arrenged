import React, { Component } from 'react';
import './App.css';
import Table from './table-component/Table';
import { DB_CONFIG } from './Config/config';
import Firebase from 'firebase';
import 'firebase/database';
import Messanger from './Messanger/Messanger';
import Nav from './nav-bar/Nav';

class App extends Component {
  constructor(props){
    super(props);

    this.app = Firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database();
  }

  render() {
    return (
      <div className="App">
        <div className="nav">
          <Nav />
        </div>
        <div className="page">
            <div className="Table">
                <Table 
                          rows = {[ "morning", "evening", "night"]}
                          cols = {[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
                          database={this.database}
                          />
            </div>
            
            <Messanger database={this.database} />
        </div>
        
        
      </div>
    );
    
  }
}

export default App;
