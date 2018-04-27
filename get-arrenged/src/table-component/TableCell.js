import React, { Component } from 'react';
import './Table.css';

class TableCell extends Component {
    constructor(props) {
      super(props);
      this.state = {isToggleOn: false};
  
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

    
  
    render() {
        let className = "tableCell";
        if (this.state.isToggleOn) className += ' active';
      return (
        <span className={className} onClick={this.handleClick}>
            
        </span>
      );
    }
  }

  
export default TableCell;