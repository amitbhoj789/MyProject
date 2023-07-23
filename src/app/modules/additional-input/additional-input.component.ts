import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ConfigService} from "../../core/config.service";
import { ReCaptchaV3Service } from 'ngx-captcha';
import {GovtMatchApp} from "../../core/services/govt-match-app.service";
import {CuratedReportComponent} from "../curated-report/curated-report.component";

@Component({
    selector: 'app-additional-input',
    templateUrl: './additional-input.component.html',
    styleUrls: ['./additional-input.component.scss'],
    providers: [CuratedReportComponent]
})
export class AdditionalInputComponent implements OnInit {

    frmDetails!: FormGroup;
    siteKey: any;
    isStep3Loading : boolean = false;
    isInvalid: boolean = false;
    additionalInput: any;
    match_id: any;
    searchType: any = [];
    headings: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    currentStep = 3;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;

    selectedIndustry = 'federal government';

    constructor(
        private fb: FormBuilder,
        public config: ConfigService,
        private reCaptchaV3Service: ReCaptchaV3Service,
        private govtMatchApp: GovtMatchApp,
        private router: Router,
        private curatedReport: CuratedReportComponent,
    ) {
        this.siteKey = config.siteKey;
    }

    ngOnInit(): void {
        this.additionalInput = localStorage.getItem('additionalInput');
        this.additionalInput = JSON.parse(this.additionalInput)
        this.frmDetails = this.fb.group({
            industry: [this.additionalInput ? this.additionalInput.industry : null],
            city_state: [this.additionalInput ? this.additionalInput.city_state : null],
            job_category: [this.additionalInput ? this.additionalInput.job_category : 'public'],
            radius: [null],
            job_grade: [null],
            job_department: [this.additionalInput ? this.additionalInput.job_department : null],
            job_title: [this.additionalInput ? this.additionalInput.job_title : null],
            salary_min: [this.additionalInput ? this.additionalInput.salary_min : this.minimumAmountList[0].key],
            salary_max: [this.additionalInput ? this.additionalInput.salary_max : this.minimumAmountList[4].key],
            salary_range: [this.additionalInput ? this.additionalInput.salary_range : null],
            customTags: [this.additionalInput ? this.additionalInput.customTags : null],
            job_type: [this.additionalInput ? this.additionalInput.job_type : null],
            recaptcha: ['', ],
        });
        localStorage.removeItem('jobDetails');
        this.searchType = localStorage.getItem('searchType');
        this.match_id = localStorage.getItem('match_id');

        if (!this.searchType) {
            this.router.navigate(['/']);
        }

        if (this.searchType === 'free') {
            this.setDemoData();
        }

        if (this.searchType === 'freeGovt') {
            this.currentStep = 4;
            this.maxStep = 6;
            this.progress = (this.currentStep/this.maxStep)*100;
            this.progress = Math.round(this.progress);
        }

        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;
    }

    get getControls() {
        return this.frmDetails.controls;
    }
    industryList = [
        { key: 'healthcare', name: 'Healthcare' },
        { key: 'IT', name: 'Information technology' },
        { key: 'real estate', name: 'Real estate and development' },
        { key: 'edu', name: 'Education' },
        { key: 'federal government', name: 'Federal Government' }
    ];

    industryListGovt = [
        { key: 'federal government', name: 'Federal Government' }
    ];

    hiringpathList = [
        { key: 'public', name: 'Open to the public' },
        { key: 'vet', name: 'Veterans' },
        { key: 'nguard', name: 'National Guard & Reserves' },
        { key: 'disability', name: 'Individuals with disabilities' },
        { key: 'mspouse', name: 'Military spouses' },
        { key: 'student', name: 'Students' },
        { key: 'ses', name: 'Senior executives' },
        { key: 'peace', name: 'Peace Corps & AmeriCorps Vista' },
        { key: 'overseas', name: 'Family of overseas employees' },
        { key: 'fed-internal-search', name: 'Internal to an agency' },
        { key: 'graduates', name: 'Recent graduates' },
        { key: 'fed-excepted', name: 'Excepted service' },
        { key: 'fed-competitive', name: 'Competitive service' },
        { key: 'fed-transition', name: 'Career transition (CTAP, ICTAP, RPL)' },
        { key: 'land', name: 'Land & base management' },
        { key: 'special-authorities', name: 'Special authorities' },
    ];

    deptList = [
        { name: 'Department of Transportation', key: 'Transportation' },
        { name: 'Department of Veterans Affairs', key: 'Veterans Affairs' },
        { name: 'Department of the Interior', key: 'Interior' },
        { name: 'Department of the Navy', key: 'Navy' },
        { name: 'Department of the Treasury', key: 'Treasury' },
        { name: 'Department of the Air Force', key: 'Air Force' },
        { name: 'Department of the Army', key: 'Army' },
        { name: 'General Services Administration', key: 'General Services' },
        { name: 'Department of Energy', key: 'Energy' },
        { name: 'Other Agencies and Independent Organizations', key: 'Other' },
        { name: 'Department of Homeland Security', key: 'Homeland Security' },
        { name: 'Department of State', key: 'Stata' },
        { name: 'Department of Justice', key: 'Justice' },
    ];
    titleList = [
        { key: 'IT specialist', name: 'IT Specialist' },
        { key: 'project manager', name: 'Project Manager' },
        { key: 'laboratory manager', name: 'Laboratory Manager' },
        { key: 'administrative assistant', name: 'Administrative Assistant' },
        { key: 'executive assistant', name: 'Executive Assistant' },
        { key: 'nurse practitioner', name: 'Nurse Practitioner' },
        { key: 'software engineer', name: 'Software Engineer' },
        { key: 'data entry', name: 'Data Entry' },
        { key: 'consultant', name: 'Consultant' },
        { key: 'other', name: 'Other' },
    ];

