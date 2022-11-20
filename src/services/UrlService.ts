import axios from 'axios';
import { ILink } from '../modules/ILink';

export class UrlService{

    private static readonly BASE_URL:string = "https://localhost:7288/api/v1/linkapi/";

    public static getLinks() {
        const urlGetLinks = "get-links";
        return axios.get(this.BASE_URL + urlGetLinks);
    }

    public static deleteLink(id:number) {
        const urlDeleteLink = `delete-link-by-id/${id}`;
        return axios.delete(this.BASE_URL + urlDeleteLink);
    }
    
    public static createLink(link:ILink){
        const urlCreateLink = "";
        return axios.post(this.BASE_URL, link);
    }

    public static editLink(link:ILink){
        const urlUpdateLink = "";
        return axios.put(this.BASE_URL, link);
    }

    public static getLinkById(id:number){
        const urlGetById = "get-link-by-id";
        return axios.get(this.BASE_URL + urlGetById + `/${id}`);
    }
}