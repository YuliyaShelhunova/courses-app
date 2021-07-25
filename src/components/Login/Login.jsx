import "./Login.css";
import React, { useState } from "react";
import Button from "../Button/Button";
import { UserService } from "../../services/user.service";
import PropTypes from 'prop-types';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            UserService.loginUser(data)
                .then((data) => {
                    props.history.push("/");
                })
                .catch((error) => alert(error));
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
    password: PropTypes.string
}

export default Login;
