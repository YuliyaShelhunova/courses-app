import "./Registration.css";
import React, { useState, useContext } from "react";
import Button from "../Button/Button";
import PropTypes from 'prop-types';
import { connect, ReactReduxContext } from 'react-redux';
import * as thunk from '../../store/user/thunk';

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const { store } = useContext(ReactReduxContext);

    const onEmailChange = (e) => {
        e.preventDefault();
        const email = e.target.value;
        setEmail(email);
    };

    const onPasswordChange = (e) => {
        e.preventDefault();
        const password = e.target.value;
        setPassword(password);
    };

    const onNameChange = (e) => {
        e.preventDefault();
        const name = e.target.value;
        setName(name);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name: name, email: email, password: password };
        store.dispatch(thunk.register(data));
    };

    return (
        <header className="registration">
            <div className="registration-block">
                <h1 className="header-title">Registration</h1>
                <form onSubmit={handleSubmit}>
                    <div className="registration-form">
                        <div className="input-block">
                            Name
              <input
                                type="text"
                                value={name}
                                onChange={onNameChange}
                                placeholder="Enter name..."
                            />
                        </div>
                        <div className="input-block">
                            Email
              <input
                                type="text"
                                value={email}
                                onChange={onEmailChange}
                                placeholder="Enter email..."
                            />
                        </div>
                        <div className="input-block">
                            Password
              <input
                                type="text"
                                value={password}
                                onChange={onPasswordChange}
                                placeholder="Enter password..."
                            />
                        </div>

                        <Button name="Registration" class="button-center" />
                    </div>
                </form>
                <div className="registration-link">
                    If you not have an account you can{" "}
                    <span>
                        <a href="/login">Login</a>
                    </span>
                </div>
            </div>
        </header>
    );
};

Registration.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
}

const mapStateToProps = (state, props) => {
    if (state.user.redirectTo) {
        props.history.push(state.user.redirectTo);
        state.user.redirectTo = undefined;
    }
    return {
        isAuth: state.user.isAuth
    };
}

export default connect(mapStateToProps)(Registration);