    minimumAmountList = [
        { key: 0, name: '$0-$0' },
        { key: 24000, name: '$0-$24,999' },
        { key: 25000, name: '$25,000-$49,999' },
        { key: 50000, name: '$50,000-$74,999' },
        { key: 75000, name: '$75,000-$99,999' },
        { key: 100000, name: '$100,000-$124,999' },
        { key: 125000, name: '$125,000-$149,999' },
        { key: 150000, name: '$150,000-$174,999' },
        { key: 175000, name: '$175,000-$199,999' },
        { key: 200000, name: '$200,000 or greater' },
    ];

    maximumAmountList = [
        { key: 24000, name: '$0-$24,999' },
        { key: 25000, name: '$25,000-$49,999' },
        { key: 50000, name: '$50,000-$74,999' },
        { key: 75000, name: '$75,000-$99,999' },
        { key: 100000, name: '$100,000-$124,999' },
        { key: 125000, name: '$125,000-$149,999' },
        { key: 150000, name: '$150,000-$174,999' },
        { key: 175000, name: '$175,000-$199,999' },
        { key: 200000, name: '$200,000 or greater' },
    ];

    typeList = [
        { key: 'manager', name: 'Manager' },
        { key: 'group manager', name: 'Group Manager' },
        { key: 'Specialist', name: 'Specialist' },
        { key: 'other', name: 'Other' },
    ];

    get recaptcha() {
        return this.frmDetails.get('recaptcha');
    }

    submitForm(el: HTMLElement) {
        el.scrollIntoView({behavior: 'smooth'});
        this.isStep3Loading = true
        this.isInvalid = this.frmDetails.invalid;
        // @ts-ignore
        this.frmDetails.get('salary_range').setValue(this.frmDetails.value.salary_max);
        if (!this.isInvalid) {
            localStorage.setItem('additionalInput', JSON.stringify(this.frmDetails.value));
            let dataObj = this.frmDetails.value;
            dataObj.match_id = this.match_id;
            this.match_id = JSON.parse(this.match_id)
            this.govtMatchApp.additionalInput(dataObj, this.match_id).then((res: any) => {
                if (res.status) {
                    // localStorage.setItem('PositionTitle', 'Software Developer');
                    // localStorage.setItem('LocationName', 'New york');
                    // localStorage.setItem('RemunerationMinimumAmount', '500');
                    // localStorage.setItem('RemunerationMaximumAmount', '5000');

                    if (this.searchType == 'paid' || this.searchType == 'topCandidatesForEmployers') {
                        // this.showPrivateForm = true;
                        //this.getPaidJobIntialData();
                        //this.tabIndex = 3;
                    } else if (this.searchType == 'free') {
                        // this.showPrivateForm = false;
                        //this.tabIndex = 4; // 3 when show payment is active;
                        //this.showPaymentDiv = false;
                        // this.showPayment(); // show payment is disable
                        // this.router.navigate(['/curated-report']);
                        const response = this.curatedReport.getJobData();
                        if (response) {
                            setInterval(() => {
                                this.isStep3Loading = false
                            }, 2000);
                        }

                    } else {
                        // this.router.navigate(['/curated-report']);
                        const response = this.curatedReport.getJobData();
                        if (response) {
                            setInterval(() => {
                                this.isStep3Loading = false
                            }, 2000);
                        }
                    }
                }
            })
                .catch((err: any) => {
                    console.log(err);
                    this.frmDetails.patchValue({
                        recaptcha: null,
                    });
                });


        } else {
            this.isStep3Loading = false
        }
    }

    setDemoData() {
        // this.showPrivateForm = false;
        this.setDemoFormData();

        // this.resetKewordsData();
        // this.setKewordsData();
        // this.showDemoJobIntialData();
        // this.selectedJobs = [];
        // for (let i = 1; i <= 3; i++) {
        //     this.isSelected(i + 2);
        //     let obj = { MatchedObjectId: '' };
        //     obj.MatchedObjectId = (i + 2).toString();
        //     this.selectedJobs.push(obj);
        // }
        // this.calculateDemoPrice(this.selectedJobs.length);
        // this.showDemojobData();
        // this.federalJobHeading = 'Both Match - Interactive Demo';
        // this.federalJobSubHeading = 'Instant Identity Protected Matching';
    }

    setDemoFormData() {
        //get selected values from localstorage
        this.additionalInput = localStorage.getItem('additionalInput');
        this.additionalInput = JSON.parse(this.additionalInput)

        this.frmDetails.patchValue({
            // industry: this.industryList[1].key,
            industry: 'federal government',
            city_state: this.additionalInput ? this.additionalInput.city_state : 'New york',
            // job_category: this.hiringpathList[0].name,
            job_category: 'public',
            radius: '',
            job_grade: '',
            // job_department: this.deptList[0].name,
            job_department: this.additionalInput ? this.additionalInput.job_department : this.deptList[0].name,
            // job_title: this.titleList[1].name,
            job_title: this.additionalInput ? this.additionalInput.job_title : this.titleList[1].name,
            // job_title: '',
            salary_min: this.minimumAmountList[0].key,
            salary_max: this.maximumAmountList[4].key,
            customTags: this.additionalInput ? this.additionalInput.city_state : 'Remote',
            job_type: this.additionalInput ? this.additionalInput.job_type : this.typeList[0].key,
        });
    }
}
