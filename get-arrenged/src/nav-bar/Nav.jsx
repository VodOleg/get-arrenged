import React, { Component } from 'react';
import Clock from './../Clock.js';
import './Nav.css';


class Nav extends Component {

  render() {
    return (

      <div className="navigationMenu">
        <div className="clock">
        <Clock />
        </div>
        <div className="row">
          <div className="col-12">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
              <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
              <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</a>
              <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
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
    );
    
  }
}

export default Nav;