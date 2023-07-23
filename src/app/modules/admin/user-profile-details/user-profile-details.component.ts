import { Component, OnInit } from '@angular/core';
import { ConfigService} from "../../../core/config.service";
import {FunctionService} from "../../../core/services/function.service";
import {AdminService} from "../../../core/services/admin.service";

@Component({
    selector: 'app-user-profile-details',
    templateUrl: './user-profile-details.component.html',
    styleUrls: ['./user-profile-details.component.scss']
})
export class UserProfileDetailsComponent implements OnInit {

    userDetails:any;
    constructor(
        public config: ConfigService,
        public fun: FunctionService,
        public adminService: AdminService
    ) { }

    ngOnInit(): void {
        this.userDetails = this.fun.selectedUserDetails;
        if (this.userDetails === undefined) {
            this.userDetails = localStorage.getItem('userDetails');
            this.userDetails = JSON.parse(this.userDetails);
        }
        if (this.userDetails === null) {
            this.getUserDetails(46)
            console.log('Null')
        }
        console.log(this.userDetails)
    }

    updateStatus(event:any, id:any) {
        const data = { 'user_status' : event.target.value }
        this.adminService.updateUserDetails(data, id).then((res: any) => {
            if (res) {
                this.getUserDetails(id)
            }
        });
    }

    getUserDetails(id:any) {
        this.adminService.userDetails(id).then((res: any) => {
            if (res) {
                this.fun.selectedUserDetails = res;
                this.userDetails = this.fun.selectedUserDetails
                localStorage.setItem('userDetails', JSON.stringify(res))
            }
        });
    }
}
