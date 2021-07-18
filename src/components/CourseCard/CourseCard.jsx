import './CourseCard.css';
import React from "react";
import Button from "../Button/Button"

export default class CourseCard extends React.Component {

    dateFormatter(date) {
        return date.replaceAll('/', '.');
    }

    timeFormatter(time) {
        return `${Math.floor(time / 60)}:${time % 60} hours`;
    }

    render() {
        return (
            <div className="course-block">
                <div className="left">
                    <h1>{this.props.course.title} </h1>
                    <div className="description">{this.props.course.description} </div>
                </div>
                <div className="right">
                    <div>
                        <div className="title">Authors: </div> 
                        <span className="authors-line">
                        { this.props.course.authors.map(author => <span key={author.id}> {author.name} </span>)}
                        </span>
                    </div>
                    <div>
                        <div className="title">Created: </div>
                        { this.dateFormatter(this.props.course.creationDate) }
                    </div>
                    <div>
                        <div className="title">Duration: </div>
                        { this.timeFormatter(this.props.course.duration) }
                    </div>
                    <div>
                        <Button type="submit" name="Show course"/>
                    </div>
                </div>
            </div>
        );
    }
}
