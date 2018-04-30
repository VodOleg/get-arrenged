import React, { Component } from 'react';
import './Message.css';
import PropTypes from 'prop-types';

class Message extends Component{

    constructor(props){
        super(props);
        this.messageContent = props.messageContent;
        this.messageId = props.messageId;
        this.handleRemoveMessage = this.handleRemoveMessage.bind(this);
    }

    handleRemoveMessage(id){
        this.props.removeMessage(id);
    }

    extractNick(email){
        let i =0;
        while(email[i] !== '@'){
            i++;
        }
        return email.substring(0,i);
    }

    render(props){
        return(
            <div className="message fade-in">
                <span className="closebtn"
                      onClick ={()=> this.handleRemoveMessage(this.messageId)}>
                      &times;
                </span>
                <div className="col col-sm-3 userNick">
                   {this.extractNick(this.props.messageUser)} :

                </div>
                  <div className="col col-sm-9 messageContent">
                { this.messageContent }

                </div>
                
            </div>
        )
    }
}

Message.propTypes={
    messageContent: PropTypes.string
}

export default Message;