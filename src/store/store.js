const store = {
    user: {
        isAuth: "",
        name: "",
        email: "",
        token: "",
        redirectTo: undefined
    },
    courses: {
        list: [],
        currentCourse: {},
        redirectTo: undefined
    },
    authors: {
        list: []
    }
}

export default store;