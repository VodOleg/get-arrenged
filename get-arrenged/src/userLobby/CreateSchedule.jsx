import React, { Component } from 'react';
import Nav from './../nav-bar/Nav';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser} from './../userLobby/UserActions';
import Schedule from './../Schedule/Schedule';
import Messanger from './../Messanger/Messanger';
import Table from '../table-component/Table';
import './UserLobby.css';

class CreateSchedule extends Component {

constructor(props){
    super(props);
    this.state ={
        sharedID: ''
    }

}

  componentWillMount(){
    this.props.getUser();
  }
  componentWillReceiveProps(props){
      this.setState({
          sharedID : props.user.user.uid
      });
  }

  render() {
    return (
      <div>
            <Nav />
          <div className="page">
            <div>
                <div className={"scheduleContainer"} >
                    <div>
                        <Schedule
                            rows = {[ "morning", "evening", "night"]}
                            cols = {[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
                        />
                    </div>
                    <br/><br/>
                    <p>send this code to your schedule members so they can join this schedule:</p>
                    <code>{this.state.sharedID}</code>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <Messanger user={this.props.user.user} />
                    </div>
                </div>
            </div>
          </div>
      </div>
    );
    
  }
}

CreateSchedule.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.user
});  

export default connect(mapStateToProps, {getUser})(CreateSchedule);