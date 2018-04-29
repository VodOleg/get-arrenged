import React, { Component } from 'react';
import PostCard from './SimpleBox';
import InputField from './InputField';
import FormButton from './FormButton';
import Nav from './../nav-bar/Nav';
import {createAccount} from './../userLobby/UserActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUser} from './../userLobby/UserActions';

class CreateAccount extends Component{

    componentWillMount(){
        this.props.getUser();
      }

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            confirmPassword : ''
        }
    }

    submitAccount(event){
        event.preventDefault();
        this.props.createAccount(this.state.email, this.state.password)
        .then(() => {this.props.history.replace('/App');})
        .catch(err =>{console.log(err)})
        
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
export default connect (null, {createAccount, getUser})(CreateAccount);