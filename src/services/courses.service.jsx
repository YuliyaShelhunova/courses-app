import { AuthorsService } from './authors.service';
import { UserService } from './user.service';

export const CoursesService = {

    async getAllCourses() {
        var json = await this.getAllCoursesSync();
        const allAuthors = await AuthorsService.getAllAuthors();

        return await json
            .map(course => {
                const authors = course.authors.map(id => allAuthors.find(item => item.id === id));
                const updatedCourse = { ...course, authors: authors };
                return updatedCourse;
            });
    },

    async getAllCoursesSync() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        return await fetch('http://localhost:3000/courses/all', requestOptions)
            .then(res => res.json()).then(data => data.result);
    },

    async deleteCourseSync(id) {
        const authToken = UserService.getToken();
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
        };
        return await fetch('http://localhost:3000/courses/' + id, requestOptions)
            .then(res => res.json()).then(data => data.result);
    },

    async updateCourseSync(id, course) {
        const authToken = UserService.getToken();
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify(course)
        };
        return await fetch('http://localhost:3000/courses/' + id, requestOptions)
            .then(res => res.json()).then(data => data.result);
    },

    async getCourseById(id) {
        const requestOptions = {
            method: 'GET'
        };
        const allAuthors = await AuthorsService.getAllAuthors();
        const json = await fetch('http://localhost:3000/courses/' + id, requestOptions)
            .then(res => res.json()).then(data => data.result);
        const authors = json.authors.map(authorId => allAuthors.find(item => item.id === authorId));
        const updatedCourse = { ...json, authors: authors };
        return updatedCourse;
    },

    async addCourseToList(course) {
        const authToken = UserService.getToken();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify(course)
        };
        const json = await fetch('http://localhost:3000/courses/add', requestOptions)
            .then(res => res.json()).then(data => data.result);

        return json;
    }

}