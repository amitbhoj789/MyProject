import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import { FilesService } from 'src/app/core/services/files.service';
import { AuthService } from 'src/app/core/services/auth.service';
import {Router} from '@angular/router';
import { FunctionService } from 'src/app/core/services/function.service';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-jobreps-expertise',
    templateUrl: './jobreps-expertise.component.html',
    styleUrls: ['./jobreps-expertise.component.scss']
})
export class JobrepsExpertiseComponent implements OnInit {

    allExpertise: any = [];
    allExpertiseDefult: any = []
    isLoader: boolean = false;
    isDataLoader: boolean = false;
    allData: any = [];
    lastDate:any = '';

    constructor(
        public fileService: FilesService,
        public auth: AuthService,
        public fun: FunctionService,
        public config: ConfigService,
        private toast: ToastrService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        if(this.fun.isLoggedIn){
            this.getExpertize();
        }else{
            this.getExpertizeWithoutAuth()
        }
    }

    getExpertize() {
        this.isDataLoader = true;
        this.fileService.getExpertise().then((res: any) => {
            if (res && res.status) {
                this.isDataLoader = false;
                this.allExpertise = res.data.data;
                //Auto push value in radio button - 25-Apr-2023
                for (let i = 0; i < this.allExpertise.length; i++) {
                    this.expertiseChange(this.allExpertise[i], this.allExpertise[i].expertise_level);
                }
                //End

                this.allExpertise.sort(function(a: { id: number; }, b: { id: number; }) {
                    return a.id - b.id;
                });
                let allUpdateDate:any = []
                if(this.allExpertise && this.allExpertise.length > 0){
                    this.allExpertise.forEach((element: { updated_at: any; }) => {
                        if(element && element.updated_at){
                            allUpdateDate.push(element.updated_at)
                        }
                    });
                    if(allUpdateDate && allUpdateDate.length > 0){
                        const maxDate = new Date(Math.max(...allUpdateDate.map((element: string | number | Date) => {return new Date(element);}),),);
                        // this.lastDate = this.fun.transformDate(maxDate[res.data.data.length-1].updated_at, 'MMM d y');
                        this.lastDate = this.fun.transformDate(maxDate, 'MMM d y');
                    }
                }
            }
            else if(res && res.message === "Token has Expired"){
                this.auth.logout();
                window.location.reload();
            }
            else {
                console.log('Err somthing went wrong');
            }
        }).catch((err: any) => {
            console.log(err);
        })
    }

    getExpertizeWithoutAuth() {
        this.isDataLoader = true;
        this.fileService.getExpertiseWithoutAuth().then((res: any) => {
            if (res && res.status) {
                this.isDataLoader = false;
                let data= res.data.data;
                const unique = [...new Map(data.map((m: { service_name: any; }) => [m.service_name, m])).values()];
                this.allExpertiseDefult = unique
            }
            else {
                console.log('Err somthing went wrong');
            }
        }).catch((err: any) => {
            console.log(err);
        })
    }

    logoutResetReload() {
        this.auth.logout();
        this.fun.checkToken = false;
        this.fun.isLoggedIn = false;
        this.fun.userData = {};
        // window['grecaptcha'].reset();
        window.location.reload();
        this.isDataLoader = false;
        this.router.navigate(['/']);
    }

    updateExpertise() {
        this.isLoader = true;
        let data = { expertiseDetails: this.allData }

        // Check user is loggedIn or not using getuserdata API
        // Check user is loggedIn or not using getuserdata API
        this.auth.getUserDetails().then((res: any) => {
            try{
                if (res && res.description === "Token has Expired" || res.description === "Authorization") {
                    this.logoutResetReload();
                }
            } catch (e){
                this.logoutResetReload();
            }
        }).catch((err: any) => {
            console.log('errGetUser => ', err);
        });

        this.fileService.updateExpertise(data).then((res: any) => {
            console.log(res);
            this.isLoader = false
            if (res && res.status) {
                // this.toast.success('Expertise Level Updated Successfully');
                this.lastDate = this.fun.transformDate(res.data.data, 'MMM d y');
                this.toast.success(res.message);
                this.router.navigate(['/jobreps-profile-details'])
            }
            else {
                this.isLoader = false
                this.toast.error(res.message)
            }
        }).catch((err: any) => {
            console.log(err);
            this.isLoader = false
            if(err&& err.message === "Invalid Params"){
                this.toast.error('Please Select Expertise Level')
            }else{
                this.toast.error(err.message)
            }
        })
    }

    expertiseChange(data: any, id: any) {
        let obj = { expertise_level: id, service_id: data.service_id }
        this.allData = this.allData.filter((item: { service_id: any; }) => item.service_id !== data.service_id);
        this.allData.push(obj);
    }

}
