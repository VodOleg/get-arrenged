import React from 'react';

function isVowel(char){
    return /^[aeiou]$/.test(char.toLowerCase());
}

const InputField = (props) => {
    return(
        <div className="form-group row">
            <div className="col-sm-10">
            <label htmlFor={props.id} className="col-sm-6 col-form-label">
                {props.label}
            </label>
                <input
                 type={props.type}
                 onChange={props.inputAction}
                 id={props.id}
                 className="form-control"
                 placeholder={`Please enter ${isVowel(props.label[0]) ? "an" : "a" } ${props.label}`}
                 />
            </div>
        </div>

    )
};

export default InputField;