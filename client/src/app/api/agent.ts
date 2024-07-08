import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";


const sleep =() => new Promise(resolve => setTimeout(resolve,500))

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse)=> response.data;

axios.interceptors.response.use(async response =>{
    await sleep();
    return response
}, (_error: AxiosError)=>{
    const{data,status} = _error.response as AxiosResponse;
    switch (status){
        case 400:
            if(data.errors) {
                const modelStateErrors: string[] =[];
                for(const key in data.errors) {
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
                 
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
            case 500:
                router.navigate('/server-error', {state: {error: data}})
                break;
        default:
            break;                
    }
    return Promise.reject(_error.response);
})

const requests = {
    get:(url: string)=>axios.get(url).then(responseBody),
    post:(url: string, _body: object) => axios.post(url).then(responseBody),
    put:(url: string, _body: object) => axios.put(url).then(responseBody),
    delete:(url: string)=>axios.delete(url).then(responseBody),
} 
const Catalog = {
    list:() => requests.get('products'),
    details:(id: number) => requests.get(`products/${id}`)
}

const TestError = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unathorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),

}

const agent ={
    Catalog,
    TestError
}
export default agent;