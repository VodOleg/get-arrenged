import React, { Component } from 'react';
import './Table.css';
import './TableCell.js';
import TableCell from './TableCell.js';
import './Table.css';


class Table extends Component {
    
    

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
    //function to render a single Row of cells
    renderRow(cols,line){
        var row = [];
        let unique = 0;
        for (let i=0; i<cols;i++){
            unique = (line*cols + i);
            row.push(<TableCell key={unique} />);
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
            {this.renderTable(this.props.cols.length,this.props.rows.length)}
        </div>
      );
    }
  }

  
export default Table;