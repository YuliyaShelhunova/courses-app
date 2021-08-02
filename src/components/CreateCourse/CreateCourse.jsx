import "./CreateCourse.css";
import React, { useState, useEffect, useContext } from "react";
import Button from "../Button/Button";
import { Utils } from "../../Utils/Utils";
import PropTypes from 'prop-types';
import { connect, ReactReduxContext } from 'react-redux';
import * as authorsActions from '../../store/authors/authors.action';
import * as coursesActions from '../../store/courses/courses.action';

const CreateCourse = ({ authors }) => {
    const [newCourse, changedNewCourse] = useState({
        title: "",
        description: "",
        creationDate: "",
        duration: 0,
        authors: [],
    });
    const [authorsList, setAuthors] = useState([]);
    const [authorName, setAuthorName] = useState("");
    const [selectedAuthors, pushSelectedAuthors] = useState([]);
    const { store } = useContext(ReactReduxContext);

    useEffect(() => {
        store.dispatch(authorsActions.getAllAuthors());
    }, [store]);

    useEffect(() => {
        setAuthors(authors);
    }, [authors]);

    const onCreateAuthor = (e) => {
        e.preventDefault();
        if (authorName.length > 2) {
            store.dispatch(authorsActions.addAuthor(authorName));
        }
    };

    const onAddAuthor = (e) => {
        e.preventDefault();
        const authorId = e.target.name;
        const author = authorsList.find((item) => item.id === authorId);
        if (!selectedAuthors.find((item) => item.id === author.id)) {
            authors.splice(
                authorsList.findIndex((item) => item.id === authorId),
                1
            );
            pushSelectedAuthors(selectedAuthors.concat(author));
        }
    };

    const onDeleteAuthor = (e) => {
        e.preventDefault();
        const authorId = e.target.name;
        const author = selectedAuthors.find((item) => item.id === authorId);
        selectedAuthors.splice(
            selectedAuthors.findIndex((item) => item.id === authorId),
            1
        );
        setAuthors(authorsList.concat(author));
    };

    const onNameChange = (e) => {
        e.preventDefault();
        const name = e.target.value;
        setAuthorName(name);
    };

    const onTitleChange = (e) => {
        e.preventDefault();
        changedNewCourse((data) => ({
            ...data,
            title: e.target.value,
        }));
    };

    const onDescriptionChange = (e) => {
        e.preventDefault();
        const description = e.target.value;
        changedNewCourse((data) => ({
            ...data,
            description: description,
        }));
    };

    const onDurationChange = (e) => {
        e.preventDefault();
        const duration = e.target.value;
        changedNewCourse((data) => ({
            ...data,
            duration: +duration
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            newCourse.title &&
            newCourse?.description.length > 2 &&
            newCourse.duration &&
            !!selectedAuthors.length
        ) {
            const course = {
                title: newCourse.title,
                description: newCourse.description,
                creationDate: Utils.generateCurrentDate(),
                duration: newCourse.duration,
                authors: selectedAuthors.map(item => item.id),
            };
            store.dispatch(coursesActions.addCourse(course));
        } else {
            alert("Please, fill in all fields");
        }
    };

    return (
        <div className="new-course-block">
            <form onSubmit={handleSubmit}>
                <div className="main-title-block">
                    <div className="main-block">
                        <div className="left-side">
                            <h4>Title</h4>
                            <input
                                type="text"
                                placeholder="Enter title..."
                                onChange={onTitleChange}
                                value={newCourse.title}
                            />
                        </div>

                        <div className="right-side">
                            <Button name="Create course" class="main-button" type="submit" />
                        </div>
                    </div>
                    <div className="description-block-creating">
                        <h4>Description</h4>
                        <textarea
                            height="100px"
                            placeholder="Enter description..."
                            onChange={onDescriptionChange}
                            value={newCourse.description}
                        ></textarea>
                    </div>
                </div>
            </form>

            <div className="author-block">
                <div className="row-blocks">
                    <div className="left-block">
                        <form onSubmit={onCreateAuthor}>
                            <div className="title-for-creation">Add author</div>
                            <div>Author name</div>
                            <input
                                type="text"
                                className="input"
                                placeholder="Enter author name..."
                                value={authorName}
                                onChange={onNameChange}
                            />
                            <Button
                                name="Create author"
                                class="button-center"
                                type="submit"
                            />
                        </form>
                    </div>
                    <div className="right-block">
                        <div className="title-for-creation">Authors</div>
                        {authorsList.map((author) => (
                            <form key={author.id} name={author.id} onSubmit={onAddAuthor}>
                                <div className="author-existing-block" key={author.id}>
                                    <span key={author.name} className="author-name">
                                        {author.name}
                                    </span>
                                    <Button key={author.id} name="Add author" type="submit" />
                                </div>
                            </form>
                        ))}
                    </div>
                </div>
                <div className="row-blocks">
                    <div className="left-block">
                        <div className="title-for-creation">Duration</div>
                        <div>Duration</div>
                        <input
                            type="number"
                            min="0"
                            className="input"
                            placeholder="Enter duration in minutes..."
                            value={newCourse.duration}
                            onChange={onDurationChange}
                        />
                        <span className="duration">
                            Duration: {Utils.timeFormatter(newCourse?.duration)}
                        </span>
                    </div>
                    <div className="right-block">
                        <div className="title-for-creation">Course authors</div>
                        <div>
                            {!selectedAuthors.length ? (
                                <span>Author list is empty</span>
                            ) : (
                                    selectedAuthors.map((author) => (
                                        <form
                                            key={author.id}
                                            name={author.id}
                                            onSubmit={onDeleteAuthor}
                                        >
                                            <div className="author-existing-block" key={author.id}>
                                                <span key={author.name} className="author-name">
                                                    {author.name}
                                                </span>
                                                <Button
                                                    key={author.id}
                                                    name="Delete author"
                                                    type="submit"
                                                />
                                            </div>
                                        </form>
                                    ))
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CreateCourse.propTypes = {
    newCourse: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.array,
        creationDate: PropTypes.string,
        duration: PropTypes.number
    }),
    authors: PropTypes.array,
    authorName: PropTypes.string,
    selectedAuthors: PropTypes.array
}

const mapStateToProps = (state, props) => {
    if (state.courses.redirectTo) {
        props.history.push(state.courses.redirectTo);
        state.courses.redirectTo = undefined;
    }

    return {
        authors: state.authors.list
    };
}

export default connect(mapStateToProps)(CreateCourse);
