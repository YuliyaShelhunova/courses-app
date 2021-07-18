import './Header.css';
import React from "react";
import Logo from "../Logo/Logo";
import Button from "../Button/Button"
import User from "../User/User"

export default class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <Logo />
                <User />
                <Button name="Logout" class="main-button" />
            </header>
        );
    }
}
