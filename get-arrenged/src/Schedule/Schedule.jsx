import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';
import LoadingSpinner from '../userLobby/LoadingSpinner';
import {Menu, Dropdown} from 'antd';
import {workers} from './workers.js';
import './Schedule.css';



class Schedule extends Component {
    constructor(props){
        super(props);
        
        this.state={
            cells : [" "," "," "," ",
            " "," "," "," ",
            " "," "," "," ",
            " "," "," "," ",
            " "," "," "," "," "],
            loading: false
        };
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
        if(workers[worker]===undefined) {return true;}
        if(day===0) {return workers[worker][day]};

        let previousShift = ((day-7)>=0) ? (day-7) : (day+13);
        let isAvailable =  ((workers[worker][day]) && (this.state.cells[previousShift] !== worker));
        return isAvailable;
    }

    renderUsers(id){
       // style={{ color: (!this.workerIsAvailble(worker,id)) ? 'red' : ' black'}}
        var retWorkers = [];
        for (let worker in workers){
            retWorkers.push(
                <Menu.Item key={worker}>
                      {
                          <a className={!this.workerIsAvailble(worker,id) ? 'notAvailble' : null}   onClick={() => this.changeState(id, worker)}>{worker}</a>
                      }
                        
                      
                </Menu.Item>
            )
        }
        retWorkers.push(
            <Menu.Item key={id*id}>
                    {
                        <a onClick={() => this.changeState(id, " ")}>No one</a>
                    }
            </Menu.Item>
        );
        return retWorkers;
    }
    changeState(id, worker){
        let newCells = this.state.cells.slice();
        newCells[id]= worker;
        this.setState({
            cells: newCells
        })
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
                        {this.state.cells[unique]}
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
            {/* <button onClick={()=>{console.log(this.state.cells)}} >test</button> */}
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