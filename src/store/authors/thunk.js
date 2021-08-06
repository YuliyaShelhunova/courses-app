import { AuthorsService } from '../../services/authors.service';
import * as actions from './authors.action';

export const getAllAuthors = () => dispatch => {
    AuthorsService.getAllAuthors().then(authors => {
        dispatch(actions.receiveAuthors(authors))
    })
};

export const getAuthorById = (id) => dispatch => {
    AuthorsService.getAuthorById(id).then((author) => {
        dispatch(actions.recieveAuthorById(author))
    });
};

export const addAuthor = (author) => (dispatch) => {
    AuthorsService.addAuthorToList(author).then(result => {
        dispatch(actions.addAuthorToList(result));
    })
};
