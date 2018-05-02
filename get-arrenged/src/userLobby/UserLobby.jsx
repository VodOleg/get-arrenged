import React, { Component } from 'react';
import {database} from './../Firebase';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';
import {Link} from 'react-router-dom';
import './UserLobby.css';

class UserLobby extends Component {
  constructor(props){
    super(props);

    this.state = {
      sharedID: '',
      yourcodes: []
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.database = database;
    
    this.db = this.database.ref().child('users');
  }


  componentWillMount(){
    this.props.getUser();
  }

  componentWillReceiveProps(props){
    if (props != null){
      this.database.ref().child('users/'+props.user.user.uid+'/codes').once("value").then((snap) => {
        if(snap.val() != null){
          var newCodes = [];
          for(let code in snap.val()){
            newCodes.push(snap.val()[code]);
          }
          this.setState({
            yourcodes: newCodes
          })
        }else{
          console.log("snap is null");}
      })
    }
  }

  handleUserInput(e){
        this.setState({
            sharedID: e.target.value
        })
    }

  joinSchedule(e){
    
  }

  render() {
    let codes=[];
    for (let i in this.state.yourcodes){
      codes.push(
        <li style={{marginBottom:"20px"}} key={i}><code>{this.state.yourcodes[i]}</code></li>
      )
    };
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
                      className="codeInput"
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
              <div className="yourcodes">
               <div style={{marginBottom:"5px"}}>recent codes:</div>
                <ul>
                  {codes}
                </ul>
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