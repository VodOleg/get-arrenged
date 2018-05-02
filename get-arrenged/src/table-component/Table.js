import React, { Component } from 'react';
import './Table.css';
import TableCell from './TableCell.js';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';
import LoadingSpinner from '../userLobby/LoadingSpinner';
import {database} from '../Firebase';
class Table extends Component {
    constructor(props){
        super(props);
        
        this.state={
            cells : [],
            loading: true,
            counter : 0
        };
        this.state.cells = this.initCells(this.props.cols.length, this.props.rows.length);
        this.handleCell = this.handleCell.bind(this);
        this.database = database;
        
       // this.database = database.ref().child('/users/'+ this.props.sharedID +'/members/' + this.props.myID);
    }


    initCells(cols,rows){
        var cellsArray = [];
        for(let i=0; i<rows*cols ; i++){
            cellsArray.push(false);
        }
        return cellsArray;
    }

    componentWillReceiveProps(prop){
        this.setState({
            counter: this.state.counter +1
        });
        if(this.state.counter===1){
            this.database = database.ref().child('/users/'+ prop.ownerID +'/members/' + prop.myID);
            this.database.once("value").then((snap)=>{
                if (snap.val() != null ){
                    this.setState({
                        cells: snap.val().cells.slice(),
                        loading: false
                    });
                    this.updateCells();
                } else {
                    //probably the database havent updated yet, try again in 1sec
                    setTimeout(() => {
                        this.database.once("value").then((snap)=>{
                            if(snap.val() != null){
                                this.setState({
                                    cells:snap.val().cells.slice(),
                                    loading: false
                                })
                            }
                        })
                    }, 1000);
                }
            
            }).catch((err)=>{
                        console.log(err);
                    });
        }
}
    //on component init, bring data from db and update table
    // componentWillMount(){
    //     this.database.once("value").then((snap)=>{
    //         this.setState({
    //             cells: snap.val().cells.slice(),
    //             loading: false
    //         });
    //        this.updateCells();
       
    //     });
    // this.props.getUser();
        
    // }


    //routine that calls table cell method to change state
    updateCells(){
        for(let i = 0; i<this.state.cells.length ; i++){
            this.refs[i].method();
        }
    }

    //single cell state changed, write it to database
    handleCell(key){
        var newCell = this.state.cells;
        newCell[key] = !newCell[key];
        this.database.update({
            cells: newCell
        });
    }

    //function to render Day names
    renderDays(cols){
        var days = [];
        let unique = 100;
        for (let i =0 ; i<cols ; i++){
             unique += i;
             days.push(<span className={"colHeadTable"} key={unique}> {this.props.cols[i]} </span>);
            
        }
        return days;
    }

    //function to render a single Row of cells
    renderRow(cols,line){
        var row = [];
        let unique = 0;
        for (let i=0; i<cols;i++){
            unique = (line*cols + i);
            row.push(<TableCell
                        key={unique}
                        handleCell={this.handleCell}
                        cellId={unique}
                        isToggleOn={this.state.cells[unique]}
                        onRef = { ref => (this.child =ref)}
                        ref = {unique}
                        />);
        }
        row.push(<span className="rowHead" key={ unique+unique}> {this.props.rows[line]} </span>);
        return row;
    }
    // function to render number of Rows
    renderRows(cols,lines){
        var rows = [];
        for (let i =0; i<lines; i++){
             rows.push(<div className = "TableRow" key = {i*cols }>{this.renderRow(cols,i)}</div>);
        }
        return rows;
    }
    //function to render the whole table
    renderTable(cols, rows){
        var table = [];
        table.push(
                <div key = {cols%rows}>
                    {this.renderDays(cols)}
                </div>
        );
        table.push(this.renderRows(cols, rows));
        return table;

    }

    render() {
      return (
          
        <div className={"table"}> 
            {this.state.loading ? (
                <div className="loading">
                    <LoadingSpinner />
                </div>
                ) :
             this.renderTable(this.props.cols.length,this.props.rows.length)}
        </div>
      );
    }
  }

Table.propTypes = {
    user: PropTypes.object
}

const mapStateToProps = state => ({
    user: state.user
});  
  
export default connect(mapStateToProps, {getUser})(Table);