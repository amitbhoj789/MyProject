import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RequestService } from './request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        public apiService: ApiService,
        public requestService: RequestService,
        private http: HttpClient
    ) { }

    getUsersList() {
        return new Promise((resolve, rejects) => {
            this.requestService.getOutsideUrl("https://bmapi.vlinkinfo.com/users/").subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    rejects(error);
                }
            );
        });
    }

    userDetails(id:any) {
        return new Promise((resolve, rejects) => {
            this.requestService.getOutsideUrl("https://bmapi.vlinkinfo.com/users/"+id+"/").subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    rejects(error);
                }
            );
        });
    }

    updateUserDetails(data:any, id:any) {
        return new Promise((resolve, rejects) => {
            this.requestService.postOutsideUrl("https://bmapi.vlinkinfo.com/users/"+id+"/", data).subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    rejects(error);
                }
            );
        });
    }
}
