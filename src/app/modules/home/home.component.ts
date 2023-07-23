import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import {ConfigService} from "../../core/config.service";
import {Router, ActivatedRoute} from "@angular/router";
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import {GoogleApiService, UserInfo} from "../../core/services/google-api.service";
import {FilesService} from "../../core/services/files.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    federalJobHeading: string = 'JOB SEEKERS + CANDIDATES';
    federalJobSubHeading: string = 'Instant Identity Protected Matching';
    jobTabIndex = 0;
    infoTabIndex = 0;

    jobSeekerTab: boolean = true;
    registerJobRepTab: boolean = false;
    networkTab: boolean = false;

    whyBothTabContent: boolean = true;
    challengesTabContent: boolean = false;
    ourSolutionTabContent: boolean = false;
    infoTabTopImage: string = 'Blue1.png';
    params: any;

    slides = [
        { img: "assets/images/slider1.jpg", url: false },
        { img: "assets/images/curate-match-banner.png", url: false },
        { img: "assets/images/7-Steps-Master.png", url: true },
    ];
    slideConfig = {
        "slidesToShow": 1,
        "slidesToScroll": 1,
        "dots": true,
        "infinite": false,
        "autoplay": true,
        "autoplaySpeed": 2000,
        "arrows":false,
        "pauseOnHover": false,
        "draggable": true,
        "touchMove": true,
        "swipe":true,
    };

    customOptions: OwlOptions = {
        loop: true,
        autoplay:true,
        autoplayTimeout:5000,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: true,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            740: {
                items: 1
            },
            940: {
                items: 1
            }
        },
        nav: false
    }

    activeSlides: any = SlidesOutputData;
    changeOptions(data: SlidesOutputData) {
        this.activeSlides = data;
    }

    userInfo?: UserInfo
    constructor(
        public config: ConfigService,
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private viewportScroller: ViewportScroller
        // private readonly googleApi: GoogleApiService
    ) {
        // googleApi.userProfileSubject.subscribe((info) => {
        //     this.userInfo = info;
        //     console.log(this.userInfo)
        // });
    }

    ngOnInit(): void {
        setTimeout(() => {
            let element:HTMLElement = document.getElementById('sliderStop') as HTMLElement;
            element.click();
        }, 30000);
        localStorage.removeItem('searchType');
        localStorage.removeItem('match_id');
        localStorage.removeItem('emailOtp');
        localStorage.removeItem('excludeList');
        localStorage.removeItem('data_in');
        localStorage.removeItem('data_or_in');
        localStorage.removeItem('data_not_in');
        localStorage.removeItem('match_id');
        localStorage.removeItem('loginType');
        localStorage.removeItem('matchList');
        localStorage.removeItem('jobDetails');
        localStorage.removeItem('imageData');
        localStorage.removeItem('jobDetailsPositionTitle');
        localStorage.removeItem('jobDetailsDepartment');
        localStorage.removeItem('jobDetailsUrl');
        localStorage.removeItem('jobDetailsNumber');
        localStorage.removeItem('demoDataList');
        localStorage.removeItem('additionalInput');
        localStorage.removeItem('specialization');
    }

    ngAfterViewInit() {
        this.params = this._activatedRoute.snapshot.queryParams;
        if (this.params.section == 'start_here') {
            this.viewportScroller.scrollToAnchor(this.params.section);
        }
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

        } else if (value === 'paid') {
            localStorage.setItem('searchType', 'paid');
            this.federalJobHeading = 'USA PRIVATE SECTOR JOBS';
            this.federalJobSubHeading = 'Instant Identity Protected Matching';

        } else if (value === 'companyMatch') {
            localStorage.setItem('searchType', 'companyMatch');
            this.federalJobHeading = 'INDIVIDUAL USA COMPANY';
            this.federalJobSubHeading = 'Instant Identity Protected Matching';

        } else {
            localStorage.setItem('searchType', 'free');
            this.federalJobHeading = 'CANDIDATES + JOB SEEKERS';
            this.federalJobSubHeading = 'Identity Protected Matching';
        }
    }

    jobTabChange(index: number): void {
        if (index === 0) {
            this.jobTabIndex = 0;
            this.jobSeekerTab = true;
            this.registerJobRepTab = false;
            this.networkTab = false;

        } else if (index === 1) {
            this.jobTabIndex = 1;
            this.registerJobRepTab = true;
            this.jobSeekerTab = false;
            this.networkTab = false;

        } else if (index === 2) {
            this.jobTabIndex = 2;
            this.networkTab = true;
            this.registerJobRepTab = false;
            this.jobSeekerTab = false;

        } else {
            this.jobTabIndex = 0;
            this.jobSeekerTab = true;
            this.registerJobRepTab = false;
            this.networkTab = false;
        }
    }

    infoTabChange(index: number): void {
        if (index === 0) {
            this.infoTabIndex = 0;
            this.whyBothTabContent = true;
            this.challengesTabContent = false;
            this.ourSolutionTabContent = false;
            this.infoTabTopImage = 'Blue1.png';

        } else if (index === 1) {
            this.infoTabIndex = 1;
            this.challengesTabContent = true;
            this.whyBothTabContent = false;
            this.ourSolutionTabContent = false;
            this.infoTabTopImage = 'Blue2.png';

        } else if (index === 2) {
            this.infoTabIndex = 2;
            this.ourSolutionTabContent = true;
            this.challengesTabContent = false;
            this.whyBothTabContent = false;
            this.infoTabTopImage = 'Blue3.png';

        } else {
            this.infoTabIndex = 0;
            this.whyBothTabContent = true;
            this.challengesTabContent = false;
            this.ourSolutionTabContent = false;
            this.infoTabTopImage = 'Blue1.png';
        }
    }

}
