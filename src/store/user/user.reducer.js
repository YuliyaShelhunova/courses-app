import * as types from './user.types';
import store from '../store';

const user_reducer = (state = store.user, action) => {
    switch (action.type) {
        case types.GET_CURRENT_USER:
            return {
                name: action.user?.name,
                email: action.user?.email,
                isAuth: !!action.user?.id
            };
        case types.LOGIN_USER:
            return {
                ...state,
                token: action.authToken,
                isAuth: !!action.authToken,
                redirectTo: action.redirectTo
            };
        case types.REGISTER_USER:
            return {
                ...state,
                redirectTo: action.redirectTo
            }
        case types.LOGOUT:
            return {
                ...state,
                isAuth: !action.isLogout
            }
    }
    return state;
}
export default user_reducer;