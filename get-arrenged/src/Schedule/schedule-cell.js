import React, { Component } from 'react';
import './Schedule.css';

class ScheduleCell extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        workers : []
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
        let className = "ScheduleCell";
        if (this.state.isToggleOn) className += ' active';
      return (
        <span className={className} onClick={() => this.handleClick(this.props.cellId)}>
            
        </span>
      );
    }
  }

  
export default ScheduleCell;