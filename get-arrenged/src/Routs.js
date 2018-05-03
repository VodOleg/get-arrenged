import React, { Component } from 'react';
import {BrowserRouter, Route ,Switch} from 'react-router-dom';
import App from './App.js';
import Login from './Login/Login';
import CreateAccount from './Login/CreateAccount.js';
import JoinSchedule from './userLobby/JoinSchedule';
import CreateSchedule from './userLobby/CreateSchedule';


class Routs extends Component{

    render(){
        return (
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Route path={'/JoinSchedule' } exact component={JoinSchedule} />
                    <Route path={'/CreateAccount'} exact component={CreateAccount} />
                    <Route path={'/CreateSchedule'} exact component={CreateSchedule} />
                    <Route path={"/Login"} exact component={Login} />
                    <Route path={"/App"} exact component={App} />
                    <Route path={"/"} exact component={App} />
                </Switch>
            </BrowserRouter>
        )
    }
}
export default Routs;