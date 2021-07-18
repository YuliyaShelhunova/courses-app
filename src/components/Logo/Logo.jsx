import React from "react";
import './Logo.css';

export default class Logo extends React.Component {
    render() {
        return (
        <div className="logo">
            <img src="https://www.marlenebumgarner.com/wp-content/uploads/2018/05/courses_04.png" 
            alt="Courses" width="200" height="100"></img>
        </div>
        );
    }
}
