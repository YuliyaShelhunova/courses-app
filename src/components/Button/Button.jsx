import React from "react";
import "./Button.css";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

const Button = (props) => {
    const history = useHistory();
    return (
        <div className={props.class}>
            <button onClick={() => history.push(props.path)}>
                {props.name}
            </button>
        </div>
    );
};

Button.propTypes = {
    class: PropTypes.string,
    path: PropTypes.string
}

export default Button;
