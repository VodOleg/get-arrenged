import React, { Component } from 'react';
import Nav from './../nav-bar/Nav';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser} from './../userLobby/UserActions';
import Messanger from './../Messanger/Messanger';
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
  componentWillReceiveProps(newprops){
    if(!newprops.user.user){this.props.history.replace('/Login'); return;}
      this.setState({
          sharedID : newprops.user.user.uid
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
                        
                    </div>
                    <br/><br/>
                    <p>send this code to your schedule members so they can join this schedule:</p>
                    <code>{this.state.sharedID}</code>
                    <br/><br/>
                    <p>To manage the schedule, go back to App (from navigation menu)</p>
                    <p>and join your schedule using the code</p>
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