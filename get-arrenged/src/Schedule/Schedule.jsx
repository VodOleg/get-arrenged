import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './Schedule.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';
import LoadingSpinner from '../userLobby/LoadingSpinner';
import {Menu, Dropdown} from 'antd';
import {workers} from './workers.js';



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
        //this.state.cells = this.initCells(this.props.cols.length, this.props.rows.length);
       // this.handleCell = this.handleCell.bind(this);
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

    renderUsers(id){
        var retWorkers = [];
        for (let worker in workers){
            retWorkers.push(
                <Menu.Item key={worker}>
                      {
                          <a style={{ color: (!workers[worker][id]) ? 'red' : ' black'}} onClick={() => this.changeState(id, worker)}>{worker}</a>
                      }
                        
                      
                </Menu.Item>
            )
        }
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
        for (let i=0; i<cols;i++){
            unique = (line*cols + i);
            let menu=(
                <Menu>
                    {this.renderUsers(unique)}
                </Menu>
            );
            row.push(
                <Dropdown overlay={menu} key={unique}>
                    <button className="ant-dropdown-link btn btn-sm" style={{margin:"1px", minWidth:"100px", minHeight:"32px"}}>
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