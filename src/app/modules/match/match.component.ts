import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-match',
    templateUrl: './match.component.html',
    styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

    headings: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    searchType: any = [];
    jobSeekerTab: boolean = true;
    registerJobRepTab: boolean = false;
    networkTab: boolean = false;
    jobTabIndex = 0;
    matchType: any;
    whyBothTabContent: boolean = true;
    challengesTabContent: boolean = false;
    ourSolutionTabContent: boolean = false;
    infoTabTopImage: string = 'Ikigai7.png';

    constructor(
        public config: ConfigService,
        private router: Router,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.searchType = localStorage.getItem('searchType');
        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;

        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.matchType = String(routeParams.get('type'));

        localStorage.removeItem('additionalInput');
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

}
