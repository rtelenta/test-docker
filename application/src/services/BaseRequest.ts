import Axios from 'axios';

export const headersRequest = {
    'Content-Type': 'application/json'
};

class BaseRequest {
    protected instance: any;
    private baseUrl = '';
    private token: any;

    constructor() {
        this.baseUrl = process.env.REACT_APP_BASE_URL || '';
        this.token = window.localStorage.getItem("token");
        this.instance = Axios.create({
            baseURL: this.baseUrl,
            headers: {...headersRequest, 'Authorization': this.token}
            // headers: {...headersRequest, 'Authorization': 'Bearer ' + UserRepository.getToken()},
        });

        this.instance.interceptors.response.use((response:any) => {
            return response;
        }, async (error:any) => {
            window.console.log(error);
            
            return Promise.reject(error);
        });

    }

    public refreshToken() {

        return new Promise((resolve, reject) => {

            Axios.post('/ugo-admin/refreshToken', {},
                {
                    baseURL: this.baseUrl,
                    headers: {...headersRequest, 'Authorization': this.token}
                    // headers:{'Authorization':'Bearer ' + UserRepository.getRefreshToken()}
                }
                ).then((response) => {
                    // UserRepository.setRefreshToken(response.data.refreshToken);
                    // UserRepository.setToken(response.data.token);
                    resolve();
                }).catch((error)=> {
                    // UserRepository.setRefreshToken('');
                    // UserRepository.setToken('');
                    window.location.assign('/');
                    reject();
                });
        });
    }

    public setTokenHeader() {
        this.instance = Axios.create({
            baseURL: this.baseUrl,
            headers: {...headersRequest, 'Authorization': this.token}
            // headers: {...headersRequest, 'Authorization': 'Bearer ' + UserRepository.getToken()},
        });
    }

    get request() {
        return this.instance;
    }

}

export default BaseRequest;