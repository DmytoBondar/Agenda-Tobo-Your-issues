import { Issues } from '../../type';
import requests from './httpServices'

class IssueServices {
    getIssues () : Promise<Issues[]>{
        return requests.get('/agenda')
    }
    deleteIssues (id:string) : Promise<Issues[]>{
        return requests.get(`/delete/${id}`)
    }
  
}
export default new IssueServices();