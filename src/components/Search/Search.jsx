import "./Search.css";
import React, { useState } from "react";
import Button from "../Button/Button";
import PropTypes from "prop-types";

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSearchCourses(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                className="search-input"
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Enter course name for searching..."
            />
            <Button name="Search" class="search-button" />
        </form>
    );
};

Search.propTypes = {
    searchTerm: PropTypes.string,
};

export default Search;
