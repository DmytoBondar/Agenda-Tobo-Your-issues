import axios, { AxiosResponse } from 'axios';
const instance = axios.create({
    baseURL: 'https://fierce-everglades-10478.herokuapp.com',
  timeout: 15000,
})

const resposneBody = (response:AxiosResponse) => response.data;

const requests = {
    get:(url:string) => instance.get(url).then(resposneBody),
    delete:(url:string, id:string) => instance.delete(url).then(resposneBody)
}

export default requests;