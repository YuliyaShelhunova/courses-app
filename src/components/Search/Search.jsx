import './Search.css';
import React from "react";
import Button from "../Button/Button";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const searchTerm = e.target.value;
        this.setState({ searchTerm: searchTerm });
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSearchCourses(this.state.searchTerm);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="search-form">
                <input className="search-input" type="text" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Enter course name for searching..." />
                <Button name="Search" class="search-button" />
            </form>
        )
    }
}

export default Search;
