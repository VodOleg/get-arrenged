import React, { Component } from 'react';
import './MessageForm.css';

class MessageForm extends Component{

    constructor(props){
        super(props);
        this.state={
            newMessageContent : ""
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeMessage = this.writeMessage.bind(this);
    }

    //when changing the user input actualy save it to the variable 
    handleUserInput(e){
        this.setState({
            newMessageContent: e.target.value
        })
    }

    writeMessage(e){
        //call a method that sets the message content for a message to the value of the input
        this.props.addMessage(this.state.newMessageContent);
        this.setState({
            newMessageContent:""
        })
    }

    render(){
        return(
            <div className="formWrapper">
                <input type="text"
                 className="messageInput"
                 placeholder="Write a message..."
                 value= {this.state.newMessageContent}
                 onChange={this.handleUserInput}
                 />
                 <button
                  type="button"
                  className="messageButton"
                  onClick={this.writeMessage}
                  onSubmit={this.ttt}
                  >Send
                  </button>
            </div>
        )
    }
}

export default MessageForm;