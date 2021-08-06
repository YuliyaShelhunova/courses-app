import * as types from './user.types';

const receiveCurrentUser = (user) => {
    return {
        type: types.GET_CURRENT_USER,
        user
    }
};

const loginUser = (authToken, redirectTo) => {
    return {
        type: types.LOGIN_USER,
        authToken,
        redirectTo
    }
};

const registerUser = (redirectTo) => {
    return {
        type: types.REGISTER_USER,
        redirectTo
    }
};

const logout = (isLogout) => {
    return {
        type: types.LOGOUT,
        isLogout
    }
};

export { receiveCurrentUser, loginUser, registerUser, logout };