import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {FunctionService} from "../../core/services/function.service";

@Component({
    selector: 'app-jobreps-profile-details',
    templateUrl: './jobreps-profile-details.component.html',
    styleUrls: ['./jobreps-profile-details.component.scss']
})
export class JobrepsProfileDetailsComponent implements OnInit {

    name: any;
    email: any;
    phone: any;
    industry_experience: any;
    address: any;
    certifications: any;
    specialties: any;
    service_summary: any;
    profile_header: any;
    isLoader: boolean = false;
    imageUrl: any = this.config.assetsImages+'profile-pic.svg';

    constructor(
        public config: ConfigService,
        public fun: FunctionService,
    ) { }

    ngOnInit(): void {
        this.getData();
    }

    getData(){
        this.isLoader = true;
        try {
            this.fun.getUserData().then((res: any) => {
                if (res) {
                    this.fun.userData = res;
                    this.imageUrl = this.config.imageStoragePath()+ res.image
                    this.name = res.name
                    this.email = res.email
                    this.phone = res.total_years_in_career_service
                    this.industry_experience = res.industry_experience
                    this.address = res.state+', '+res.city+', '+res.country
                    this.certifications = res.professional_sertification
                    this.specialties = res.top3_specialites
                    this.service_summary = res.service_summary;
                    this.profile_header = res.profile_header;
                }
            }).catch(err => {
                this.isLoader = false;
                console.log("eee => ", err);
            });
        } catch (e) {
            this.isLoader = false;
        }
    }

}
