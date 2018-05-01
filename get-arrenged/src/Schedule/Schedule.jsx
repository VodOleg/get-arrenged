import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';
import LoadingSpinner from '../userLobby/LoadingSpinner';
import {Menu, Dropdown} from 'antd';
//import {this.state.members} from './this.state.members.js';
import './Schedule.css';
import {database} from './../Firebase';


class Schedule extends Component {
    constructor(props){
        super(props);
        this.database=database;
        this.datab=database;
        this.state={
            cells : [" "," "," "," ",
            " "," "," "," ",
            " "," "," "," ",
            " "," "," "," ",
            " "," "," "," "," "],
            loading: true,
            owner: true,
            counter: 0,
            members : {}
        };
    }


    componentWillReceiveProps(prop){
        this.setState({
            counter: this.state.counter +1
        });
        var members = {};
        if(this.state.counter===1){
            this.database = database.ref().child('/users/'+ prop.ownerID +'/members');
            this.database.once("value").then((snap)=>{
                    for (let worker in snap.val()){
                        members[snap.val()[worker].nickname]=snap.val()[worker].cells.slice();
                    }
                        this.setState({
                            members : members,
                            loading: false,
                            owner: prop.ownerID===this.props.user.user.uid
                        });
                        this.datab = database.ref().child('/users/'+prop.ownerID+'/members')
                        .once("value").then((snap)=>{
                            if (snap.val()){
                                this.setState({
                                    cells: snap.val()["newCells"].slice(),
                                    loading: false
                                });
                            } else {
                                let newOwner ={};
                                newOwner[prop.ownerID] = {"schedule": [" "," "," "," ",
                                " "," "," "," ",
                                " "," "," "," ",
                                " "," "," "," ",
                                " "," "," "," "," "]};
                                this.datab = database.ref().child('/users'+prop.ownerID+"/members").update({
                                    newOwner
                                });
                            }
                            })
                    }).catch((err)=>{
                        console.log(err);
                    });
        }
    }

    extractNick(email){
        let kj = "";
        let i =0;
        while(email[i] !== '@' && i<email.length){
            i++;
        }
        kj = email.substring(0,i);
        return email.substring(0,i);
    }
    

    componentWillMount(){
        this.props.getUser();
    }

    //function to render Day names
    renderDays(cols){
        var days = [];
        let unique = 100;
        for (let i =0 ; i<cols ; i++){
             unique += i;
             days.push(<span className={"colHead"} key={unique}> {this.props.cols[i]} </span>);
            
        }
        return days;
    }

    workerIsAvailble(worker, day){
        if(this.state.members[worker]===undefined) {return true;}
        if(day===0) {return this.state.members[worker][day]};
        
        let previousShift = ((day-7)>=0) ? (day-7) : (day+13);
        let isAvailable =  (!(this.state.members[worker][day]) && (this.state.cells[previousShift] !== this.extractNick(worker)));
        console.log("worker is : "+worker+" checking for day "+day+"returning "+ !isAvailable);
        return isAvailable;
    }

    renderUsers(id){
       // style={{ color: (!this.workerIsAvailble(worker,id)) ? 'red' : ' black'}}
        var retMembers = [];
        for (let worker in this.state.members){
            retMembers.push(
                <Menu.Item key={worker}>
                      {
                          <a className={!this.workerIsAvailble(worker,id) ? 'notAvailble' : null}   onClick={() => this.changeState(id, worker)}>{this.extractNick(worker)}</a>
                      }
                        
                      
                </Menu.Item>
            )
        }
        retMembers.push(
            <Menu.Item key={id*id}>
                    {
                        <a onClick={() => this.changeState(id, " ")}>No one</a>
                    }
            </Menu.Item>
        );
        return retMembers;
    }


    changeState(id, worker){
        let newCells = this.state.cells.slice();
        newCells[id]= this.extractNick(worker);
        this.setState({
            cells: newCells
        });
        this.datab=database.ref().child('/users/'+this.props.ownerID+'/schedule').update({newCells});

    };

    //function to render a single Row of cells
    renderRow(cols,line){
        var row = [];
        let unique = 0;
        let classes = "ant-dropdown-link btn btn-sm schCell";
       // 
        for (let i=0; i<cols;i++){
            unique = (line*cols + i);
            let menu=(
                <Menu>
                    {this.renderUsers(unique)}
                </Menu>
            );
            row.push(
                <Dropdown overlay={menu} key={unique}>
                    <button className={this.workerIsAvailble(this.state.cells[unique], unique) ? classes : classes+" notAvailble"} style={{margin:"1px", minWidth:"100px", minHeight:"32px"}}>
                        {this.extractNick(this.state.cells[unique])}
                    </button>
                </Dropdown>
            );
        }
        row.push(<span className="rowHead" key={ unique+unique}> {this.props.rows[line]} </span>);
        return row;
    }
    // function to render number of Rows
    renderRows(cols,lines){
        var rows = [];
        for (let i =0; i<lines; i++){
             rows.push(<div className = "ScheduleRow" key = {i*cols }>{this.renderRow(cols,i)}</div>);
        }
        return rows;
    }
    //function to render the whole Schedule
    renderSchedule(cols, rows){
        var Schedule = [];
        Schedule.push(
                <div key = {cols%rows}>
                    {this.renderDays(cols)}
                </div>
        );
        Schedule.push(this.renderRows(cols, rows));
        return Schedule;

    }

    render() {
      return (
          
        <div className={"Schedule"}> 
            <button onClick={() => {console.log(this.state.cells)}}> test </button>
            {this.state.loading ? (
                <div className="loading">
                    <LoadingSpinner />
                </div>
                ) :

             this.renderSchedule(this.props.cols.length,this.props.rows.length)}
             
        </div>
      );
    }
  }

Schedule.propTypes = {
    user: PropTypes.object
}

const mapStateToProps = state => ({
    user: state.user
});  
  
export default connect(mapStateToProps, {getUser})(Schedule);