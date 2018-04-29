import React from 'react';
import { Route } from 'react-router-dom';

const FormButton = (props) =>{
    const {submitLabel, otherLabel, goToLink} = props;
    return(
        <div className="d-flex justify-content-between">
            <button
            className="btn btn-primary"
            type="submit"
            >
                {submitLabel}
            </button>
            <Route render={({history}) => (
                <button
                className="btn btn-info"
                type="button"
                onClick={() => {history.push(goToLink)}}
                >
                    {otherLabel}
                </button>
            )} />
        </div>
    )
};

export default FormButton;