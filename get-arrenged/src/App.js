import React, { Component } from 'react';
import './App.css';
import Nav from './nav-bar/Nav';
import UserLobby from './userLobby/UserLobby';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './userLobby/UserActions';
import SimpleBox from './Login/SimpleBox';
import {Link} from 'react-router-dom';

class App extends Component {
  
  componentWillMount(){
    this.props.getUser();
  }

  render() {
    const loginbutton = <Link to ="/Login">Login/Register</Link>;
    return (
      <div className="App">

          <Nav />
          { this.props.user.user ? 
          (<UserLobby />) 
          :
          (
              <SimpleBox className="Table"
              title={"Authenticate please"}
              body={"Before getting arranged you must authenticate :)"}
              footer={loginbutton}
              />
          )
          }
      </div>
    );
    
  }
}

App.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {getUser})(App);
