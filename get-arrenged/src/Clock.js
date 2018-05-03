import React, { Component } from 'react';



class Clock extends Component {

  constructor(props){
    super(props);
    this.state = {date: new Date()};
    this.day = this.getDate();
  }

  getDate(){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth(); //January is 0!
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      today = dd + ' ' + months[mm];
      return(today);
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000*60
    );
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }


 

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h4>{this.day}</h4>
        <h6>{this.state.date.toLocaleTimeString(new Date(),{hour12:false}).substring(0,5)}</h6>
      </div>
    );
    
  }
}

export default Clock;
