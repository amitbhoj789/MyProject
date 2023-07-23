import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UserProfileDetailsComponent} from "./user-profile-details/user-profile-details.component";
import {HeaderComponent} from "../../layout/header/header.component";
import { AuthGuard } from '../../core/auth.guard';

const routes: Routes = [] = [
    {
        path: 'admin',
        redirectTo: 'admin/dashboard'
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'profile/:id',
                component: UserProfileDetailsComponent,
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/error',
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
