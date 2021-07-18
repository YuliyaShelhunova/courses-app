import './CreateCourse.css';
import React from "react";
import Button from "../Button/Button";
import { AuthorsService } from "../../services/authors.service";
import { CoursesService } from "../../services/courses.service";

export default class CreateCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newCourse: {
                id: "",
                title: "",
                description: "",
                creationDate: "",
                duration: 0,
                authors: []
            }, authors: [], authorName: "", selectedAuthors: []
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onDurationChange = this.onDurationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onCreateAuthor = this.onCreateAuthor.bind(this);
        this.onAddAuthor = this.onAddAuthor.bind(this);
        this.onDeleteAuthor = this.onDeleteAuthor.bind(this);
    }

    componentDidMount() {
        this.setState({
            authors: AuthorsService.getAllAuthors()
        });
    }
    timeFormatter(time) {
        return time ? `${Math.floor(time / 60)}:${time % 60} hours` : "00:00 hours";
    }

    onCreateAuthor(e) {
        e.preventDefault();
        if (this.state?.authorName.length > 2) {
            const updatedListOfAuthors = AuthorsService.addAuthorToList({
                id: Math.random().toString(36).substring(3),
                name: this.state.authorName
            });
            this.setState({
                authors: updatedListOfAuthors,
                authorName: ""
            });
        }
    }

    onAddAuthor(e) {
        e.preventDefault();
        const authorId = e.target.name;
        const author = this.state.authors.find(item => item.id === authorId);
        if (!this.state.selectedAuthors.find(item => item.id === author.id)) {
            this.state.authors.splice(this.state.authors.findIndex(item => item.id === authorId), 1)
            this.setState({
                selectedAuthors: this.state.selectedAuthors.concat(author),
            })
        }
    }

    onDeleteAuthor(e) {
        e.preventDefault();
        const authorId = e.target.name;
        const author = this.state.selectedAuthors.find(item => item.id === authorId);
        this.state.selectedAuthors.splice(this.state.selectedAuthors.findIndex(item => item.id === authorId), 1)
        this.setState({
            authors: this.state.authors.concat(author),
        })
    }

    onNameChange(e) {
        e.preventDefault();
        const name = e.target.value;
        this.setState({
            authorName: name
        })
    }

    onTitleChange(e) {
        e.preventDefault();
        const title = e.target.value;
        this.setState({ newCourse: { ...this.state.newCourse, title: title } });
    }

    onDescriptionChange(e) {
        e.preventDefault();
        const description = e.target.value;
        this.setState({ newCourse: { ...this.state.newCourse, description: description } });
    }

    onDurationChange(e) {
        e.preventDefault();
        const duration = e.target.value;
        this.setState({ newCourse: { ...this.state.newCourse, duration: duration } });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newCourse.title && this.state.newCourse?.description.length > 2 && this.state.newCourse.duration && this.state.selectedAuthors) {
            CoursesService.addCourseToList({
                id: Math.random().toString(36).substring(10),
                title: this.state.newCourse.title,
                description: this.state.newCourse.description,
                creationDate: this.generateCurrentDate(),
                duration: this.state.newCourse.duration,
                authors: this.state.selectedAuthors
            });

            this.props.history.push('/');
        } else {
            alert("Please, fill in all fields");
        }

    }

    generateCurrentDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        return dd + '/' + mm + '/' + yyyy;
    }

    render() {
        return (
            <div className="new-course-block">
                <form onSubmit={this.handleSubmit}>
                    <div className="main-title-block">

                        <div className="main-block">
                            <div className="left-side">
                                <h4>Title</h4>
                                <input type="text" placeholder="Enter title..." onChange={this.onTitleChange} value={this.state.newCourse.title} />
                            </div>

                            <div className="right-side">
                                <Button name="Create course" class="main-button" type="submit" />
                            </div>
                        </div>
                        <div className="description-block">
                            <h4>Description</h4>
                            <textarea height="100px" placeholder="Enter description..." onChange={this.onDescriptionChange}
                                value={this.state.newCourse.description} ></textarea>
                        </div>
                    </div>
                </form>

                <div className="author-block">
                    <div className="row-blocks">
                        <div className="left-block">
                            <form onSubmit={this.onCreateAuthor}>
                                <div className="title-for-creation">Add author</div>
                                <div>Author name</div>
                                <input type="text" className="input" placeholder="Enter author name..."
                                    value={this.state.authorName} onChange={this.onNameChange} />
                                <Button name="Create author" class="create-author" type="submit" />
                            </form>
                        </div>
                        <div className="right-block">
                            <div className="title-for-creation">Authors</div>
                            {this.state?.authors.map(author =>
                                <form key={author.id} name={author.id} onSubmit={this.onAddAuthor}>
                                    <div className="author-existing-block" key={author.id}>
                                        <span key={author.name} className="author-name">{author.name}</span>
                                        <Button key={author.id} name="Add author" type="submit" />
                                    </div>
                                </form>)}
                        </div>
                    </div>
                    <div className="row-blocks">
                        <div className="left-block">
                            <div className="title-for-creation">Duration</div>
                            <div>Duration</div>
                            <input type="number" min="0" className="input" placeholder="Enter duration in minutes..."
                                value={this.state.newCourse.duration} onChange={this.onDurationChange} />
                            <span className="duration">Duration: {this.timeFormatter(this.state?.newCourse?.duration)}</span>
                        </div>
                        <div className="right-block">
                            <div className="title-for-creation">Course authors</div>
                            <div>
                                {
                                    !this.state.selectedAuthors.length ? <span>Author list is empty</span>
                                        : this.state.selectedAuthors.map(author =>
                                            <form key={author.id} name={author.id} onSubmit={this.onDeleteAuthor}>
                                                <div className="author-existing-block" key={author.id}>
                                                    <span key={author.name} className="author-name">{author.name}</span>
                                                    <Button key={author.id} name="Delete author" type="submit" />
                                                </div>
                                            </form>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
