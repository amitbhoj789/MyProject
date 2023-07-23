import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        DashboardComponent,
        UserProfileDetailsComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NgxPaginationModule,
        FormsModule
    ]
})
export class AdminModule { }
