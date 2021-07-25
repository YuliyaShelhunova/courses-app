export const UserService = {
    saveToken(authToken) {
        window.localStorage.setItem('authToken', authToken);
    },

    getToken() {
        const authToken = window.localStorage.getItem('authToken');
        if (authToken) {
            return authToken;
        }
    },

    removeToken() {
        window.localStorage.removeItem('authToken');
    },

    async getCurrentUser() {
        const authToken = this.getToken();
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'Authorization': authToken }
        };
        const json = await fetch('http://localhost:3000/users/me', requestOptions)
                    .then(res => res.json())
                    .then(data => data.result);

        return json;
    },

    async loginUser(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const json = await fetch('http://localhost:3000/login', requestOptions)
                    .then(res => res.json())
                    .then(data => this.saveToken(data.result))
                    .catch(() => "Error");
        return json;
    },

    async registerUser(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:3000/register', requestOptions)
                                .then(res => res.json())
                                .then(data => data.result)
                                .catch(() => "Error");
        return response;

    }
}