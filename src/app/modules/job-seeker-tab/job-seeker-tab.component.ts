import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {Router} from "@angular/router";
import {FilesService} from "../../core/services/files.service";

@Component({
    selector: 'app-job-seeker-tab',
    templateUrl: './job-seeker-tab.component.html',
    styleUrls: ['./job-seeker-tab.component.scss']
})
export class JobSeekerTabComponent implements OnInit {

    federalJobHeading: string = 'JOB SEEKERS + CANDIDATES';
    federalJobSubHeading: string = 'Instant Identity Protected Matching';

    images = [];
    imageData: any = [];
    constructor(
        public config: ConfigService,
        public fileService: FilesService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    setSearchType(value: string) {
        if (value === 'free') {
            localStorage.setItem('searchType', 'free');
            this.federalJobHeading = 'Both Match - Interactive Demo';
            this.federalJobSubHeading = 'Identity Protected Matching';
            this.router.navigate(['/upload-resume/free']);

        } else if (value === 'freeGovt') {
            localStorage.setItem('searchType', 'freeGovt');
            this.federalJobHeading = 'GOVERNMENT JOBS';
            this.federalJobSubHeading = 'Instant Identity Protected Matching';
            this.router.navigate(['/upload-resume/freeGovt']);

        } else if (value === 'careerProfessionalMatch') {
            localStorage.setItem('searchType', 'careerProfessionalMatch');
            this.federalJobHeading = 'CAREER PROFESSIONAL MATCH';
            this.federalJobSubHeading = 'Candidate Need Based Matching';
            this.router.navigate(['/career-professional-match']);
            this.getApprovedUsers();

        } else if (value === 'paid') {
            localStorage.setItem('searchType', 'paid');
            this.federalJobHeading = 'USA PRIVATE SECTOR JOBS';
            this.federalJobSubHeading = 'Instant Identity Protected Matching';

        } else if (value === 'companyMatch') {
            localStorage.setItem('searchType', 'companyMatch');
            this.federalJobHeading = 'INDIVIDUAL USA COMPANY';
            this.federalJobSubHeading = 'Instant Identity Protected Matching';

        } else if (value === 'jobRepCommunity') {
            window.open('https://jobrep.com', '_blank')

        } else {
            localStorage.setItem('searchType', 'free');
            this.federalJobHeading = 'CANDIDATES + JOB SEEKERS';
            this.federalJobSubHeading = 'Identity Protected Matching';
        }
    }

    getApprovedUsers() {
        let arrData: any[] = []
        this.fileService.getAllUsers().then((res: any) => {
            if (res && res.status) {
                let resData = res.data.data;
                if(resData && resData.length > 0){
                    //this.isLoader = false;
                    resData.forEach((element: { image: string; name: any; service_summary: any; profile_header: any; top3_specialites: any[]; }) => {
                        if (element.image && element.name && element.service_summary && element.profile_header) {
                            let top3_specialites: any[] = []
                            if (element.top3_specialites.length) {
                                element.top3_specialites.forEach(x => {
                                    top3_specialites.push(x.service_name)
                                })
                            }
                            let objData = {
                                image: this.config.imageStoragePath() + element.image,
                                name: element.name,
                                details: element.service_summary,
                                title: element.profile_header,
                                top3_specialites: top3_specialites.join(', ')
                            }
                            // @ts-ignore
                            this.images.push(objData)
                        }
                    });
                    this.setImageData(arrData);
                }
                //this.isLoader = false;
            } else {
                //this.isLoader = false;
                console.log('Err something went wrong');
            }
        }).catch((err: any) => {
            console.log(err);
        })
    }

    setImageData(data: any) {
        this.imageData = [] //get user data for career advancement
        if(this.images && this.images.length > 0){
            // if (localStorage.getItem('jSlideValue') != undefined && localStorage.getItem('jSlideValue') != null && localStorage.getItem('jSlideValue') != '') {
            // let current: any = localStorage.getItem('jSlideValue') ? localStorage.getItem('jSlideValue') : '';
            let randomValue: any  =  Math.floor(Math.random() * this.images.length); // get random value smaller then image length
            if(randomValue >= this.images.length-2 && this.images.length > 1){ //get last two value
                this.imageData.push(this.images[this.images.length-2]);
                this.imageData.push(this.images[this.images.length-1]);
            } else{
                if(this.images.length > 1){
                    for (let i = randomValue; i <=   randomValue + 1  ; i++) {
                        let sildeData = this.images[i]
                        this.imageData.push(sildeData);
                    }
                } else{
                    let sildeData
                    this.images.length ?  sildeData = this.images[0] : " "
                    this.imageData.push(sildeData)
                }
            }
        }
        localStorage.setItem('imageData',JSON.stringify(this.imageData));
    }
}
