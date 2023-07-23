import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
// import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FunctionService {

    userData: any;
    top3Data: any;
    isLoginLoader: boolean = false
    inputLoader: boolean = false
    checkToken:any
    setLoginData: any;
    setFilterData: any = [];
    isLoggedIn: any;
    loginToken: any;
    selectedUserDetails: any;
    constructor(
        private datePipe: DatePipe,
        public auth: AuthService
    ) {
        // this.checkVerifyToken();
        this.isLoggedIn = localStorage.getItem('isLoggedIn');
        this.loginToken = localStorage.getItem('loginToken');
    }

    transformDate(date: any, sequence = 'yyyy-MM-ddTHH:mm') {
        return this.datePipe.transform(date, sequence, 'es-ES');
    }


    confirmBox(msg = '', confirmBtn = '', cancel = '', textOp?: string) {
        return new Promise((resolve, rejects) => {
            // Swal.fiare({
            //   title: msg,
            //   icon: 'warning',
            //   text: textOp,
            //   showCancelButton: true,
            //   confirmButtonText: confirmBtn,
            //   cancelButtonText: cancel
            // }).then((result) => {
            //   if (result.value) {
            //     resolve(true);
            //   } else if (result.dismiss === Swal.DismissReason.cancel) {
            //     result.isDismissed
            //     rejects(false)
            //   }
            // })
        });
    }

    getUserData() {
        this.isLoginLoader  = true;
        return new Promise((resolve, rejects) => {
            this.auth.getUser().then((data: any) => {
                this.isLoginLoader = false
                try{
                    if (data && data.status) {
                        this.userData = data.data.userData;
                        this.userData.top3_specialites = data.data.top3Data
                        // this.top3Data = data.data.top3Data;
                        this.setLoginData = data.data.userData;
                        resolve(this.userData);

                    } else if (data && data.description === "Token has Expired" || data.description === "Authorization") { //change message to description as per response get in description not message
                        this.auth.logout();
                        this.isLoginLoader = false
                        rejects(data);

                    } else {
                        this.isLoginLoader = false
                        rejects(data)
                    }
                }catch (e){
                    console.log('catch error => ', e);
                }
            }).catch((err: any) => {
                this.isLoginLoader = false
                console.log('catch error => ', err);
                rejects(err)
            })
        });
    }

    // checkVerifyToken() {
    //   this.auth.verifyToken().then((res: any) => {
    //     if (res && res.status) {
    //       this.auth.logout();
    //     }
    //     else {
    //       console.log('false');
    //     }
    //   }).catch((err: any) => {
    //     console.log(err);
    //   })
    // }

    private openedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    opened$ = this.openedSubject.asObservable();

    toggleSidebarVisibility() {
        this.openedSubject.next(!this.openedSubject.getValue());
    }

    // Update image from profile update component
    private valueSource = new Subject();
    value$ = this.valueSource.asObservable();
    updateValue(value: string | ArrayBuffer | null) {
        this.valueSource.next(value);
    }
}
