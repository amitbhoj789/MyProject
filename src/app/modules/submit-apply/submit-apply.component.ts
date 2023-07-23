import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from "../../core/config.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GovtMatchApp} from "../../core/services/govt-match-app.service";

@Component({
    selector: 'app-submit-apply',
    templateUrl: './submit-apply.component.html',
    styleUrls: ['./submit-apply.component.scss']
})
export class SubmitApplyComponent implements OnInit {

    isButtonLoader: boolean = false;
    isLoader: boolean = true;
    isNumberLoading: boolean = false;
    headings: any = [];
    job_id: any;
    match_id: any;
    jobUrl: any;
    searchType: any = [];
    federalJobHeading: any = [];
    federalJobSubHeading: any = [];
    jobDetails: any;
    jobDetailsUrl: any;
    jobDetailsPositionTitle: any;
    jobDetailsDepartment: any;
    jobDetailsNumber: any = 1;
    currentStep = 5;
    maxStep = 5;
    progress = (this.currentStep/this.maxStep)*100;
    public matchList: any = [];

    constructor(
        public config: ConfigService,
        private router: Router,
        private govtMatchApp: GovtMatchApp,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.searchType = localStorage.getItem('searchType');
        this.match_id = localStorage.getItem('match_id');

        this.headings = this.config.headings(this.searchType);
        this.federalJobHeading = this.headings.federalJobHeading;
        this.federalJobSubHeading = this.headings.federalJobSubHeading;

        const routeParams = this._activatedRoute.snapshot.paramMap;
        this.job_id = String(routeParams.get('job_id'));

        this.matchList = localStorage.getItem('matchList');

        if (this.searchType === 'freeGovt' || this.searchType === 'free') {
            this.jobDetails = localStorage.getItem('jobDetails');
            if (!this.jobDetails) {
                this.router.navigate(['/curated-report']);
            } else {
                this.jobUrl = localStorage.getItem('jobUrl');
                // this.freeGovtJob(this.job_id, this.jobUrl);
            }
            this.freeGovtJob(this.job_id, this.jobUrl);
        } else {
            this.freeDemoJob()
        }

        if (this.searchType === 'free') {
            this.matchList = JSON.parse(this.matchList);//convert data into json parse of localstorage data
            if (this.matchList.length>0) {
                this.isLoader = false;
            }
            if (!this.matchList && this.matchList.length==0) {//in case previous component cannot set the localstorage
                // this.getJobData();
            }
        } else {
            this.matchList = JSON.parse(this.matchList);//convert data into json parse of localstorage data
            if (this.matchList.length>0) {
                this.isLoader = false;
            }
            if (!this.matchList && this.matchList.length==0) {//in case previous component cannot set the localstorage
                // this.getJobData();
            }
        }

    }

    array2:any;
    array1:any;
    checkIsArray:any;
    freeGovtJob(job_id: any, jobUrl: any) {
        // this.jobDetailsPositionTitle = localStorage.getItem('jobDetailsPositionTitle');
        // this.jobDetailsDepartment = localStorage.getItem('jobDetailsDepartment');
        // this.jobDetailsNumber = localStorage.getItem('jobDetailsNumber');
        // this.jobDetailsUrl = localStorage.getItem('jobDetailsUrl');
        this.array2 = localStorage.getItem('jobDetails');
        this.array1 = JSON.parse(this.array2);
        this.jobDetails = JSON.parse(this.jobDetails);
        this.checkIsArray =  Array.isArray(this.array1);
        if (this.checkIsArray) {
            const match_job_id = job_id;
            // @ts-ignore
            this.jobDetails = this.array1.find(({ job_id }) => job_id == match_job_id);
            console.log(this.jobDetails.details.job_url)
        } else {
            // this.getJobDetails(jobUrl,'','','',job_id,'');
        }
        //console.log(this.jobDetails)

        // console.log(this.jobDetails)

        // this.jobDetails = {
        //     'company_logo': null,
        //     'job_title': this.jobDetailsPositionTitle,
        //     'company_name': this.jobDetails.overview ? this.jobDetails.overview.company_name : '',
        //     'department_name': this.jobDetailsDepartment,
        //     'experience': this.jobDetails.overview ? this.jobDetails.overview.experience : '',
        //     'opening': this.jobDetails.overview ? this.jobDetails.overview.opening : '',
        //     'location': this.jobDetails.overview ? this.jobDetails.overview.location : '',
        //     'salary': this.jobDetails.overview ? this.jobDetails.overview.salary : '',
        //     'job_description': this.jobDetails.qualification,
        //     'job_url': this.jobDetailsUrl,
        //     'job_number': this.jobDetailsNumber,
        // }
    }

