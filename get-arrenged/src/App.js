import React, { Component } from 'react';
import './App.css';
import Clock from './Clock.js';
import Table from './table-component/Table';
import Message from './Message/Message';
import MessageForm from './MessageForm/MessageForm';
import { DB_CONFIG } from './Config/config';
import Firebase from 'firebase';
import 'firebase/database';

class App extends Component {
  constructor(props){
    super(props);
    this.addMessage = this.addMessage.bind(this);
    this.removeMessage = this.removeMessage.bind(this);

    this.app = Firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('messages');
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
        <Clock />
        <div className="Table">
            <Table 
                      rows = {[ "morning", "evening", "night"]}
                      cols = {[ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}
                      
                      />
        </div>
        
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

export default App;
