import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment'
import {ConfigService} from "../config.service";
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, public config: ConfigService,) { }
    httpGet(arg: { url: string, params?: HttpParams }): Observable<any> {
        const headerDict = new HttpHeaders({
            // 'User-Agent': 'grow@curateventures.com',
            'Authorization-Key': 'vsvO9VtJEAuoIGx4qQLzTXmY0z9bsHFccK6yk+4zL2M='
        });
        const link = this.config.usaJobsUrl+`/${arg.url}`;
        const data = { params: arg.params }
        const options = { params: arg.params, headers: headerDict };
        return this.http.get(link, options)
    }

    httpPost(url: any, body: any): Observable<any> {
        let headers = { 'content-type': 'application/json' }
        const completeUrl = this.config.apiUrl()+`${url}`;
        return this.http.post(completeUrl, body, { 'headers': headers })
    }
    httpPostForUplaod(url: any, body: any): Observable<any> {
        let headers = {}
        const completeUrl = this.config.apiUrl()+`${url}`;
        return this.http.post(completeUrl, body, { 'headers': headers })
    }
}
