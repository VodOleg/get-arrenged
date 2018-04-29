import React, { Component } from 'react';
import Nav from './nav-bar/Nav';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser} from './userLobby/UserActions';

class Home extends Component {

  componentWillMount(){
    this.props.getUser();
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="page">
          <div className="box" style={{"textAlign":"center",marginTop:"15%"}}>
            <h1>Create and collaborate weekly schedules</h1>
            <h2>Comming soon</h2>
            <h6>
              Feel free to login and test the app!
            </h6>
          </div>
        </div>
      </div>
    );
    
  }
}

Home.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.user
});  

export default connect(mapStateToProps, {getUser})(Home);