    freeDemoJob() {
        this.jobDetailsNumber = localStorage.getItem('jobDetailsNumber');
        this.jobDetails = {
            'company_logo': 'logos_microsoft.svg',
            'job_title': 'Angular Developer',
            'company_name': 'Microsoft',
            'department_name': 'Department Name',
            'experience': '3-8 Years',
            'opening': '1 Opening',
            'location': 'Location is US',
            'salary': '$7000 - $785 LPA',
            'job_description': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            'job_url': '',
            'job_number': this.jobDetailsNumber,
        }
    }

    public printJobs(cmpName: any): void {
        let printContents: any = document.getElementById(cmpName);
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents.innerHTML;
        window.print();
        document.body.innerHTML = originalContents;
    }

    isPopState = false;
    openJobUrl(url:any, searchType: any, type: any, position_title: any, department_name: any, number:any, job_id: any, getDetails:any): void {
        setTimeout(() => {
            // window.scroll(10, 174);
            this.router.events.subscribe(event => {
                // Scroll to top if accessing a page, not via browser history stack
                if (event instanceof NavigationEnd && !this.isPopState) {
                    window.scrollTo(0, 175);
                    this.isPopState = false;
                }

                // Ensures that isPopState is reset
                if (event instanceof NavigationEnd) {
                    this.isPopState = false;
                }
            });
        },1)
        this.isNumberLoading = true;
        if (searchType === 'free' && type === 'card') {
            // localStorage.setItem('jobDetailsPositionTitle',position_title);
            // localStorage.setItem('jobDetailsDepartment',department_name);
            // localStorage.setItem('jobDetailsUrl',url);
            // localStorage.setItem('jobDetailsNumber',number);
            // this.isNumberLoading = false;
            // this.router.navigate([url]);
            this.jobUrl = url;
            // this.jobDetails = {
            //     'job_number': number,
            // }
            this.getJobDetails(url, number, position_title, department_name, job_id, getDetails);
            //this.router.navigate(['/submit-apply/'+number]);

        } else if (searchType !== 'free' && type === 'card') {
            // this.isButtonLoader = true;
            // localStorage.setItem('jobDetailsPositionTitle',position_title);
            // localStorage.setItem('jobDetailsDepartment',department_name);
            // localStorage.setItem('jobDetailsUrl',url);
            // localStorage.setItem('jobDetailsNumber',number);
            // this.jobDetails = {
            //     'job_number': number,
            // }
            this.getJobDetails(url, number, position_title, department_name, job_id, getDetails);
            // window.open(url, '_blank')
        }
        // this.jobUrl = url;
    }

    datas: any;
    getJobDetails(url: any, number: any, position_title: any, department_name: any, job_id: any, getDetails:any) {
        if (getDetails == 'manual') {
            this.isNumberLoading = false
            this.router.navigate(['/submit-apply/'+job_id]);
            this.job_id = job_id;
            this.jobDetails = {
                'job_number' : number,
                'job_url' : url,
            };
        } else {
            this.govtMatchApp.getCurateMatchJobsDetails(url).then((data:any) => {
                if (data) {
                    //localStorage.setItem('jobDetails',JSON.stringify(data));
                    this.isNumberLoading = false;
                    this.router.navigate(['/submit-apply/'+number]);
                    this.jobUrl = url;
                    // this.jobDetails = {
                    //     'job_number': number,
                    // }
                    //Save local storage
                    this.datas = {
                        'details': data,
                        'url': url,
                        'job_number': number,
                        'job_id': job_id,
                        'position_title': position_title,
                        'department_name': department_name,
                    }
                    // this.saveLocalStorage(this.datas)

                    this.isNumberLoading = false;
                } else {
                    // this.noDataFound = true;
                    this.isNumberLoading = false
                }
            });
        }
    }

    saveLocalStorage(details: any) {
        let itemsList = []
        const getDetailStorage = localStorage.getItem('jobDetails')
        if(getDetailStorage){
            this.jobDetails = localStorage.getItem('jobDetails')
            itemsList = JSON.parse(this.jobDetails)
            itemsList.push(details)
            localStorage.setItem('jobDetails', JSON.stringify(itemsList))
        }else{
            itemsList.push(details)
            localStorage.setItem('jobDetails', JSON.stringify(itemsList))
        }
    }

}
