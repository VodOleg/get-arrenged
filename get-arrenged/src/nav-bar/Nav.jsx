import React, { Component } from 'react';
import {connect} from 'react-redux';
import Clock from './../Clock.js';
import { NavLink } from 'react-router-dom';
import {getUser, logout, deleteAccount} from './../userLobby/UserActions';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Button } from 'antd';
import './Nav.css';
import UserStatus from './../userLobby/userStatus';
const { Sider } = Layout;


class Nav extends Component {
  constructor(props){
    super(props);
    this.state={
      collapsed: false
    }
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed
    })
  }


  render() {
    let styles={cursor:"default", textDecoration:"none", minWidth:"100px",height:"32px", border:"1px solid transperent",textAlign:"center", borderRadius:"4px", background:"white", padding:"6px 15px"};
    return (
       
        <Sider
          style={{flex:"none", position:"absolute", height:"100%", cursor:"default !important",textDecoration:"none"}}
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
              <div className="logo antMenu" />
        <div className="clock">
           <Clock />
        </div>
        <div className="userstatus">
          <UserStatus user={!this.props.user.user ? 'Guest' : this.props.user.user.email }/>
        </div>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                  <Icon type="home" />
                  <span><NavLink style={styles} to="/">Home</NavLink></span>
                </Menu.Item>
                
                <Menu.Item key="3">
                  <Icon type="lock" />
                  <span>
                  { !this.props.user.user ? (<NavLink style={styles} to="/Login">Login</NavLink>) : (<Button type="dashed" style={{cursor:"default", textDecoration:"none"}} onClick={() =>{this.props.logout()} }>Log out</Button>) }
                  </span>
                </Menu.Item>
                <Menu.Item key="4">
                { this.props.user.user ? (<Icon type="warning" />) : (<span></span>)}
                  <span>
                  { this.props.user.user ? (<Button type="danger" style={{cursor:"default", textDecoration:"none"}}  onClick={() =>{this.props.deleteAccount()} }>Delete Account</Button>) : (<span></span>) }
                  </span>
                </Menu.Item>
              </Menu>
            </Sider>
      


    );
    
  }
}

Nav.propTypes = {
  user : PropTypes.object
}

const mapStateToProps = state => ({
  user : state.user
});

export default connect(mapStateToProps, {getUser, logout, deleteAccount})(Nav);
