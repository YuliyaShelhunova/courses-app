import React from "react";
import './Button.css';
import { useHistory } from 'react-router-dom';

export default function Button(props) {
    const history = useHistory();
        return (
            <div className={props.class}> <button onClick={
                () => history.push(props.path)
            }> {props.name} </button> </div>
        );
}
