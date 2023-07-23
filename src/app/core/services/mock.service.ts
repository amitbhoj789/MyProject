import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RequestService } from './request.service';
import { Observable, of, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MockService {

    constructor(
        public requestService: RequestService,
        public apiService: ApiService,
        private _httpClient: HttpClient
    ) {}

    // getIndustryList(): Observable<{ id: number; title: string }> {
    //     return this.http.get('http://localhost:3000/posts');
    // }

    getIndustryList(): Observable<any> {
        return this._httpClient.get('src/app/mock-api/api/additional/api/industryList').pipe(
            switchMap((response: any) => of(response))
        );
    }
}
