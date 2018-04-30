import React, { Component } from 'react';
import PostCard from './SimpleBox';
import Nav from './../nav-bar/Nav';
import InputField from './InputField';
import FormButton from './FormButton';
import {login, getUser} from './../userLobby/UserActions';
import {connect} from 'react-redux';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
           email: '',
           password: '' 
        }
    }

    componentWillMount(){
        this.props.getUser();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.email !== undefined){
            this.props.history.push('/');
        }
    }

    submitLogin(event){
        event.preventDefault();
        this.props.login(this.state.email, this.state.password)
        .then(() => {this.props.history.replace('/App')})
        .catch((err) =>{
            if (err.code)
                alert(err.code);
            });
    }

    renderBody(){
        return(
            <form
            onSubmit={event => {this.submitLogin(event);}}>
                    <div>
                        <InputField id="email" type="text" label="Email" inputAction={(event) => this.setState({email: event.target.value})} />
                        <InputField id="password" type="password" label="Password" inputAction={(event) => this.setState({password: event.target.value})} />
                        <FormButton submitLabel="Sign In" otherLabel="Create Account" goToLink="/CreateAccount" {...this.props}/>
                    </div>
            </form>
        )
    }

    render() {
        return (
            <div>
                <Nav />
                <PostCard title={"Sign in"} body={this.renderBody()} />
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {user : state.user}
}

export default connect(mapStateToProps, {login, getUser})(Login);