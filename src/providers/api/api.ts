import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiProvider {

  //public linkAIP : string = '192.168.100.5/Nearbyvn/app';
   public linkAIP : string ='nearbyvn.com/app';

  constructor(public _http: Http) {}

    callApi_JWT(url: string, method: string, data: string = null , request: RequestOptions = null): Observable<any>{
        
        if (request == null) request = new RequestOptions();
    
        if (request.headers == null) request.headers = new Headers();
    
        if (method.toLowerCase() == "get") {
    
            request.headers.append("Content-Type", "application/x-www-form-urlencoded");
            request.headers.append('Access-Control-Allow-Origin' , '*');
        
            return this._http.get(url,request).map((response) => response.json())
    
        } else if (method.toLowerCase() == "post") {
        
            request.headers.append("Content-Type", "application/x-www-form-urlencoded");
        
            request.headers.append('Authorization' , `Bearer ${sessionStorage.getItem('user_token')}`);
        
            return this._http.post(url, data, request).map((response) => response.json()).retry(5);
        }
    }
    callApi(url: string, method: string, data: string = null,request: RequestOptions = null): Observable<any>
    {
        
        if (request == null) request = new RequestOptions();
    
        if (request.headers == null) request.headers = new Headers();
    
         if (method.toLowerCase() == "post") {
          request.headers.append('Access-Control-Allow-Origin' , '*');
            request.headers.append("Content-Type", "application/x-www-form-urlencoded");
        
            return this._http.post(url, data, request).map((response) => response.json());
        }
    }
}