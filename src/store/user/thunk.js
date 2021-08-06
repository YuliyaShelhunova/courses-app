import { UserService } from '../../services/user.service';
import * as actions from './user.action';

export const getCurrentUser = () => dispatch => {
    UserService.getCurrentUser().then(user => {
        dispatch(actions.receiveCurrentUser(user));
    })
};

export const login = (data) => (dispatch) => {
    UserService.loginUser(data).then(authToken => {
        dispatch(actions.loginUser(authToken, '/'));
    })
};

export const logout = (isLogout) => (dispatch) => {
    dispatch(actions.logout(isLogout));
};

export const register = (data) => (dispatch) => {
    UserService.registerUser(data).then(result => {
        dispatch(actions.registerUser('/login'));
    })
};