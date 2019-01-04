import BaseRequest from './BaseRequest';

class UserService extends BaseRequest {
    private storage: any = window.localStorage;

    /**
     * Get questions by ID.
     */
    public questions(next: string = "", status: number = 0): Promise<any> {
        const idUser = this.storage.getItem("idUser");
        const url = (next==="") ? `/pepe/users/${idUser}/question?status=${status}` : next;
        return new Promise((resolve, reject) => {
            this.instance.get(url)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    /**
     * get Question by ID
     */
    public getByID(id: string): Promise<any> {
        const idUser = this.storage.getItem("idUser");
        const url = `/pepe/users/${idUser}/question/${id}`;
        return new Promise((resolve, reject) => {
            this.instance.get(url)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                }).catch((error: any) => {
                    reject(error);
                });
        });
    }

    public getNotifications(): Promise<any> {
        const idUser = this.storage.getItem("idUser");
        const url = `/pepe/users/${idUser}/answer/notification`;
        return new Promise((resolve, reject) => {
            this.instance.get(url)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                }).catch((error: any) => {
                    reject(error);
                });
        });
    }

    public getInfo(): Promise<any> {
        const idUser = this.storage.getItem("idUser");
        const url = `/pepe/users/${idUser}`;
        return new Promise((resolve, reject) => {
            this.instance.get(url)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                }).catch((error: any) => {
                    reject(error);
                });
        });
    }

    public saveImage(image: string): Promise<any> {
        const idUser = this.storage.getItem("idUser");
        const url = `/pepe/users/${idUser}/image`;
        const body = {
            url_image: image
        }
        return new Promise((resolve, reject) => {
            this.instance.put(url, body)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                }).catch((error: any) => {
                    reject(error);
                });
        });
    }

    public uploadImage(data: FormData): Promise<any> {
        const headers = {
            'Content-Type': 'multipart/form-data',
        };

        return new Promise((resolve, reject) => {
            this.instance.post('storages/pepe/user', data, {headers})
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }

    public getMyCourses(idUser: any, token: any): Promise<any> {
        const url = `/pepe/users/${idUser}/courses`;
        const headers = {
            'Authorization': token,
        };

        return new Promise((resolve, reject) => {
            this.instance.get(url, { headers })
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                }).catch((error: any) => {
                    reject(error);
                });
        });
    }
}

export default UserService;