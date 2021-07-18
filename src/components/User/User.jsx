import React from "react";
import { UserService } from "../../services/user.service";
import './User.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: {} };
    }

    componentDidMount() {
        const user = UserService.getUser();

        this.setState({
            user: user
        });
    }

    render() {
        return (
            <div className="user">
                { this.state.user.firstName }
            </div>
        );
    }
}
