import { UserService } from '../../services/user.service';
import * as types from './user.types';

const receiveCurrentUser = (user) => {
    return {
        type: types.GET_CURRENT_USER,
        user
    }
};

export const getCurrentUser = () => dispatch => {
    UserService.getCurrentUser().then(user => {
        dispatch(receiveCurrentUser(user));
    })
}

const loginUser = (authToken, redirectTo) => {
    return {
        type: types.LOGIN_USER,
        authToken,
        redirectTo
    }
};

export const login = (data) => (dispatch) => {
    UserService.loginUser(data).then(authToken => {
        dispatch(loginUser(authToken, '/'));
    })
};

const registerUser = (redirectTo) => {
    return {
        type: types.REGISTER_USER,
        redirectTo
    }
};

export const register = (data) => (dispatch) => {
    UserService.registerUser(data).then(result => {
        dispatch(registerUser('/login'));
    })
}

export const logout = (isLogout) => {
    return {
        type: types.LOGOUT,
        isLogout
    }
};

export { receiveCurrentUser, loginUser, registerUser };