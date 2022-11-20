import { StatusCode } from "./StatusCode";

export interface IResponse<T>{
    data?: T;
    message?: string;
    status:StatusCode;
}

