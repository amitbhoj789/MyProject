import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { RequestService } from './request.service';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, of, ReplaySubject, switchMap, tap} from 'rxjs';
import {ConfigService} from "../config.service";

@Injectable({
    providedIn: 'root'
})
export class GovtMatchApp {

    constructor(
        public apiService: ApiService,
        public requestService: RequestService,
        private http: HttpClient,
        public config: ConfigService,
    ) { }

    resumeUpload(data: any) {
        return new Promise((resolve, rejects) => {
            this.apiService.httpPostForUplaod("govt_match_app/uploadResume", data).subscribe(
                (res) => {
                    resolve(res);
                },
                (error) => {
                    rejects(error);
                }
            );
        });
    }
    wordTypeChange(data: any) {
        return new Promise((resolve, rejects) => {
            this.requestService.post("govt_match_app/updateToExclude", data).subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    rejects(error);
                }
            );
        });
    }
    additionalInput(data: any, match_id:any) {
        return new Promise((resolve, rejects) => {
            this.requestService.post("govt_match_app/additionalInputs?match_id="+match_id, data).subscribe(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    rejects(error);
                }
            );
        });
    }
    getReviewWords(data: any) {
        return new Promise((resolve, rejects) => {
            if (this.config.environmentSetup === 'production') {
                this.requestService.get("govt_match_app/getReviewWords", data).subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        rejects(error);
                    }
                );
            } else {
                this.requestService.post("govt_match_app/getReviewWords", data).subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        rejects(error);
                    }
                );
            }

        });
    }
    getCurateMatchJobs(data: any) {
        return new Promise((resolve, rejects) => {
            if (this.config.environmentSetup === 'production') {
                this.requestService.get("govt_match_app/getCurateMatchJobs", data).subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        rejects(error);
                    }
                );
            } else {
                this.requestService.post("govt_match_app/getCurateMatchJobs", data).subscribe(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        rejects(error);
                    }
                );
            }

        });
    }

    getCurateMatchJobsDetails(url: any) {
        return new Promise((resolve, rejects) => {
            this.requestService.get('get_job_details?job_url='+url).subscribe(
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
