import "./CourseForm.css";
import React, { useState, useEffect, useContext, useCallback } from "react";
import Button from "../Button/Button";
import { Utils } from "../../Utils/Utils";
import PropTypes from "prop-types";
import { connect, ReactReduxContext } from "react-redux";
import * as coursesThunk from "../../store/courses/thunk";
import * as authorsThunk from "../../store/authors/thunk";

const CourseForm = ({ authors, isAdmin, course, match }) => {
    const [newCourse, changedNewCourse] = useState({
        title: course.title,
        description: course.description,
        creationDate: course.creationDate,
        duration: course.duration,
        authors: course.authors,
    });
    const [authorsList, setAuthors] = useState([]);
    const [authorName, setAuthorName] = useState("");
    const [selectedAuthors, pushSelectedAuthors] = useState([]);
    const [isInit, setInit] = useState(true);
    const { store } = useContext(ReactReduxContext);
    const isUpdate = match?.url.indexOf("update") > -1;
    const nameButton = isUpdate ? "Update course" : "Create course";

    useEffect(() => {
        store.dispatch(authorsThunk.getAllAuthors());
    }, [store]);

    useEffect(() => {
        setAuthors(authors);
    }, [authors]);

    const addAuthors = useCallback(
        (addedAuthors) => {
            let selectedItems = [];
            addedAuthors.forEach((author) => {
                if (!selectedItems.find((item) => item.id === author.id)) {
                    authors.splice(
                        authorsList.findIndex((item) => item.id === author.id),
                        1
                    );
                    selectedItems.push(author);
                }
            });
            pushSelectedAuthors(selectedItems);
        },
        [authors, authorsList]
    );

    useEffect(() => {
        if (isAdmin && isUpdate && course.id && isInit) {
            changedNewCourse(course);
            addAuthors(course?.authors);
            setInit(false);
        }
    }, [addAuthors, course, isAdmin, isInit, isUpdate]);

    useEffect(() => {
        if (isAdmin && isUpdate) {
            store.dispatch(coursesThunk.getCourseById(match?.params?.id));
        }
    }, [isAdmin, isUpdate, match?.params?.id, store]);

    const onCreateAuthor = (e) => {
        e.preventDefault();
        if (authorName.length > 2) {
            store.dispatch(authorsThunk.addAuthor(authorName));
        }
    };

    const onAddAuthor = (e) => {
        e.preventDefault();
        const authorId = e.target.name;
        const author = authorsList.find((item) => item.id === authorId);
        addAuthors([...author]);
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
            duration: +duration,
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
            const courseToSend = {
                title: newCourse.title,
                description: newCourse.description,
                creationDate: Utils.generateCurrentDate(),
                duration: newCourse.duration,
                authors: selectedAuthors.map((item) => item.id),
            };
            isUpdate
                ? store.dispatch(coursesThunk.updateCourse(course.id, courseToSend))
                : store.dispatch(coursesThunk.addCourse(courseToSend));
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
                            {isAdmin ? (
                                <Button name={nameButton} class="main-button" type="submit" />
                            ) : (
                                    <div></div>
                                )}
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

CourseForm.propTypes = {
    newCourse: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        authors: PropTypes.array,
        creationDate: PropTypes.string,
        duration: PropTypes.number,
    }),
    authors: PropTypes.array,
    authorName: PropTypes.string,
    selectedAuthors: PropTypes.array,
};

const mapStateToProps = (state, props) => {
    if (state.courses.redirectTo) {
        props.history.push(state.courses.redirectTo);
        state.courses.redirectTo = undefined;
    }

    return {
        authors: state.authors.list,
        isAdmin: state.user.isAdmin,
        course: state.courses.currentCourse,
    };
};

export default connect(mapStateToProps)(CourseForm);
