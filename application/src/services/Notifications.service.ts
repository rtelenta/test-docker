import BaseRequest from './BaseRequest';

class NotificationsService extends BaseRequest {
    private storage: any = window.localStorage;

    public registry(token: any): Promise<any> {
        const idUser = this.storage.getItem("idUser");

        const headers = {
            'Content-Type': 'application/json',
        };

        const body = {
            token,
            user_id: idUser
        }
        return new Promise((resolve, reject) => {
            this.instance.post('notifications/pepe/registry/', body, {headers})
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
}

export default NotificationsService;