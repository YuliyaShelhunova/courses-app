import { AuthorsService } from '../../services/authors.service';
import * as types from './authors.types';

const receiveAuthors = (authors) => {
    return {
        type: types.GET_ALL_AUTHORS,
        authors
    }
};

export const getAllAuthors = () => dispatch => {
    AuthorsService.getAllAuthors().then(authors => {
        dispatch(receiveAuthors(authors))
    })
}

const recieveAuthorById = (id) => {
    return {
        type: types.GET_AUTHOR_BY_ID,
        id
    }
};

export const getAuthorById = (id) => dispatch => {
    AuthorsService.getAuthorById(id).then((author) => {
        dispatch(recieveAuthorById(author))
    });
}

const deleteAuthor = (id) => {
    return {
        type: types.DELETE_AUTHOR,
        id
    }
};

const addAuthorToList = (author) => {
    return {
        type: types.ADD_AUTHOR_TO_LIST,
        author
    }
};

export const addAuthor = (author) => (dispatch) => {
    AuthorsService.addAuthorToList(author).then(result => {
        dispatch(addAuthorToList(result));
    })
}

export { receiveAuthors, recieveAuthorById, addAuthorToList, deleteAuthor };