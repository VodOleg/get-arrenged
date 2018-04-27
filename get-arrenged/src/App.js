import React, { Component } from 'react';
import './App.css';
import Clock from './Clock.js';
import Table from './table-component/Table';
import { DB_CONFIG } from './Config/config';
import Firebase from 'firebase';
import 'firebase/database';
import Messanger from './Messanger/Messanger';

class App extends Component {
  constructor(props){
    super(props);

    this.app = Firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database();
  }

  render() {
    return (
      <div>
        <Clock />
        <div className="Table">
            <Table 
                      rows = {[ "morning", "evening", "night"]}
                      cols = {[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
                      
                      />
        </div>
        
        <Messanger database={this.database} />


      </div>
    );
    
  }
}

export default App;
