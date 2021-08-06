import "./Login.css";
import React, { useState, useContext } from "react";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { connect, ReactReduxContext } from "react-redux";
import * as thunk from "../../store/user/thunk";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            const data = { email: email, password: password };
            store.dispatch(thunk.login(data));
        }
    };

    return (
        <header className="login">
            <div className="login-block">
                <h1 className="header-title">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="login-form">
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

                        <Button name="Login" class="button-center" />
                    </div>
                </form>
                <div className="registration-link">
                    If you not have an account you can{" "}
                    <span>
                        <a href="/registration">Registration</a>
                    </span>
                </div>
            </div>
        </header>
    );
};

Login.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
};

const mapStateToProps = (state, props) => {
    if (state.user.redirectTo) {
        props.history.push(state.user.redirectTo);
        state.user.redirectTo = undefined;
    }
    return {
        isAuth: state.user.isAuth,
    };
};

export default connect(mapStateToProps)(Login);
