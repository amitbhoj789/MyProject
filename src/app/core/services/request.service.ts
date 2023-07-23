import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';
import {ConfigService} from "../config.service";

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(
        private http: HttpClient,
        public config: ConfigService,
    ) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(this.config.apiUrl()+`${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    getOutsideUrl(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }

    postOutsideUrl(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.patch(`${path}`, params )
            .pipe(catchError(this.formatErrors));
    }


    put(path: string, body: Object = {}) {
        return this.http.put(this.config.apiUrl()+`${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
        const headers = { 'content-type': 'application/json'}
        return this.http.post(this.config.apiUrl()+`${path}`, body,{'headers':headers}
        ).pipe(catchError(this.formatErrors));
    }

}
