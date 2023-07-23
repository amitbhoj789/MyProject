import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from "@angular/router";
import * as url from "url";
import * as events from "events";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    showFooter: boolean = true;
    showUsefulLinks: boolean = true;
    routeUrl: any;
    Urls: any;
    constructor(
        public config: ConfigService,
        private router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.router.events.subscribe(
            (events: any) => {
                if (events instanceof NavigationEnd) {
                    const routeUrl = this.router.url;
                    let pathUrls: Array<string> = [
                        '/upload-resume/free',
                        '/review-edit',
                        '/additional-input',
                        '/curated-report',
                        '/upload-resume/freeGovt',
                        '/login/jobApply',
                        '/career-professional-match',
                        '/candidate-career-professional-match',
                        '/career-professional-services',
                        '/career-professional-additional',
                        '/career-professional-top-match',
                        '/otp/jobReps',
                        '/forgot-password/jobReps',
                        '/forgot-login/jobReps',
                        '/forgot-password/jobApply',
                        '/forgot-login/jobApply',
                        '/change-password',
                    ];
                    const existUrl = pathUrls.includes(routeUrl);
                    if (existUrl) {
                        this.showFooter = false;
                    } else {
                        this.showFooter = true;
                    }

                    //Usefull Path links
                    let pathUseFullUrls: Array<string> = [
                        '/podcast',
                        '/error',
                        // '/useful-links/about-us',
                        // '/useful-links/help-center',
                        // '/useful-links/help-center?helpCenterBlock=true',
                        // '/useful-links/press-corner',
                        // '/useful-links/search-vs-match',
                        // '/useful-links/terms-and-conditions',
                        // '/useful-links/privacy-policy',
                    ];
                    const existUsefFullUrl = pathUseFullUrls.includes(routeUrl);
                    if (existUsefFullUrl) {
                        this.showUsefulLinks = false;
                    } else {
                        this.showUsefulLinks = true;
                    }


                    // console.log(pathUrls.includes("our-mission"))
                    // if (routeUrl === '/our-mission') {
                    //     this.showFooter = false;
                    // }
                }
            }
        )
    }

}
