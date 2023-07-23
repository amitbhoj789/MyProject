import { Component, OnInit } from '@angular/core';
import { ConfigService} from "../../../core/config.service";
import { PagingConfig } from '../../../core/models/paging-config.model';
import {FunctionService} from "../../../core/services/function.service";
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from "../../../core/services/admin.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, PagingConfig {

    fileExists: boolean | undefined;
    loader: boolean = true;
    loaderOnClick: boolean = false;

    userType: any = 'All'
    userListings: any
    totalItems: number = 0;
    currentPage: number = 1;
    itemsPerPage: number = 5;
    tableSize: number[] = [5, 10, 15, 20];

    userPending: any;
    userApproved: any;
    userSuspend: any;
    userDeactivate: any;
    pagingConfig: PagingConfig = {} as PagingConfig;

    constructor(
        public config: ConfigService,
        public fun: FunctionService,
        private router: Router,
        public adminService: AdminService
    ) {
        this.pagingConfig = {
            itemsPerPage: this.itemsPerPage,
            currentPage: this.currentPage,
            totalItems: this.totalItems
        }
    }

    users = [
        { id: 1, image: '1689614868307_male-profile-picture-vector-2051141.jpg', name: 'Emily Johnson', date: '05/02/2023', user_status: 'Pending' },
        { id: 1, image: '1689614868307_male-profile-picture-vector-2051141.jpg', name: 'Benjamin Wright', date: '05/12/2023', user_status: 'Approved' },
        { id: 1, image: '1689614868307_male-profile-picture-vector-2051141.jpg', name: 'Eric Hughes', date: '05/22/2023', user_status: 'Suspend' },
        { id: 13, image: '1689614868307_male-profile-picture-vector-2051141.jpg', name: 'Lily Hernandez', date: '05/29/2023', user_status: 'Deactivate' },
    ]

    ngOnInit(): void {
        this.adminService.getUsersList().then((res: any) => {
            if (res) {
                this.loader = false;
                this.users = res;
                this.userPending = this.users.filter(x => x.user_status === "Pending");
                this.userApproved = this.users.filter(x => x.user_status === "Approved");
                this.userSuspend = this.users.filter(x => x.user_status === "Suspend");
                this.userDeactivate = this.users.filter(x => x.user_status === "Deactivate");
                this.userListings = this.users;
            }
        });
    }

    onTableDataChange(event: number, userType:any) {
        this.currentPage = event;
        this.pagingConfig.currentPage  = event;
        this.getUser(userType);
    }

    onTableSizeChange(e:any, userType:any) {
        // this.itemsPerPage = e.target.value
        this.pagingConfig.itemsPerPage = e.target.value;
        this.pagingConfig.currentPage = 1;
        this.getUser(userType);
    }

    getUser(userType:any) {
        if (userType === 'pending') {
            this.userListings = this.userPending;
            this.userType = 'pending'

        } else if (userType === 'approved') {
            this.userListings = this.userApproved;
            this.userType = 'approved'

        } else if (userType === 'suspend') {
            this.userListings = this.userSuspend;
            this.userType = 'suspend'

        } else if (userType === 'deactivate') {
            this.userListings = this.userDeactivate;
            this.userType = 'deactivate'

        } else {
            this.userListings = this.userPending;
            this.userType = 'pending'
        }
    }

    getUserDetails(userData: any) {
        this.loaderOnClick = true
        this.adminService.userDetails(userData.id).then((res: any) => {
            if (res) {
                this.fun.selectedUserDetails = res;
                localStorage.setItem('userDetails', JSON.stringify(res))
                this.loaderOnClick = false;
                this.router.navigate(['/admin/profile/'+userData.id])
            }
        });
    }
}
