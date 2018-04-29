import React, { Component } from 'react';
import {BrowserRouter, Route ,Switch} from 'react-router-dom';
import Home from './Home.js';
import App from './App.js';
import Login from './Login/Login';
import CreateAccount from './Login/CreateAccount.js';


class Routs extends Component{

    render(){
        return (
            <BrowserRouter forceRefresh={false}>
                <Switch>
                    <Route path={'/CreateAccount'} exact component={CreateAccount} />
                    <Route path={"/Login"} exact component={Login} />
                    <Route path={"/App"} exact component={App} />
                    <Route path={"/"} exact component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}
export default Routs;