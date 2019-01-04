import BaseRequest from './BaseRequest';

class ImageService extends BaseRequest {
    /**
     * 
     * @param data 
     * @return Promise whit the image url.
     */
    public save(data: FormData): Promise<any> {
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        return new Promise((resolve, reject) => {
            this.instance.post('storages/pepe/image', data, {headers})
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

export default ImageService;