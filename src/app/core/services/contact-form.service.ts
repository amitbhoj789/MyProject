import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ContactModel } from './model.ts/contact-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root'
})
export class ContactFormService {
    constructor(private http: HttpClient) { }

    private mailApi = 'https://mailthis.to/testbothmatch'
    PostMessage(input: any) {
        return this.http.post(this.mailApi, input, { responseType: 'text' })
            .pipe(
                map(
                    (response) => {
                        if (response) {
                            return response;
                        }else{
                            return null;
                        }
                    },
                    (error: any) => {
                        return error;
                    }
                )
            )
    }
}
