import { UserService } from './user.service';
export const AuthorsService = {

    async getAllAuthors() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        return await fetch('http://localhost:3000/authors/all', requestOptions)
            .then(res => res.json()).then(data => data.result);
    },

    async getAuthorById(id) {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        const json = await fetch('http://localhost:3000/authors/' + id, requestOptions)
            .then(res => res.json()).then(data => data.result);
        return json;
    },

    async addAuthorToList(authorName) {
        const authToken = UserService.getToken();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body: JSON.stringify({ name: authorName })
        };
        const json = await fetch('http://localhost:3000/authors/add', requestOptions)
            .then(res => res.json()).then(data => data.result);
        return json;
    }

}