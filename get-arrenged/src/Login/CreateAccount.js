import React, { Component } from 'react';
import PostCard from './SimpleBox';
import InputField from './InputField';
import FormButton from './FormButton';
import Nav from './../nav-bar/Nav';
import {createAccount} from './../userLobby/UserActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';
import {database} from './../Firebase';

class CreateAccount extends Component{
    
    constructor(props){
        super(props);
        this.database = database;
        this.state = {
            email : '',
            password : '',
            confirmPassword : ''
        }
    }

    componentWillMount(){
        this.props.getUser();
      }

    updateDatabase(){
        var self = this;
        setTimeout(function(){
            let key = "";
            key= self.props.user.user.uid;
            let newUser = { };
            newUser[key]={
                table: '',
                conds: []
            }
           self.database.ref().child('users').update(newUser);
        }, 2000);
        setTimeout(function(){
            self.props.history.replace('/App');
        },2500);
    }

    submitAccount(event){
        event.preventDefault();
        if(this.state.password === this.state.confirmPassword){
            this.props.createAccount(this.state.email, this.state.password)
            .then(()=>{
                //this.props.history.replace('/App');
            })
            .catch((err) =>{
                if (err.code)
                alert(err.code);
            });
            
            this.updateDatabase();
        } else {
            alert("password does not match Confirm password");
        }
    }

    renderBody(){
        return(
        <div>
            <form onSubmit={(event) => this.submitAccount(event)} >
                <InputField id="email" type="text" label="Email" inputAction={(event) => this.setState({email: event.target.value})} />
                <InputField id="password" type="password" label="Password" inputAction={(event) => this.setState({password: event.target.value})} />
                <InputField id="confirm-password" type="password" label="Confirm Password" inputAction={(event) => this.setState({confirmPassword: event.target.value})} />

                <FormButton submitLabel="Create Account" otherLabel="Go Back" goToLink="/Login" {...this.props}/>
            </form>
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


CreateAccount.propTypes = {
    user: PropTypes.object
}

const mapStateToProps = state => ({
    user: state.user
});  
export default connect (mapStateToProps, {createAccount, getUser})(CreateAccount);