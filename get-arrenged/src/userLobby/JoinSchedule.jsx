import React, { Component } from 'react';
import Nav from './../nav-bar/Nav';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser} from './../userLobby/UserActions';
import Schedule from './../Schedule/Schedule';
import Messanger from './../Messanger/Messanger';
import Table from '../table-component/Table';
import {database} from './../Firebase';

class JoinSchedule extends Component {

    constructor(props){
        super(props);
        this.state={
            loading: true,
            scheduleOwner: false,
            ownerID: '',
            myID: '',
            counter: 0
        }
        this.database = database;
    }

    
    componentWillReceiveProps(newProps){
        if(!newProps.user.user){this.props.history.replace('/Login'); return;}
        this.setState({
            ownerID: this.props.location.state.sharedID,
            myID: newProps.user.user.uid,
            counter : this.state.counter+1
        });
        if (this.state.counter===1){
            let key = "";
            key= this.state.myID;
            let newUser = { };
            newUser[key]={ 
            };
            this.database = database.ref().child('users/'+this.state.ownerID+'/members');
            this.database
            .once("value").then((snap)=>{
                let flagContains = false;
                for (let user in snap.val()){
                    if(user===key) flagContains=true;
                }
                if (!flagContains){
                    this.database.update(newUser);
                }
            });
        }
    }


  componentWillMount(){
    this.props.getUser();
  }

  render() {
    return (
      <div >
        <Nav />
        <div className="page">
            <div>
                <div className={"scheduleContainer"} >
                    <div>
                        <label>Here you can see the current schedule state</label>
                        <Schedule
                            rows = {[ "morning", "evening", "night"]}
                            cols = {[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}

                        />
                    </div>
                </div>
            </div>
            <div>
                <div className={"tableContainer"} >
                    <div>
                        <label>Here you need to mark the shifts you cant work:</label>
                        <Table 
                            rows = {[ "morning", "evening", "night"]}
                            cols = {[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
                            ownerID = {this.state.ownerID}
                            myID = {this.state.myID}
                        />
                    </div>
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

JoinSchedule.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.user
});  

export default connect(mapStateToProps, {getUser})(JoinSchedule);