import "./Header.css";
import React from "react";
import Logo from "../Logo/Logo";
import User from "../User/User";

const Header = () => {
    return (
        <header className="header">
            <Logo />
            <User />
        </header>
    );
};

export default Header;
