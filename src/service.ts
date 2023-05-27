import type { AxiosInstance, AxiosResponse } from "axios";
import axios from 'axios'
import AppSettings from "./AppSetting";
import axiosConfig from "./axiosConfig";
import type BaseServiceResponse from "./models/AuthModels";
import router from "./router";

export default class APIService {
    public apiURL: string;
    public $http: AxiosInstance;
    defaultHeaders: object;
    public constructor() {
        this.apiURL = AppSettings.API_URL;
        this.$http = axios.create({
            baseURL: AppSettings.API_URL
        })
        this.defaultHeaders = {}
        this.$http.interceptors.request.use(<any>this.addAuthToken);
        this.$http.interceptors.response.use(undefined, function(error) {
            if (error.response.status === 401 || error.response.status == 403) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                router.push({ name: 'Login' })
            }
            return Promise.reject(error);
        });
    }

    public async addAuthToken(request: any) {
        const route = request.url?.split('/').pop();
        
        return new Promise(async function(resolve, reject) {
            try {
                const token = localStorage.getItem('accessToken');
                request.headers["Authorization"] = `Bearer ${token}`;
                resolve(request)
            } catch (err) {
                resolve(request)
            }
        });
    }

    public async post<T extends Object,RT>(action: string, body: T, files?: any): Promise<AxiosResponse<BaseServiceResponse<RT>>> {
        
        let headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json'
        };
        if (files) {
            const formData = new FormData();
            for (const key in body) {
                if (body.hasOwnProperty(key)) {
                    formData.append(key, JSON.stringify(body[key]));
                }
            }

            for (const key in files) {
                if (files.hasOwnProperty(key) && Array.isArray(files[key])) {
                    files[key].forEach((file: File, i: number) => {
                        formData.append(`${key}[${i}]`, file);
                    });
                } else {
                    console.error('Files object property is not an array of files');
                }
            }

            headers = {
                ...this.defaultHeaders,
                'Content-Type': 'multipart/form-data'
            };
            (body as any) = formData;
        }

        // // return Axios({ method: 'post', url: this.apiUrl + action, headers: headers })
        return this.$http.post(this.apiURL + action, body);
    }

    public async patch<T extends Object,RT>(action: string, body: T, id: string, files?: any): Promise<AxiosResponse<BaseServiceResponse<RT>>> {
        
        let headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json'
        };

        if (files) {
            const formData = new FormData();
            for (const key in body) {
                if (body.hasOwnProperty(key)) {
                    formData.append(key, JSON.stringify(body[key]));
                }
            }

            for (const key in files) {
                if (files.hasOwnProperty(key) && Array.isArray(files[key])) {
                    files[key].forEach((file: File, i: number) => {
                        formData.append(`${key}[${i}]`, file);
                    });
                } else {
                    console.error('Files object property is not an array of files');
                }
            }

            headers = {
                ...this.defaultHeaders,
                'Content-Type': 'multipart/form-data'
            };
            (body as any) = formData;
        }

        // // return Axios({ method: 'post', url: this.apiUrl + action, headers: headers })
        return this.$http.patch(this.apiURL + action + id + '/', body);
    }

    public async delete<T extends Object,RT>(action: string, id: string, files?: any): Promise<AxiosResponse<BaseServiceResponse<RT>>> {
        
        let headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json'
        };

        // // return Axios({ method: 'post', url: this.apiUrl + action, headers: headers })
        return this.$http.delete(this.apiURL + action + id);
    }

    public async get<T extends Object,RT>(controller: string, queryParams?: T) : Promise<AxiosResponse<BaseServiceResponse<RT>>>{

        let headers = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json'
        };
        return this.$http.get(this.apiURL + controller, {
            params: { queryParams },
            headers: headers
        })
    }

    public async retrieve<T extends Object,RT>(controller: string, objectId: string, queryParams?: T) : Promise<AxiosResponse<BaseServiceResponse<RT>>>{
        let headers = {
            ...this.defaultHeaders,
            'Remolacha': 'Azucar',
            'Content-Type': 'application/json'
        };
        return this.$http.get(this.apiURL + controller + objectId, {
            params: { queryParams },
            headers: headers
        })
    }
}