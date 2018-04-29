import React, { Component } from 'react';
import PostCard from './SimpleBox';
import InputField from './InputField';
import FormButton from './FormButton';
import Nav from './../nav-bar/Nav';

export default class CreateAccount extends Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            confirmPassword : ''
        }
    }

    renderBody(){
        return(
        <div>
            <InputField id="email" type="text" label="Email" inputAction={(event) => this.setState({email: event.target.value})} />
            <InputField id="password" type="password" label="Password" inputAction={(event) => this.setState({password: event.target.value})} />
            <InputField id="confirm-password" type="password" label="Confirm Password" inputAction={(event) => this.setState({confirmPassword: event.target.value})} />

            <FormButton submitLabel="Create Account" otherLabel="Go Back" goToLink="/Login" {...this.props}/>
        </div>)
    }


    render() {
        return(
            <div>
                <Nav />
                <PostCard body={this.renderBody()} title="Create Account" />
            </div>
        )
    }
}