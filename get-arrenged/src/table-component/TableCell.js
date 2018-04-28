import React, { Component } from 'react';
import './Table.css';

class TableCell extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        isToggleOn: this.props.isToggleOn
      };
      
      // This binding is necessary to make `this` work in the callback
      this.handleClick = this.handleClick.bind(this);
    }
  
    componentDidMount(){
      this.props.onRef(this);
    }

    handleClick(e) {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));

      this.props.handleCell(e);
    }

    method(cells){
      this.setState({
        isToggleOn : this.props.isToggleOn
      })
    }
    
  
    render(props) {
        let className = "tableCell";
        if (this.state.isToggleOn) className += ' active';
      return (
        <span className={className} onClick={() => this.handleClick(this.props.cellId)}>
            
        </span>
      );
    }
  }

  
export default TableCell;