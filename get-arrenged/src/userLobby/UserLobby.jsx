import React, { Component } from 'react';
import Table from './../table-component/Table';
import Messanger from './../Messanger/Messanger';
import {database} from './../Firebase';
class UserLobby extends Component {
  constructor(props){
    super(props);

    this.database = database;
  }

  render() {
    return (
      <div className="UserLobby">
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

export default UserLobby;