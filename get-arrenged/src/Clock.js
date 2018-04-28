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
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd = '0'+dd
      } 

      if(mm<10) {
          mm = '0'+mm
      } 

      today = dd + '/' + mm + '/' + yyyy;
      return(today);
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
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
        <h2>{this.day}</h2>
        <h4>{this.state.date.toLocaleTimeString()}</h4>
      </div>
    );
    
  }
}

export default Clock;
