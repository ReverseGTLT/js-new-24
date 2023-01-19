class StudentsApi {
    static URL = 'https://6391adecac688bbe4c4f165a.mockapi.io/api/students';
    static request(uri = '', method = 'GET', data) {
        return fetch(`${this.URL}${uri}`, {
            method,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: data ? JSON.stringify(data) : undefined,
        })
            .then((res) => {
                if (res.ok) {
                   return res.json()
                }
                throw new Error("An error occurred", { cause: response });
            });
    }
    static getList() {
        return this.request()
            .catch(() => {
                throw new Error("Failed to get marks.");
            })
    }
    static editList(id, data) {
        return this.request(`/${id}`, 'PUT', data)
            .catch(() => {
                throw new Error("Failed to create a student.");
            });
    }
    static deleteList(id) {
        return this.request(`/${id}`, 'DELETE')
            .catch(() => {
                throw new Error("Failed to update the student.");
            });
    }
    static createList(data) {
        return this.request('', 'POST', data)
            .catch(() => {
                throw new Error("Failed to delete the student.");
            })
    }
}