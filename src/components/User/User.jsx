import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Button from "../Button/Button";
import "./User.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect, ReactReduxContext } from "react-redux";
import * as thunk from "../../store/user/thunk";

const User = ({ user }) => {
    const [isAuthUrl, checkUrl] = useState(false);
    const location = useLocation();
    const { store } = useContext(ReactReduxContext);

    useEffect(() => {
        checkUrl(
            location.pathname === "/login" || location.pathname === "/registration"
        );
    }, [location]);

    useEffect(() => {
        store.dispatch(thunk.getCurrentUser());
    }, [store]);

    function onLogout(e) {
        e.preventDefault();
        store.dispatch(thunk.logout(true));
    }

    return (
        <div className="user">
            {!isAuthUrl && (
                <div>
                    {user.isAuth ? (
                        <div className="user-block">
                            <span>{user.name}</span>
                            <Link onClick={onLogout} to="/login" className="decoration">
                                <Button name="Logout" class="main-button" path="/login" />
                            </Link>
                        </div>
                    ) : (
                            <Button name="Login" class="main-button" path="/login" />
                        )}
                </div>
            )}
        </div>
    );
};

User.propTypes = {
    user: PropTypes.object,
    isAuthUrl: PropTypes.bool,
    location: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(User);
