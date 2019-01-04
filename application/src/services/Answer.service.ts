import BaseRequest from './BaseRequest';

class AnswerService extends BaseRequest {
    
    private storage: any = window.localStorage;

    /**
     * Select best answer
     */

    public best(data: any): Promise<any> {
        const idUser = {
            'user_id': this.storage.getItem("idUser")
        };

        return new Promise((resolve, reject) => {
            this.instance.post(`/pepe/questions/${data.question_id}/answers/${data.answer_id}/best`, idUser)
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
     * Save answer by question
     */
    public save(data: any): Promise<any> {
        const idUser = this.storage.getItem("idUser");
        return new Promise((resolve, reject) => {
            this.instance.post(`/pepe/users/${idUser}/answer`, data)
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
    
    public image(data: FormData): Promise<any> {
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        return new Promise((resolve, reject) => {
            this.instance.post('storages/pepe/answer', data, {headers})
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

export default AnswerService;