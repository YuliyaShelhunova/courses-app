import * as types from './authors.types';

const receiveAuthors = (authors) => {
    return {
        type: types.GET_ALL_AUTHORS,
        authors
    }
};

const recieveAuthorById = (id) => {
    return {
        type: types.GET_AUTHOR_BY_ID,
        id
    }
};

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

export { receiveAuthors, recieveAuthorById, addAuthorToList, deleteAuthor };