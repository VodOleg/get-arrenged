import React, { Component } from 'react';
import Messanger from './../Messanger/Messanger';
import {database} from './../Firebase';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';
import Schedule from '../Schedule/Schedule';


class UserLobby extends Component {
  constructor(props){
    super(props);

    this.database = database;
    this.createSchedule = this.createSchedule.bind(this);
    this.db = this.database.ref().child('users');
  }

  componentWillMount(){
    this.props.getUser();
  }

  createSchedule(){
    console.log(this.props.user.user.uid);
  }

  render() {
    return (
      <div className="UserLobby">
        <div className="page">
            <div className="Table">
              <Schedule 
                  rows = {[ "morning", "evening", "night"]}
                  cols = {[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
              />
                {/* <Table 
                          rows = {[ "morning", "evening", "night"]}
                          cols = {[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
                          database={this.database}
                          /> */}
                          <p>
                              You do not own or participate in any schedule.
                          </p>

                          <button className="btn btn-primary" onClick={() => this.createSchedule()}>
                            Create Schedule
                          </button>
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