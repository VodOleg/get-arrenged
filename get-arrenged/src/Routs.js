import React, { Component } from 'react';
import {BrowserRouter, Route ,Switch} from 'react-router-dom';
import Home from './Home.js';
import App from './App.js';

class Routs extends Component{

    render(){
        return (
            <BrowserRouter forceRefresh={true}>
                <Switch>
                    <Route path={"/"} exact component={Home} />
                    <Route path={"/App"} exact component={App} />
                </Switch>
            </BrowserRouter>
        )
    }
}
export default Routs;