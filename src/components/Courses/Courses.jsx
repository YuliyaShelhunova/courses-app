import './Courses.css';
import React from "react";
import Search from "../Search/Search";
import CourseCard from "../CourseCard/CourseCard";
import { CoursesService } from "../../services/courses.service";
import Button from "../Button/Button";


export default class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = { courses: [], filteredData: [] };
        this.onSearchCourses = this.onSearchCourses.bind(this);
    }

    componentDidMount() {
        const courses = CoursesService.getAllCourses();
        this.setState({
            courses: courses
        });
    }

    onSearchCourses(searchTerm) {
        const results = this.state.courses.filter(course =>
            course.id.toLowerCase().includes(searchTerm.toLowerCase()) || course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (results.length){
            this.setState({ 
                filteredData: results 
            })
        }
    }

    render() {
        return (
            <div className="search-new-course-panel">
                <Search courses={this.state.courses} onSearchCourses={this.onSearchCourses} />
                <Button name="Add new course" class="main-button new-course" path="/newCourse" />
                <div>
                    {this.state.filteredData.length ? this.state.filteredData.map(course => <CourseCard key={course.id} course={course}/>)
                                       : this.state.courses.map(course => <CourseCard key={course.id} course={course}/>)}
                </div>
            </div>
        )
    }
}
