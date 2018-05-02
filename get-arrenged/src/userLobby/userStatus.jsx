import React, { Component } from 'react';
class UserStatus extends Component {

  render() {
      var styles={color:"white", textAlign:"center", marginBottom:"20px"};
        return (
            <div style={styles}>
                Hi, {this.props.user}    
            </div>
        )
    }
}
export default UserStatus;