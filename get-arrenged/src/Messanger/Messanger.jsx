import React, { Component } from 'react';
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';
import './Messanger.css';

class Messanger extends Component {
    constructor(props){
        super(props);
        this.addMessage = this.addMessage.bind(this);
        this.removeMessage = this.removeMessage.bind(this);

        this.database = this.props.database.ref().child('messages');
        //we are going to setup reac state of our component
        this.state={
          messages:[]
        }
    
      }
    
      componentWillMount(){
        const previousMessages = this.state.messages;
    
        // DataSnapshot
        this.database.on('child_added', snap => {
          previousMessages.push({
            id: snap.key,
            messageContent: snap.val().messageContent,
          })
    
          this.setState({
            messages: previousMessages
          })
        })
    
        this.database.on('child_removed', snap => {
          for(var i=0; i < previousMessages.length; i++){
            if(previousMessages[i].id === snap.key){
              previousMessages.splice(i,1);
            }
          }
    
          this.setState({
            messages: previousMessages
          })
        })
      }
    
      addMessage(message){
        this.database.push().set({
          messageContent: message
        });
      }
    
      removeMessage(messageId){
        this.database.child(messageId).remove();
      }
    
      render() {
        return (
          <div>
            
            <div className="messagesWrapper">
    
                <div className="messagesHeader">
                  <div className="heading">Message box</div>
                </div>
    
                <div className="messagesBody">
                  {
                    this.state.messages.map((message)=> {
                      return(
                        <Message 
                        messageContent={message.messageContent} 
                        messageId={message.id} 
                        key={message.id} 
                        removeMessage = {this.removeMessage} 
                        />
                      )
                    })
                  }
                </div>
    
                <div className="messagesFooter">
                  <MessageForm addMessage={this.addMessage}/>
                </div>
            </div>
    
    
    
          </div>
        );
        
      }
}

export default Messanger;