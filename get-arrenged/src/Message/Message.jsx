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


    render(props){
        return(
            <div className="message fade-in">
                <span className="closebtn"
                      onClick ={()=> this.handleRemoveMessage(this.messageId)}>
                      &times;
                </span>
                <p className="messageContent">{ this.messageContent }</p>
            </div>
        )
    }
}

Message.propTypes={
    messageContent: PropTypes.string
}

export default Message;