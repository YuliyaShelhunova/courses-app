const store = {
    user: {
        isAuth: "",
        name: "",
        email: "",
        token: "",
        isAdmin: false,
        redirectTo: undefined
    },
    courses: {
        list: [],
        currentCourse: {
            title: "",
            description: "",
            creationDate: "",
            duration: 0,
            authors: []
        },
        redirectTo: undefined
    },
    authors: {
        list: []
    }
}

export default store;