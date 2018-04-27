import React, { Component } from 'react';
import './Table.css';
import './TableCell.js';
import TableCell from './TableCell.js';
import './Table.css';


class Table extends Component {
    
    render() {
        let className = "table";
      return (
        <div className={className}> 
            <div>
               <span className={"colHead"}> {this.props.cols[0]} </span> 
               <span className={"colHead"}> {this.props.cols[1]} </span> 
               <span className={"colHead"}> {this.props.cols[2]} </span> 
               <span className={"colHead"}> {this.props.cols[3]} </span> 
               <span className={"colHead"}> {this.props.cols[4]} </span> 
               <span className={"colHead"}> {this.props.cols[5]} </span> 
               <span className={"colHead"}> {this.props.cols[6]} </span> 
            </div>
            <div className = "TableRow">
                <TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><span className="rowHead"> {this.props.rows[0]} </span>
            </div>
            <div className = "TableRow">
                <TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><span className="rowHead"> {this.props.rows[1]} </span>
            </div>
            <div className = "TableRow">
                <TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><span className="rowHead"> {this.props.rows[2]} </span>
            </div>
        </div>
      );
    }
  }

  
export default Table;