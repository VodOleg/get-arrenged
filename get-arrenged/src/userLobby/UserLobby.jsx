import React, { Component } from 'react';
import Table from './../table-component/Table';
import Messanger from './../Messanger/Messanger';
import {database} from './../Firebase';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';


class UserLobby extends Component {
  constructor(props){
    super(props);

    this.database = database;
  }

  componentWillMount(){
    this.props.getUser();
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
            
            <Messanger database={this.database} user={this.props.user.user} />
        </div>
        
        
      </div>
    );
    
  }
}

UserLobby.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.user
});  

export default connect(mapStateToProps, {getUser})(UserLobby);