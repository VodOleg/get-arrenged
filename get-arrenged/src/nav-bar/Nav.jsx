import React, { Component } from 'react';
import Clock from './../Clock.js';
import './Nav.css';
import {NavLink, BrowserRouter} from 'react-router-dom';
import {getUser} from './../userLobby/UserActions';
import {connect} from 'react-redux';
import { GET_USER } from '../userLobby/UserActions.js';
class Nav extends Component {
//FIX USER STATE, WHEN USER LOGS IN CHANGE THE LOGIN NAVBUTTON TO LOGOUT
  componentWillMount(){
    
  }
  tester(user){
    console.log(user);
  }
  
  render() {
    return (

      <div className="navigationMenu">
        <div className="clock">
            <Clock />
        </div>
        <BrowserRouter forceRefresh={true}>
          <div className="myMenu">
              <div className="row">
                      <div className="col-12">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                          <NavLink exact className="nav-link" id="v-pills-home-tab" data-toggle="pill" to="/" role="tab" aria-controls="v-pills-home" aria-selected="false" >Home</NavLink>
                          <NavLink exact className="nav-link" id="v-pills-profile-tab" data-toggle="pill" to="/Login" role="tab" aria-controls="v-pills-profile" aria-selected="false">Login/Register</NavLink>
                          <NavLink exact className="nav-link" id="v-pills-messages-tab" data-toggle="pill" to="/App" role="tab" aria-controls="v-pills-messages" aria-selected="false">Create Schedule</NavLink>
                          <a className="nav-link" id="v-pills-settings-tab" href="#" data-toggle="pill" role="tab" aria-controls="v-pills-settings" aria-selected="false" onClick={()=>this.tester(getUser())}>TESTER</a>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="tab-content" id="v-pills-tabContent">
                          <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">...</div>
                          <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">...</div>
                          <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">...</div>
                          <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                        </div>
                      </div>
                    </div>
              </div>
          </BrowserRouter>
      </div>
    );
    
  }
}

function mapStateToProps(state){
  return {nav : state.user}
}

export default connect(mapStateToProps)(Nav);
