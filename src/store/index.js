import authors_reducer from './authors/authors.reducer';
import courses_reducer from './courses/courses.reducer';
import user_reducer from './user/user.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    authors: authors_reducer,
    courses: courses_reducer,
    user: user_reducer
})