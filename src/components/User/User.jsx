import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { UserService } from "../../services/user.service";
import Button from "../Button/Button";
import "./User.css";
import { Link } from "react-router-dom";
import PropTypes, { func } from "prop-types";

const User = (props) => {
    const [user, setUser] = useState({});
    const [isAuthUrl, checkUrl] = useState(false);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        checkUrl(
            location.pathname === "/login" || location.pathname === "/registration"
        );
    }, [location]);

    useEffect(() => {
        async function fetchData() {
            const user = await UserService.getCurrentUser();
            setUser(user);
        }
        fetchData();
    },[])

    function onLogout(e) {
        e.preventDefault();
        UserService.removeToken();
    }

    return (
        <div className="user">
            {!isAuthUrl && (
                <div>
                    {user ? (
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

export default User;
