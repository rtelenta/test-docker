import { IQuestionInput } from '../interfaces/Question.interface';
import BaseRequest from './BaseRequest';

class QuestionService extends BaseRequest {

    private storage: any = window.localStorage;
    /**
     * save method for Question
     */
    public save(data: IQuestionInput): Promise<any> {
        const idUser = this.storage.getItem("idUser");
        return new Promise((resolve, reject) => {
            this.instance.post(`/pepe/users/${idUser}/question`, data)
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
     * get Questions
     */
    public get(next: string = "", status: number = 0, sort: any = 1, category?: any): Promise<any> {
        let url: any;
        let params: any = false;
        let service: any;

        if (next==="") {
            url = '/pepe/question';
            params = {
                category,
                sort_by: sort,
                status
            };

            service = this.instance.get(url, { params });
        } else {
            url = next;
            service = this.instance.get(url);
        }
        
        return new Promise((resolve, reject) => {
            service
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
        const url = `/pepe/question/${id}`;
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
}

export default QuestionService;