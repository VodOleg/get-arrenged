import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import Home from './Home.js';
import App from './App.js';

class Routs extends Component{

    render(){
        return (
            <BrowserRouter>
                <div>
                    <Route path={"/"} exact component={Home} />
                    <Route path={"/App"} exact component={App} />
                </div>
            </BrowserRouter>
        )
    }
}
export default Routs;