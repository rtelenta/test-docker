import BaseRequest from './BaseRequest';

class LoginService extends BaseRequest {
    public login(data: any) : Promise<any> {
        return new Promise((resolve, reject) => {
            this.instance.post('auth/users/login', data, {
                    headers: {
                        'Authorization': null
                    }
                })
                .then((response:any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    if (typeof error.response !== 'undefined') {
                        if (error.response.status === 400 && error.response.data) {
                            resolve(error.response.data);
                        } else {
                            reject(error);
                        }
                    } else {
                        reject(error);
                    }
                });
        });
    }

    public logout() : Promise<any> {
        const idUser = window.localStorage.getItem("idUser");
        const browserToken = window.localStorage.getItem("browserToken");
        const data = {
            'token': browserToken,
            'type': 'student',
            'user_id': idUser
        };
        return new Promise((resolve, reject) => {
            this.instance.post('auth/users/logout', data)
                .then((response:any) => {
                    if (response.status === 200 && response.data) {
                        resolve(response.data);
                    } else {
                        reject(null);
                    }
                })
                .catch((error: any) => {
                    if (error.response.status === 400 && error.response.data) {
                        resolve(error.response.data);
                    } else {
                        reject(error);
                    }
                });
        });
    }
}

export default LoginService;