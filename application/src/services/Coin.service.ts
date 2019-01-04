import Settings from '../settings';
import BaseRequest from './BaseRequest';

class CoinService extends BaseRequest {

    private storage: any = window.localStorage;

    /**
     * get coins by User
     */
    public get(): Promise<any> {
        const idUser = this.storage.getItem("idUser");
        return new Promise((resolve, reject) => {
            if (Settings.enableCoins) {
                this.instance.get(`/coins/users/${idUser}/coins`)
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
            } else {
                const fakeResult = {                    
                    code: 2000,                    
                    data: {
                        total: 0
                    },
                    error: false,
                    message: "SUCCESS"
                };

                resolve(fakeResult);
            }
        });
    }
}

export default CoinService;