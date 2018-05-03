import React, { Component } from 'react';
import './Login.css';

export default class SimpleBox extends Component{
    render() {
        const { title, body, footer} = this.props;
        return(
            <div className="container page" style={{"minWidth":"70%"}}>
            <div className="warning">This is an early POC version</div>
                <div className="d-flex justify-content-center align-self-center">
                    <div className="card col-sm-6" style={{"marginTop":"15%"}}>
                        <div className="card-block" >
                            <div className="card-title text-center">
                                {title}
                            </div>
                            <div className="card-body">
                                {body}
                            </div>
                            {this.props.footer && <div className="card-footer"> 
                                {footer}
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}