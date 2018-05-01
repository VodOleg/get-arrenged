import React, { Component } from 'react';
import Messanger from './../Messanger/Messanger';
import {database} from './../Firebase';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';
import Schedule from '../Schedule/Schedule';
import {Link} from 'react-router-dom';
import Table from './../table-component/Table';
import './UserLobby.css';

class UserLobby extends Component {
  constructor(props){
    super(props);

    this.state = {
      sharedID: ''
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.database = database;
    
    this.db = this.database.ref().child('users');
  }


  componentWillMount(){
    this.props.getUser();
  }

  handleUserInput(e){
        this.setState({
            sharedID: e.target.value
        })
    }

  joinSchedule(e){
    
  }

  render() {
    return (
      <div className="UserLobby">
        <div className="page">
            <div className="Table">
                          <p>
                              You do not own or participate in any schedule.
                          </p>
              <div className="joincode">

                    <Link to={{
                      pathname:'/JoinSchedule',
                      state:{
                        sharedID: this.state.sharedID
                      }
                    }} className={"myAppButton"}>
                        Join Schedule
                    </Link>

                    <input type="text"
                      className="messageInput"
                      placeholder="paste the code here"
                      value= {this.state.sharedID}
                      onChange={this.handleUserInput}
                      />
              
                    </div>
                    <br/><br/>
                    <Link to={"/CreateSchedule"} className={"myAppButton"}>
                        Create Schedule
                    </Link>
                  
              </div>
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